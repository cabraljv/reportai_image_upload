const express = require('express');
const multer = require('multer');
const gcsSharp = require('multer-sharp');

const app = express();

const storage = gcsSharp({
  bucket: 'reportai-images',
  projectId: 'even-shuttle-250512',
  keyFilename: 'src/keycloud.json',
  destination: 'public/image',
  acl: 'publicRead',
  size: {
    width: 700,
    height: 700
  },
  max: true
});
const upload = multer({ storage });

app.post('/insert', upload.single('image'), (req, res) => {
  console.log(req.file.path);
  res.json({ imageUrl: req.file.path });
});


app.listen(3333)