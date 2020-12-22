var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var dashboard_sp = require('./dashboard_sp.json');
var vendordetailsModel = require('./../models/vendordetailsModel');
var userdetailsModel = require('./../models/userdetailsModel');
var homebannerModel = require('./../models/homebannerModel');
var locationdetailsModel = require('./../models/locationdetailsModel');
var SP_specialationsMode = require('./../models/SP_servicesModel');


router.post('/create', async function(req, res) {
  try{
        await vendordetailsModel.create({
            user_id:  req.body.user_id,
            bus_user_name : req.body.bus_user_name,
            bus_user_email : req.body.bus_user_email,
            bussiness_name : req.body.bussiness_name,
            bus_user_phone : req.body.bus_user_phone,
            bus_service_list : req.body.bus_service_list,
            bus_spec_list : req.body.bus_spec_list,
            bus_service_gall : req.body.bus_service_gall,
            bus_profile : req.body.bus_profile,
            bus_proof : req.body.bus_proof,
            bus_certif : req.body.bus_certif,
            date_and_time : req.body.date_and_time,
            mobile_type : req.body.mobile_type,
            profile_status : req.body.profile_status,
            profile_verification_status : req.body.profile_verification_status,
            sp_loc : req.body.sp_loc,
            sp_lat : req.body.sp_lat,
            sp_long : req.body.sp_long,
            delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"SP Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});



router.post('/mobile/dashboard',async function (req, res) {
 let userdetails  =  await userdetailsModel.findOne({_id:req.body.user_id});
 let location_details  =  await locationdetailsModel.find({user_id:req.body.user_id,default_status:true});
 let homebanner  =  await homebannerModel.find({});
    dashboard_sp.Banner_details = []
    for(let c = 0 ; c < homebanner.length; c ++){
       let gg = {
        '_id': homebanner[c]._id,
        'title' :  homebanner[c].img_title,
        'img_path' :  homebanner[c].img_path,
       }
      dashboard_sp.Banner_details.push(gg);
    }
 if(userdetails.user_type == 1){
    let a = {
    SOS : [{Number:9876543210},{Number:9876543211},{Number:9876543212},{Number:9876543214}],
    LocationDetails : location_details,
    userdetails : userdetails,
    Dashboarddata : dashboard_sp,
    messages : [
    // {'title':'Doctor','message':'Unable to find the doctor near your location can i show the doctor above the location'},
    // {'title':'Product','message':'Unable to find the Product near your location can i show the doctor above the location'},
    // {'title':'sercive','message':'Unable to find the Sercive near your location can i show the doctor above the location'}
    ]
  }
  res.json({Status:"Success",Message:"SP Dashboard Details", Data : a ,Code:200});
}else{
  res.json({Status:"Failed",Message:"Working on it !", Data : {},Code:404});
}
});



router.post('/filter_date', function (req, res) {
        vendordetailsModel.find({}, function (err, StateList) {
          var final_Date = [];
          for(let a = 0; a < StateList.length; a ++){
            var fromdate = new Date(req.body.fromdate);
            var todate = new Date(req.body.todate);
            var checkdate = new Date(StateList[a].createdAt);
            console.log(fromdate,todate,checkdate);
            if(checkdate >= fromdate && checkdate <= todate){
              final_Date.push(StateList[a]);
            }
            if(a == StateList.length - 1){
              res.json({Status:"Success",Message:"vendordetailsModel screen  List", Data : final_Date ,Code:200});
            }
          }
        });
});



router.get('/deletes', function (req, res) {
      vendordetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        vendordetailsModel.findOne({user_id:req.body.user_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        vendordetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User type Details", Data : Functiondetails ,Code:200});
        });
});



router.get('/sp_dropdown',async function (req, res) {
   let SP_specialationsModess  =  await SP_specialationsMode.find({});
   var service_list = []
   for(let a = 0 ; a < SP_specialationsModess.length ; a ++ ){
        let t = {"service_list":SP_specialationsModess[a].img_title}
        service_list.push(t);
   }
   // var service_list = [
   // {
   //  "service_list":"Service - 1"
   // },
   // {
   //  "service_list":"Service - 2"
   // },
   // {
   //  "service_list":"Service - 3"
   // },
   // {
   //  "service_list":"Service - 4"
   // },
   // {
   //  "service_list":"Service - 5"
   // },
   // {
   //  "service_list":"Service - 6"
   // }
   // ];
    var Specialization = [
   {
    "Specialization":"Specialization - 1"
   },
   {
    "Specialization":"Specialization - 2"
   },
   {
    "Specialization":"Specialization - 3"
   },
   {
    "Specialization":"Specialization - 4"
   },
   {
    "Specialization":"Specialization - 5"
   },
   {
    "Specialization":"Specialization - 6"
   }
   ];
   let c = 
    {
      "service_list" :service_list,
      "Specialization" : Specialization
    }
   
  res.json({Status:"Success",Message:"SP Service List", Data : c ,Code:200});
});


router.post('/check_status', function (req, res) {
        vendordetailsModel.findOne({user_id:req.body.user_id}, function (err, StateList) {
          console.log(StateList);
          let message = "Dear Service Provider, We appreciate your interest and look forward to have you as part of Petfolio Team. Our team is reviewing your profile and will get in touch with you to close the formalities. Your profile is pending verification.";
         if(StateList == null){
          let dd = {
            'user_id' : req.body.user_id,
            'profile_status' : false,
            'profile_verification_status' : "Not verified"
          }
          if(dd.profile_verification_status == "Not verified"){
             res.json({Status:"Success",Message:message, Data : dd ,Code:200});
          } else if(dd.profile_verification_status == 0) {
              res.json({Status:"Success",Message:"Profile not updated", Data : dd ,Code:200});
          }else {
            res.json({Status:"Success",Message:"Service Provider Status", Data : dd ,Code:200});
          }
        }else {
          let dd = {
            'user_id' : req.body.user_id,
            'profile_status' : StateList.profile_status,
            'profile_verification_status' : StateList.profile_verification_status
          }
          if(dd.profile_verification_status == "Not verified"){
             res.json({Status:"Success",Message:message, Data : dd ,Code:200});
          } else if(dd.profile_verification_status == 0) {
              res.json({Status:"Success",Message:"Profile not updated", Data : dd ,Code:200});
          }else {
            res.json({Status:"Success",Message:"Service Provider Status", Data : dd ,Code:200});
          }
        }
        });
});


router.get('/mobile/getlist', function (req, res) {
        vendordetailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"User type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        vendordetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User type Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      vendordetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
