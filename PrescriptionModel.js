var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var PrescriptionSchema = new mongoose.Schema({  
  
  Doctor_Name : String,

  Doctor_Image: String,

  Doctor_ID: String,
  
  Prescription_data : Array,

  Appointment_ID: String,

  Treatment_Done_by: String,

  Patient_Name: String,
  
  Patient_Image : String,

  Patient_ID : String,
  
  Family_ID: String,

  Family_Name: String,

  Family_Image: String,

  Date: String,

  PDF_format : String,

  Doctor_Comments: String
 
});
mongoose.model('Prescription', PrescriptionSchema);
module.exports = mongoose.model('Prescription');
