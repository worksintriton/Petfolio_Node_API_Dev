var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');
var fs = require('fs');
var path = require('path');
 var PetdetailsModel = require('./../models/petdetailsModel');
 var pdfgeneratorHelper = require('./pdfhelper')
// var FamilyModel = require('./../models/FamilyModel');
// var DoctorModel = require('./../models/LivedoctorModel');
 var AppointmentModel = require('./../models/AppointmentsModel');
var Prescription = require('./../models/PrescriptionModel');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const { v4: uuidv4 } = require('uuid');
var doctordetailsModel = require('./../models/doctordetailsModel');
// var responseMiddleware = require('./../middlewares/response.middleware');
// router.use(responseMiddleware());

router.post('/create', async function(req, res) {
  try{
     //console.log("Create",req.body);
     var Prescription_data = req.body.Prescription_data || "";
     var doctor_commeents = req.body.Doctor_Comments || "";
     var doctorDetails = await doctordetailsModel.findById(req.body.Doctor_ID);
     var MeditationDetails = await AppointmentModel.findById(req.body.Appointment_ID);
     var PetDetails = await PetdetailsModel.findById(req.body.Pet_ID);
     var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,PetDetails,MeditationDetails,Prescription_data,doctor_commeents);
     console.log(pdfpath)
     // if(req.body.Treatment_Done_by == 'Self'){
     //   var patientDetails = await PatientModel.findById(req.body.Patient_ID).select('Name Age Gender Height Weight');
     //  var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,patientDetails,MeditationDetails,Prescription_data,doctor_commeents);
     // }
     // else{
     //     var patientDetails = await FamilyModel.findById(req.body.Family_ID).select('Name Age Gender Height Weight');  
     //   var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,patientDetails,MeditationDetails,Prescription_data,doctor_commeents);
     // }
        await Prescription.create({
            doctor_id: req.body.doctor_id || "",
            Prescription_data: req.body.Prescription_data || "",
            Appointment_ID: req.body.Appointment_ID || "",
            Treatment_Done_by: req.body.Treatment_Done_by || "",
            user_id : req.body.user_id || "",
            Prescription_type : req.body.Prescription_type || "",
            PDF_format : pdfpath || "",
            Prescription_img :  req.body.Prescription_img || "",
            Doctor_Comments: req.body.Doctor_Comments,
            Date : req.body.Date,
            delete_status : false
        }, 
        function (err, user) {
        res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200}); 
        });
}
catch(e){
  console.log("final error", e)
      res.json({Status:"Failed",Message:"Unable to add the data", Data : e ,Code:300}); 
}
});

router.post('/getlist', function (req, res) {
      Prescription.find({Appointment_ID:req.body.Appointment_ID}, function (err, Prescriptiondetails) {
      res.json({Status:"Success",Message:"Prescriptiondetails", Data : Prescriptiondetails ,Code:200});
        });
});

router.get('/getlist', function (req, res) {
      Prescription.find({}, function (err, Prescriptiondetails) {
      res.json({Status:"Success",Message:"Prescriptiondetails", Data : Prescriptiondetails ,Code:200});
        });
})

router.delete('/deletes', function (req, res) {
      Prescription.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Prescription Details Deleted", Data : {} ,Code:200});     
      });
});

router.post('/edit',async function (req, res) {
  let doctor_commeents = req.body.Doctor_Comments || "";
  try{
    let Appointment_ID = req.body.Appointment_ID;
    var appointmentidcheck = await Prescription.findOne({Appointment_ID:req.body.Appointment_ID});
    if(appointmentidcheck!=null){
      let Prescription_data = req.body.Prescription_data || "";

    var doctorDetails = await DoctorModel.findById(req.body.Doctor_ID).select('Name KMS_registration signature Specilization');
    var MeditationDetails = await AppointmentModel.findById(req.body.Appointment_ID).select('Problem_info passed_Medications');
    if(req.body.Treatment_Done_by == 'Self'){
      var patientDetails = await PatientModel.findById(req.body.Patient_ID).select('Name Age Gender Height Weight');
      console.log("PATIENTDETAILS",patientDetails);
      var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,patientDetails,MeditationDetails,Prescription_data,doctor_commeents);

    }
    else{
        var familyDetails = await FamilyModel.findById(req.body.Family_ID).select('Name Age Gender Height Weight');  
        var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,familyDetails,MeditationDetails,Prescription_data);
    }
      var newpdf = await Prescription.findOneAndUpdate({Appointment_ID:req.body.Appointment_ID},{PDF_format:pdfpath,Prescription_data:req.body.Prescription_data,Doctor_Comments:req.body.Doctor_Comments}, {new: true});
             res.json({Status:"Success",Message:"Prescriptiondetails Updated", Data : newpdf ,Code:200});
    }
else{
      let Prescription_data = req.body.Prescription_data || "";
    var doctorDetails = await DoctorModel.findById(req.body.Doctor_ID).select('Name KMS_registration signature Specilization');
    var MeditationDetails = await AppointmentModel.findById(req.body.Appointment_ID).select('Problem_info passed_Medications');
    if(req.body.Treatment_Done_by == 'Self'){
      var patientDetails = await PatientModel.findById(req.body.Patient_ID).select('Name Age Gender Height Weight');
      var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,patientDetails,MeditationDetails,Prescription_data,doctor_commeents);
    }
    else{
        var patientDetails = await FamilyModel.findById(req.body.Family_ID).select('Name Age Gender Height Weight');  
        var pdfpath = await pdfgeneratorHelper.pdfgenerator(doctorDetails,patientDetails,MeditationDetails,Prescription_data,doctor_commeents);
    }
        await Prescription.create({

            Doctor_Name : req.body.Doctor_Name, 
            Doctor_Image: req.body.Doctor_Image || "",
            Doctor_ID: req.body.Doctor_ID || "",
            Prescription_data: req.body.Prescription_data || "",
            Appointment_ID: req.body.Appointment_ID || "",
            Treatment_Done_by: req.body.Treatment_Done_by || "",
            Patient_Name : req.body.Patient_Name || "",
            Patient_Image: req.body.Patient_Image || "",
            Patient_ID :req.body.Patient_ID || "",
            Family_ID : req.body.Family_ID || "",
            Family_Name: req.body.Family_Name || "",
            Family_Image: req.body.Family_Image || "",
            PDF_format : pdfpath|| "",
            Doctor_Comments: req.body.Doctor_Comments

        }, 
       async function (err, user) {
        res.json({Status:"Success",Message:"Added successfully", Data : user,Code:200}); 
        });
}
        
    }
    catch(e){
      res.status(500).send("Internal server error");
    }
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      Prescription.findByIdAndRemove(req.body.Prescription_id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.json({Status:"Success",Message:"Prescription Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;