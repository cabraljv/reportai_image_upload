const express = require('express')

const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
app.use(bodyParser.json());


app.use(routes)
/*
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
}
*/


app.listen(3333)