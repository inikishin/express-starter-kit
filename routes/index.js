var express = require('express');
const fs = require("fs");
const multer = require('multer');
var router = express.Router();
const upload = multer({dest: process.env.TEMP_DIR});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/jobs/upload_attachment', upload.single('upload'), async (req, res, next) => {
  console.log('POST /upload_attachment body:', req.body);
  const file = req.file;
  const fileExt = file.originalname.split('.')[file.originalname.split('.').length - 1];
  function callback(err) {
    if (err) throw err;
  }
  const filename = process.env.ATTACHMENTS_DIR + file.filename + '.' + fileExt;
  fs.copyFile(file.path, filename, callback)

  res.status(200).send({link: '/' + filename});
});

module.exports = router;
