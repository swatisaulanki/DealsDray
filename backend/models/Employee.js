const mongoose = require('mongoose');
const validateEmail = require('../util/validateEmail');
const validateMobile = require("../util/validateMobile");
const validateImage = require('../util/validateImage');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const employeeSchema = new mongoose.Schema({
  f_Id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  f_Image: { 
    type: String, 
    required: false,
    // validate : [validateImage, 'Image must be a jpg or png file']
  },
  f_Name: { 
    type: String, 
    required: true 
},
  f_Email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
},
  f_Mobile: { 
    type: String, 
    required: true,
    validate: [validateMobile, 'Mobile number must be a 10 numeric digits']
},
  f_Designation: { 
    type: String, 
    required: true,
    enum: ['HR', 'Manager', 'Sales' ] 
},
  f_Gender: { 
    type: String, 
    required: true,
    enum: ['Male', 'Female' ] // Ensures gender is one of these values 
},
  f_Course: { 
    type: String, 
    required: true,
    enum: ['MCA', 'BCA', 'BSC' ]
},
  f_Createdate: { type: Date, default: Date.now }
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);

module.exports = EmployeeModel;
