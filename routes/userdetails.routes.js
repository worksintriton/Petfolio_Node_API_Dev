var express = require('express');
var router = express.Router();
const requestss = require("request");
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var GeoPoint = require('geopoint');
var userdetailsModel = require('./../models/userdetailsModel');
var locationdetailsModel = require('./../models/locationdetailsModel');
var dashboard_petlover = require('./dashboard_petlover.json');
var doctordetailsModel = require('./../models/doctordetailsModel');
var petdetailsModel = require('./../models/petdetailsModel');
var homebannerModel = require('./../models/homebannerModel');
var AppointmentsModel = require('./../models/AppointmentsModel');



router.post('/create', async function(req, res) {
  try{
       let random = Math.floor(Math.random() * 899999 + 100000);
       let phone  =  await userdetailsModel.findOne({user_phone : req.body.user_phone});
       // console.log(phone);
       if(phone !== null){
        // console.log('This phone number already registered');
        if(phone.user_status == 'Incomplete'){
           let a  = {
            user_details : phone
        }
        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + phone.otp + ". Petfolio OTP for Signup.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
        console.log(baseurls);
        requestss(baseurls, { json: true }, async (err, response, body) => {
           if (err) {
            return console.log(err);
          }
          else{
        res.json({Status:"Success",Message:"Sign up successfully! welcome to petfolio",Data : a , Code:200}); 
              }
        });
        }else{
            res.json({Status:"Failed",Message:"This phone number already registered",Data : {},Code:404}); 
        }


       }else
       {
          await userdetailsModel.create({
            first_name:  req.body.first_name,
            last_name : req.body.last_name,
            user_email : req.body.user_email,
            user_phone : req.body.user_phone,
            date_of_reg : req.body.date_of_reg,
            user_type : req.body.user_type,
            user_status : "Incomplete",
            otp : random,
            fb_token : "",
            device_id : "",
            device_type : "",
            mobile_type : req.body.mobile_type,
            delete_status : false
        }, 
        function (err, user) {
          // console.log(user)
        let a  = {
            user_details : user
        }
        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + random + ". Petfolio OTP for Signup.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
        // console.log(baseurls);
        requestss(baseurls, { json: true }, async (err, response, body) => {
           if (err) {
            return console.log(err);
          }
          else{
        res.json({Status:"Success",Message:"Sign up successfully! welcome to petfolio",Data : a , Code:200}); 
              }
        });
        });
       }
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      userdetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User Details Deleted", Data : {} ,Code:200});     
      });
});


router.post('/filter_date', function (req, res) {
        userdetailsModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"Demo screen  List", Data : final_Date ,Code:200});
            }
          }
        });
});




router.post('/petlove/mobile/dashboard',async function (req, res) {
  // console.log(req.body);
 let userdetails  =  await userdetailsModel.findOne({_id:req.body.user_id});
 let location_details  =  await locationdetailsModel.find({user_id:req.body.user_id,default_status:true});
 let tem_doctordetailsModel  =  await doctordetailsModel.find({});
 let Banner_details  =  await doctordetailsModel.find({});
 let petdetailsModels  =  await petdetailsModel.find({user_id:req.body.user_id});
 let homebanner  =  await homebannerModel.find({});
     dashboard_petlover.Banner_details = []
    for(let c = 0 ; c < homebanner.length; c ++){
       let gg = {
        '_id': homebanner[c]._id,
        'title' :  homebanner[c].img_title,
        'img_path' :  homebanner[c].img_path,
       }
      dashboard_petlover.Banner_details.push(gg);
    }
 // dashboard_petlover.Banner_details = dashboard_petlover;
   let final_docdetails = [];
   for(let a = 0 ; a < tem_doctordetailsModel.length; a ++){
    // console.log(tem_doctordetailsModel[a]);
    var point1 = new GeoPoint(+req.body.lat, +req.body.long);
    var point2 = new GeoPoint(+tem_doctordetailsModel[a].clinic_lat,+tem_doctordetailsModel[a].clinic_long);
    var distance = point1.distanceTo(point2, true)//output in kilometers
    // console.log(distance);
    
    let dd = {
       '_id' : tem_doctordetailsModel[a].user_id,
       "doctor_name" : tem_doctordetailsModel[a].dr_name,
       "doctor_img" : tem_doctordetailsModel[a].clinic_pic[0].clinic_pic,
       "specialization" : tem_doctordetailsModel[a].specialization,
       "distance" : distance.toFixed(2),
       "star_count" : 4,
       "review_count": 223
    }
    final_docdetails.push(dd);
   }
   var ascending = final_docdetails.sort((a, b) => Number(a.distance) - Number(b.distance));
   dashboard_petlover.Doctor_details = [];
   dashboard_petlover.Doctor_details = ascending;
 if(userdetails.user_type == 1){
    let a = {
    SOS : [{Number:9876543210},{Number:9876543211},{Number:9876543212},{Number:9876543214}],
    LocationDetails : location_details,
    PetDetails : petdetailsModels,
    userdetails : userdetails,
    Dashboarddata : dashboard_petlover,
    messages : [
    {'title':'Doctor','message':'Unable to find the doctor near your location can i show the doctor above the location'},
    {'title':'Product','message':'Unable to find the Product near your location can i show the doctor above the location'},
    {'title':'sercive','message':'Unable to find the Sercive near your location can i show the doctor above the location'}
    ]
    // homebanner : homebanner
  }
  res.json({Status:"Success",Message:"Pet Lover Dashboard Details", Data : a ,Code:200});
}else{
  res.json({Status:"Failed",Message:"Working on it !", Data : {},Code:404});
}
});





