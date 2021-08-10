var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ordr_vendor_detailsModel = require('./../models/ordr_vendor_detailsModel');
var ordr_banner_detailsModel = require('./../models/ordr_banner_detailsModel');
var ordr_catagories_detailsModel = require('./../models/ordr_catagories_detailsModel');


router.post('/create', async function(req, res) {
  try{
        await ordr_vendor_detailsModel.create({
  shop_logo:  req.body.shop_logo,
  shop_doc : req.body.shop_doc,
  vendor_doc :req.body.vendor_doc,
  vendor_name : req.body.vendor_name,
  shop_name : req.body.shop_name,
  shop_link_name : req.body.shop_link_name,
  vendor_email : req.body.vendor_email,
  vendor_password : req.body.vendor_password,
  vendor_phone : req.body.vendor_phone,
  status : req.body.status,
  map_link : req.body.map_link,
  lat : req.body.lat,
  long : req.body.long,
  address : req.body.address,
  shop_number : req.body.shop_number,
  shop_opening_time : req.body.shop_opening_time,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"company type Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/getting_shop_name', function (req, res) {
        ordr_vendor_detailsModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
        });
});

router.post('/getting_shop_name1',async function (req, res) {
         var temp_day  = new Date(req.body.date);
         console.log(temp_day);
         var day = temp_day.getDay();
         console.log(day);
         var week_Day = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
         console.log(week_Day[day]);
        var ordr_banner_detailsModels = await ordr_banner_detailsModel.find({user_id:req.body.user_id,Date:req.body.Date});
        ordr_vendor_detailsModel.findOne({shop_link_name:req.body.shop_link_name},async function (err, StateList) {
        var ordr_catagories_detailsModels = await ordr_catagories_detailsModel.find({vendor_id:StateList._id}).populate('catagories_id');
        var catagories = [];
        for(let a  = 0 ; a < ordr_catagories_detailsModels.length ; a ++){
          var available_day = ordr_catagories_detailsModels[a].cat_day_setting;
          for(let b = 0 ; b < available_day.length ; b ++){
           if(available_day[b] == week_Day[day]){
            console.log("True");
            console.log("Timess",req.body.time);
            var temp_cat_time_start = ordr_catagories_detailsModels[a].cat_time_start.split(':');
            var temp_cat_time_end = ordr_catagories_detailsModels[a].cat_time_end.split(':');
            console.log(+temp_cat_time_start[0],+req.body.time,+temp_cat_time_end[0]);
            if (+req.body.time > +temp_cat_time_start[0] && +req.body.time < +temp_cat_time_end[0]) {
              console.log("Values_available");
              catagories.push(ordr_catagories_detailsModels[a]);
            }
           }
          }
          if(a == ordr_catagories_detailsModels.length - 1){
            console.log(catagories.length);
          let a = {
            Vendor_details : StateList,
            Catagories : ordr_catagories_detailsModels,
            // Catagories:catagories,
            Vendor_banner : ordr_banner_detailsModels
          }
          res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
          }
        }  
        });
});


router.post('/forgotpassword', function (req, res) {
        ordr_vendor_detailsModel.findOne({vendor_email:req.body.vendor_email}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
        });
});





router.get('/avator/getlist', function (req, res) {
    let a = [
       {'title':"Male"},
       {'title':"Female"},
       {'title':"Others"},
    ];
    res.json({Status:"Success",Message:"avator list Details", Data : a ,Code:200});
});



router.get('/designation/getlist', function (req, res) {
    let a = [
       {'title':"Senior Developer"},
       {'title':"Junior Developer"},
       {'title':"HR"},
       {'title':"Sales Man"},
       {'title':"Android Developer"},
       {'title':"IOS Developer"},
       {'title':"PHP Developer"},
       {'title':"Tester"},
       {'title':"Fresher"},
       {'title':"Internship"},
    ];
    res.json({Status:"Success",Message:"designation list Details", Data : a ,Code:200});
});


router.get('/tech/getlist', function (req, res) {
    let a = [
       {'title':"male"},
       {'title':"female"},
       {'title':"others"},
    ];
    res.json({Status:"Success",Message:"tech list Details", Data : a ,Code:200});
});


router.get('/access/getlist', function (req, res) {
    let a = [
       {'title':"View"},
       {'title':"Edit"},
    ];
    res.json({Status:"Success",Message:"access list Details", Data : a ,Code:200});
});


router.get('/projecttype/getlist', function (req, res) {
    let a = [
       {'title':"view"},
       {'title':"Edit"},
    ];
    res.json({Status:"Success",Message:"project type list Details", Data : a ,Code:200});
});






router.get('/deletes', function (req, res) {
      ordr_vendor_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        ordr_vendor_detailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"company type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        ordr_vendor_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        ordr_vendor_detailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        ordr_vendor_detailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ordr_vendor_detailsModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"company type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
