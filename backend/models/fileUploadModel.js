const multer = require('multer');
const express = require("express");
const path = require('path');

const fileUploadRoute = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the original file name
  }
});

// File type validation
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only! (jpeg, jpg, png)');
  }
}

// Initialize upload variable
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('f_Image'); // 'f_Image' is the field name for the file