router.post('/fetch_all_details',async function (req, res) {
      let userdetailsModels  =  await userdetailsModel.find({_id:req.body.user_id});
      let petdetailsModels  =  await petdetailsModel.find({user_id:req.body.user_id});
      let locationdetailsModels  =  await locationdetailsModel.find({user_id:req.body.user_id});
      let AppointmentsModels  =  await AppointmentsModel.find({user_id:req.body.user_id});
      let a = {
        userdetailsModels : userdetailsModels,
        petdetailsModels : petdetailsModels,
        locationdetailsModels : locationdetailsModels,
        AppointmentsModel : AppointmentsModels,
      }
      res.json({Status:"Success",Message:"User Details List", Data : a ,Code:200});
      
});





router.post('/mobile/login',async function (req, res) {
    let userdetails  =  await userdetailsModel.findOne({user_phone:req.body.user_phone,user_status:"complete"});
    if(userdetails == null){
      res.json({Status:"Failed",Message:"Invalid Account",Data : {},Code:404}); 
    } else 
    {
     // console.log(userdetails);
     if(userdetails.user_type == 1){
     let random = Math.floor(Math.random() * 899999 + 100000);
     let updatedata = {otp:random}
     var updatedetails = await userdetailsModel.findByIdAndUpdate({_id:userdetails._id},updatedata,{
       new: true
     });
     // console.log(updatedetails);
      let a  = {
            user_details : updatedetails
        }
        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + random + ". Petfolio OTP for Signup.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
        console.log(baseurls);
        requestss(baseurls, { json: true }, async (err, response, body) => {
          if (err) {
            return console.log(err);
          }
          else{
             res.json({Status:"Success",Message:"OTP Send to your mobile number",Data : a , Code:200}); 
              }
         });
     }else if(userdetails.user_type == 4){
     let random = Math.floor(Math.random() * 899999 + 100000);
     let updatedata = {otp:random}
     var updatedetails = await userdetailsModel.findByIdAndUpdate({_id:userdetails._id},updatedata,{
       new: true
     });
     // console.log(updatedetails);
      let a  = {
            user_details : updatedetails
        }
        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + random + ". Petfolio OTP for Signup.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
        // console.log(baseurls);
        requestss(baseurls, { json: true }, async (err, response, body) => {
          if (err) {
            return console.log(err);
          }
          else{
             res.json({Status:"Success",Message:"OTP Send to your mobile number",Data : a , Code:200}); 
              }
         });
     }
    }
});





router.post('/getlist_id', function (req, res) {
        userdetailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User Details List", Data : StateList ,Code:200});
        });
});


router.post('/mobile/resendotp', function (req, res) {
        userdetailsModel.findOne({user_phone:req.body.user_phone}, function (err, StateList) {
        if(StateList == null){
           res.json({Status:"Failed",Message:"Invalid Mobile Number", Data : {} ,Code:404});
        }else{
          let a = {
            User_Details : StateList
          }
        var json = "";
        var username = "tritonitsolutionstrans";
        var password = 20145;
        var mobilno = req.body.user_phone;
        var message =
          "Hi, Your OTP is " + StateList.otp + ". Petfolio OTP for signup resend.";
        // var dumbell = "DUMBELL";
        var dumbell = "VOXITW";
        var tye = 0;
        var baseurls =
          "http://www.smsintegra.com/" +
          "api/smsapi.aspx?uid=" +
          username +
          "&pwd=" +
          password +
          "&mobile=" +
          mobilno +
          "&msg=" +
          message +
          "&sid=" +
          dumbell +
          "&type=" +
          tye;
        console.log(baseurls);
        requestss(baseurls, { json: true }, async (err, response, body) => {
           if (err) {
            return console.log(err);
          }
          else{
          res.json({Status:"Success",Message:"OTP sent successfully! welcome to petfolio", Data : a ,Code:200});
              }
        });
        }
        });
});






router.get('/getlist', function (req, res) {
        userdetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User Details Details", Data : Functiondetails ,Code:200});
        });
});



router.get('/adminpanel/Dashboard/count',async function (req, res) {    
    let petloverdetails  =  await userdetailsModel.find({user_type:1});
    let doctordetails  =  await userdetailsModel.find({user_type:4});
    // console.log(petloverdetails,doctordetails);
     let a  = {
       petloverdetails : petloverdetails,
       petloverdetails_count : petloverdetails.length,
       doctordetails : doctordetails,
       doctordetails_count : doctordetails.length
     } 
res.json({Status:"Success",Message:"Dashboard Details", Data : a ,Code:200});
});



router.post('/mobile/update/fb_token', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"FB Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/mobile/edit', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User Details Updated", Data : UpdatedDetails ,Code:200});
        });
});



router.post('/edit', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User Details Updated", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES A USER FROM THE DATABASE
router.post('/delete_by_phone',async function (req, res) {
      let phone  =  await userdetailsModel.findOne({user_phone : req.body.user_phone});
      if(phone == null){
          res.json({Status:"Failed",Message:"Already User Details Deleted successfully", Data : {} ,Code:200});
      }else{
         userdetailsModel.findByIdAndRemove(phone._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:phone.user_phone + " User Details Deleted successfully", Data : {} ,Code:200});
      });
      }
     
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      userdetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User Details Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
