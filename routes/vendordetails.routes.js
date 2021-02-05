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
var SP_servicesMode = require('./../models/SP_servicesModel');
var GeoPoint = require('geopoint');

router.post('/create', async function(req, res) {
  console.log(req.body);
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
            delete_status : false,
            calender_status : false
        }, 
        function (err, user) {
     
        res.json({Status:"Success",Message:"SP Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});



router.post('/mobile/dashboard',async function (req, res) {
    console.log(req.body);
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


router.post('/mobile/service_cat',async function (req, res) {
  console.log(req.body);
 let location_details  =  await locationdetailsModel.findOne({user_id:req.body.user_id,default_status:true});
  let services_details  =  await SP_servicesMode.find({});
  var final_Data = [];
   for(let a = 0 ; a < services_details.length; a ++){
     let c = {
         "_id" : services_details[a]._id,
        "image": services_details[a].img_banner,
        "title": services_details[a].img_title,
        "sub_title": services_details[a].img_subtitle,
     }
     final_Data.push(c);
     if(a == services_details.length - 1 ){
      res.json({Status:"Success",Message:"Service Cat List", Data : final_Data ,Code:200});
     }
   }  
});








router.post('/mobile/servicedetails',async function (req, res) {
    console.log(req.body);
 let location_details  =  await locationdetailsModel.findOne({user_id:req.body.user_id,default_status:true});
  var user_lat = location_details.location_lat;
  var user_long = location_details.location_long;
  let services_details  =  await SP_servicesMode.findOne({_id:req.body.cata_id});
  let vendordetailsModels  =  await vendordetailsModel.find({});
    var final_Data = [];
   for(let x = 0 ; x < vendordetailsModels.length; x ++){
    var point1 = new GeoPoint(+user_lat, +user_long);
    var point2 = new GeoPoint(+vendordetailsModels[x].sp_lat,+vendordetailsModels[x].sp_long);
    var distance = point1.distanceTo(point2, true)//output in kilometers
   if(req.body.Count_value_start == 0 && req.body.Count_value_end == 0 && req.body.review_count == 0){
    let service_prices = 0;
            for(let c = 0; c < vendordetailsModels[x].bus_service_list.length ; c ++){
              if(vendordetailsModels[x].bus_service_list[c].bus_service_list == services_details.img_title)
                {
                       service_prices = vendordetailsModels[x].bus_service_list[c].amount;     
                }   
      }
    if(req.body.distance == 0){
         if(distance < 15){
         let c =  {
        "_id" : vendordetailsModels[x]._id,
        "image": vendordetailsModels[x].bus_service_gall[0].bus_service_gall,
        "service_provider_name": vendordetailsModels[x].bussiness_name,
        "service_price": +service_prices,
        "service_offer": 0,
        "service_place":vendordetailsModels[x].sp_loc,
        "distance": +distance.toFixed(2),
        "rating_count" : 5,
        "comments_count":12,
      }
     final_Data.push(c);
         }
    }
    else {
     let c =  {
        "_id" : vendordetailsModels[x]._id,
        "image": vendordetailsModels[x].bus_service_gall[0].bus_service_gall,
        "service_provider_name": vendordetailsModels[x].bussiness_name,
        "service_price": +service_prices,
        "service_offer": 0,
        "service_place":vendordetailsModels[x].sp_loc,
        "distance": +distance.toFixed(2),
        "rating_count" : 5,
        "comments_count":12,
      }
     final_Data.push(c);
    }
     if(x == vendordetailsModels.length - 1 ){
      // res.json({Status:"Success",Message:"Service Cat List", Data : final_Data ,Code:200});
   let a = {
    Service_Details : {
      "_id": services_details._id,
      "image_path" :services_details.img_path,
      "title" : services_details.img_title,
      "count" : 0
     },
     Service_provider : final_Data
   }
   if(req.body.distance == 1){

    if(a.Service_provider.length == 0){
    res.json({Status:"Failed",Message:"Service Provider List",alert_msg : "Around 15 kms no recorde found, shall i show above 15 kms", Data : a ,Code:404});
    }else{
             res.json({Status:"Success",Message:"Service Provider List",alert_msg : "Around 15 kms no recorde found, shall i show above 15 kms", Data : a ,Code:200});
    }
   }else{
       res.json({Status:"Success",Message:"Service Provider List",alert_msg : "Around 15 kms no recorde found, shall i show above 15 kms", Data : a ,Code:200});
   }
     }
   }
   else
   { 
  if(req.body.distance == 0){
         if(distance < 15){
           let service_prices = 0;
            for(let c = 0; c < vendordetailsModels[x].bus_service_list.length ; c ++){
              if(vendordetailsModels[x].bus_service_list[c].bus_service_list == services_details.img_title)
                {
                       service_prices = vendordetailsModels[x].bus_service_list[c].amount;     
                }   
            }
          if(service_prices > req.body.Count_value_start && service_prices < req.body.Count_value_end)
           {
      let c =  {
        "_id" : vendordetailsModels[x]._id,
        "image": vendordetailsModels[x].bus_service_gall[0].bus_service_gall,
        "service_provider_name": vendordetailsModels[x].bussiness_name,
        "service_price": +service_prices,
        "service_offer": 0,
        "service_place":vendordetailsModels[x].sp_loc,
        "distance": +distance.toFixed(2),
        "rating_count" : 5,
        "comments_count":12,
      }
     final_Data.push(c);
           }        
         }
    }
    else {
       let service_prices = 0;
            for(let c = 0; c < vendordetailsModels[x].bus_service_list.length ; c ++){
              if(vendordetailsModels[x].bus_service_list[c].bus_service_list == services_details.img_title)
                {
                       service_prices = vendordetailsModels[x].bus_service_list[c].amount;     
                }   
            }
          if(service_prices > req.body.Count_value_start && service_prices < req.body.Count_value_end)
           {
      let c =  {
        "_id" : vendordetailsModels[x]._id,
        "image": vendordetailsModels[x].bus_service_gall[0].bus_service_gall,
        "service_provider_name": vendordetailsModels[x].bussiness_name,
        "service_price": +service_prices,
        "service_offer": 0,
        "service_place":vendordetailsModels[x].sp_loc,
        "distance": +distance.toFixed(2),
        "rating_count" : 5,
        "comments_count":12,
      }
     final_Data.push(c);
           }
    }
     if(x == vendordetailsModels.length - 1 ){
      // res.json({Status:"Success",Message:"Service Cat List", Data : final_Data ,Code:200});
   let a = {
    Service_Details : {
      "_id": services_details._id,
      "image_path" :services_details.img_path,
      "title" : services_details.img_title,
      "count" : 0
     },
     Service_provider : final_Data
   }
   if(a.Service_provider.length == 0){
    res.json({Status:"Failed",Message:"Service Provider List",alert_msg : "Around 15 kms no recorde found, shall i show above 15 kms", Data : a ,Code:404});
   }else{
    res.json({Status:"Success",Message:"Service Provider List",alert_msg : "Around 15 kms no recorde found, shall i show above 15 kms", Data : a ,Code:200});
   }
  // res.json({Status:"Success",Message:"Service Provider List",alert_msg : "Around 15 kms no recorde found, shall i show above 15 kms", Data : a ,Code:200});
    }

   }
     
   }
});



router.post('/filter_date', function (req, res) {
    console.log(req.body);
        vendordetailsModel.find({}, function (err, StateList) {
          var final_Date = [];
          for(let a = 0; a < StateList.length; a ++){
            var fromdate = new Date(req.body.fromdate);
            var todate = new Date(req.body.todate);
            var checkdate = new Date(StateList[a].createdAt);
           
            if(checkdate >= fromdate && checkdate <= todate){
              final_Date.push(StateList[a]);
            }
            if(a == StateList.length - 1){
              res.json({Status:"Success",Message:"vendordetailsModel screen  List", Data : final_Date ,Code:200});
            }
          }
        });
});


router.get('/filter_price_list', function (req, res) {
  let a = [
    {
      "Display_text":"Under Rs.500",
      "Count_value_start" : 0,
      "Count_value_end" : 500,
    },
    {
      "Display_text":"Rs. 500 - Rs. 1,000",
      "Count_value_start" : 500,
      "Count_value_end" : 1000,
    },
    {
      "Display_text":"Rs. 1,000 - Rs. 2,000",
      "Count_value_start" : 1000,
      "Count_value_end" : 2000,
    },
    {
      "Display_text":"Rs. 2,000 - Rs. 3,000",
      "Count_value_start" : 2000,
      "Count_value_end" : 3000,
    },
    {
      "Display_text":"Rs. 3,000 - Above",
      "Count_value_start" : 3000,
      "Count_value_end" : 1000000,
    }
  ]
 res.json({Status:"Success",Message:"SP filter price list", Data : a ,Code:200});          
});



router.get('/deletes', function (req, res) {
      vendordetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User type Deleted", Data : {} ,Code:200});     
      });
});



router.get('/calendar_timelist', function (req, res) {
  let a = {
    morning_time_list : [
     {
      "time" : "12:00 AM"
     },
     {
      "time" : "01:00 AM"
     },
     {
      "time" : "02:00 AM"
     },
     {
      "time" : "03:00 AM"
     },
     {
      "time" : "04:00 AM"
     },
     {
      "time" : "05:00 AM"
     },
     {
      "time" : "06:00 AM"
     },
     {
      "time" : "07:00 AM"
     },
     {
      "time" : "08:00 AM"
     },
     {
      "time" : "09:00 AM"
     },
     {
      "time" : "10:00 AM"
     },
     {
      "time" : "11:00 AM"
     }
    ],
    evening_time_list : [{
      "time" : "12:00 PM"
     },
     {
      "time" : "01:00 PM"
     },
     {
      "time" : "02:00 PM"
     },
     {
      "time" : "03:00 PM"
     },
     {
      "time" : "04:00 PM"
     },
     {
      "time" : "05:00 PM"
     },
     {
      "time" : "06:00 PM"
     },
     {
      "time" : "07:00 PM"
     },
     {
      "time" : "08:00 PM"
     },
     {
      "time" : "09:00 PM"
     },
     {
      "time" : "10:00 PM"
     },
     {
      "time" : "11:00 PM"
     }],
  }
  res.json({Status:"Success",Message:"calendar time List", Data : a ,Code:200});
        
});



router.post('/getlist_id', function (req, res) {
    console.log(req.body);
        vendordetailsModel.findOne({user_id:req.body.user_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User type List", Data : StateList ,Code:200});
        });
});

router.post('/mobile/sp_fetch_by_id',async function (req, res) {
    console.log(req.body);
    let services_details  =  await SP_servicesMode.findOne({_id:req.body.cata_id});
    let Details = {
      "_id": services_details._id,
      "image_path" : services_details.img_path,
      "title" : services_details.img_title,
      "count" : 0,
      "amount" : 200,
      "time" : "15 mins"
     }
        vendordetailsModel.findOne({_id:req.body.sp_id}, function (err, StateList) {

       let a =  {
        "bus_service_list": StateList.bus_service_list,
        "bus_spec_list":  StateList.bus_spec_list,
        "bus_service_gall":  StateList.bus_service_gall,
        "bus_certif": StateList.bus_certif,
        "_id":  StateList._id,
        "user_id":  StateList.user_id,
        "bus_user_name":  StateList.bus_user_name,
        "bus_user_email":  StateList.bus_user_email,
        "bussiness_name": StateList.bussiness_name,
        "bus_user_phone": StateList.bus_user_phone,
        "bus_profile": StateList.bus_profile,
        "bus_proof": StateList.bus_proof,
        "date_and_time": StateList.date_and_time,
        "mobile_type": StateList.mobile_type,
        "profile_status": StateList.profile_status,
        "profile_verification_status": StateList.profile_verification_status,
        "sp_loc": StateList.sp_loc,
        "sp_lat": StateList.sp_lat,
        "sp_long": StateList.sp_long,
        "delete_status":StateList.delete_status,
        "updatedAt": StateList.updatedAt,
        "createdAt":StateList.createdAt,
        "__v": StateList.__v,
        "distance": 0 ,
        "rating" : 0,
        "comments" : 0
    }
          res.json({Status:"Success",Message:"SP Details", Data : a, Details : Details ,Code:200});
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
   var times = [
   {
    "time":"15 mins"
   },
   {
    "time":"30 mins"
   },
   {
    "time":"45 mins"
   },
   {
    "time":"1 hrs"
   },
   {
    "time":"2 hrs"
   },
   {
    "time":"3 hrs"
   }
   ];

   let c = 
    {
      "service_list" :service_list,
      "Specialization" : Specialization,
      "time" : times
    }
   
  res.json({Status:"Success",Message:"SP Service List", Data : c ,Code:200});
});


router.post('/check_status', function (req, res) {
    console.log(req.body);
        vendordetailsModel.findOne({user_id:req.body.user_id}, function (err, StateList) {
         
          let message = "Dear Service Provider, We appreciate your interest and look forward to have you as part of Petfolio Team. Our team is reviewing your profile and will get in touch with you to close the formalities. Your profile is pending verification.";
         if(StateList == null){
          let dd = {
            'user_id' : req.body.user_id,
            'profile_status' : false,
            'profile_verification_status' : "Not verified",
            'calender_status' : false,
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
            'profile_verification_status' : StateList.profile_verification_status,
            'calender_status' : StateList.calender_status,
          }
          if(dd.profile_verification_status == "Not verified"){
             res.json({Status:"Success",Message:message, Data : dd ,Code:200});
          } else if(dd.profile_verification_status == 0) {
              res.json({Status:"Success",Message:"Profile not updated", Data : dd ,Code:200});
          } else if(dd.calender_status == 0) {
              res.json({Status:"Success",Message:"Service Provider Calendor not updated", Data : dd ,Code:200});
          } else {
            res.json({Status:"Success",Message:"Service Provider Status", Data : dd ,Code:200});
          }
        }
        });
});


router.get('/mobile/getlist', function (req, res) {
    console.log(req.body);
        vendordetailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"User type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
    console.log(req.body);
        vendordetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User type Updated", Data : UpdatedDetails ,Code:200});
        });
});

router.post('/delete', function (req, res) {
    console.log(req.body);
 let c = {
    delete_status : true
  }
  vendordetailsModel.findByIdAndUpdate(req.body._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Location Deleted successfully", Data : UpdatedDetails ,Code:200});
  });
});




// // DELETES A USER FROM THE DATABASE
router.post('/admin_delete', function (req, res) {
    console.log(req.body);
      vendordetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
