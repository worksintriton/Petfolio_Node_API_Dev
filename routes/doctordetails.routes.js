var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var doctordetailsModel = require('./../models/doctordetailsModel');


router.post('/create', async function(req, res) {
  try{
    console.log(req.body);
        await doctordetailsModel.create({
            user_id:  req.body.user_id,
            dr_title : req.body.dr_title,
            dr_name : req.body.dr_name,
            clinic_name : req.body.clinic_name,
            clinic_loc : req.body.clinic_loc,
            clinic_lat : req.body.clinic_lat,
            clinic_long : req.body.clinic_long,
            education_details : req.body.education_details,
            experience_details : req.body.experience_details,
            specialization : req.body.specialization,
            pet_handled : req.body.pet_handled,
            clinic_pic : req.body.clinic_pic,
            certificate_pic : req.body.certificate_pic,
            govt_id_pic : req.body.govt_id_pic,
            photo_id_pic : req.body.photo_id_pic,
            profile_status : req.body.profile_status,
            profile_verification_status : req.body.profile_verification_status,
            slot_type : req.body.slot_type,
            date_and_time : req.body.date_and_time,
            mobile_type : req.body.mobile_type
        }, 
        function (err, user) {
          console.log(err);
          console.log(user)
        res.json({Status:"Success",Message:"Docotor Details Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      doctordetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Docotor Details Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        doctordetailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Docotor Details List", Data : StateList ,Code:200});
        });
});


router.post('/fetch_doctor_id', function (req, res) {
        doctordetailsModel.findOne({user_id:req.body.user_id}, function (err, StateList) {
          console.log(StateList);
          console.log(err);
      let dd = {
            '_id' : StateList._id,
            'user_id':  StateList.user_id,
            'dr_title' : StateList.dr_title,
            'dr_name' : StateList.dr_name,
            'clinic_name' : StateList.clinic_name,
            'clinic_loc' : StateList.clinic_loc,
            'clinic_lat' : StateList.clinic_lat,
            'clinic_long' : StateList.clinic_long,
            'education_details' : StateList.education_details,
            'experience_details' : StateList.experience_details,
            'specialization' : StateList.specialization,
            'pet_handled' : StateList.pet_handled,
            'clinic_pic' : StateList.clinic_pic,
            'certificate_pic' : StateList.certificate_pic,
            'govt_id_pic' : StateList.govt_id_pic,
            'photo_id_pic' : StateList.photo_id_pic,
            'profile_status' : StateList.profile_status,
            'profile_verification_status' : StateList.profile_verification_status,
            'slot_type' : StateList.slot_type,
            'date_and_time' : StateList.date_and_time,
            'descri' : "A class of medical instruction in which patients are examined and discussed. 2 : a group meeting devoted to the analysis and solution of concrete problems or to the acquiring of specific skills or knowledge writing clinics golf clinic",
            "star_count" : 4,
            "review_count": 223
          }
          res.json({Status:"Success",Message:"Docotor Details", Data : dd ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        doctordetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Docotor Details Details", Data : Functiondetails ,Code:200});
        });
});



router.get('/admin/getlist', function (req, res) {
        doctordetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Docotor Details Details", Data : Functiondetails ,Code:200});
        }).populate('user_id');
});


router.get('/mobile/getlist', function (req, res) {
        doctordetailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"Docotor Details Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        doctordetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Docotor Details Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      doctordetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Docotor Details Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
