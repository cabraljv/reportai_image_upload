const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload');
const storage = require('@google-cloud/storage');
const fs = require('fs')
const app = express()

const gcs = storage({
  projectId: 'even-shuttle-250512',
  keyFilename: '/keycloud.json'
});
const upload = multer(uploadConfig);
const bucketName = 'reportai-images'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

app.post('/insert', upload.single('image'), (req, res) => {

  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);


  fs.unlinkSync(req.file.path);

  res.json({ result: getPublicUrl(gcsname) })
});

app.listen(3333)