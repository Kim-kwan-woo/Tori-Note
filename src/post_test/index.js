var express = require("express");
var app = express();
var multer, storage, path, fs;
path = require('path');
multer = require('multer');
fs = require('fs');

//test on web
var form = "<!DOCTYPE HTML><html><body>" +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='upload'/>" +
  "<input type='submit' /></form>" +
  "</body></html>";

app.get('/', function (req, res) {
  //test on web
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(form);

});

var nowDay;
var fs = require('fs');
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Post
app.post(
  "/upload",
  multer({
    storage: storage
  }).single('upload'), function (req, res) {
    console.log(req.file);
    console.log(JSON.stringify(req.body));    

    const ext = path.extname(req.file.originalname);

    if (ext == ".jpg" || ext == ".png") {
      console.log("image")
    } else {
        console.log("not image")
    }

    res.redirect('/')
    return res.status(200).end();
  });

app.listen(3000, () => console.log('Server started on port 3000 '));