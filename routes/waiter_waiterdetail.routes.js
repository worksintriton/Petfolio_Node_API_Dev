var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var waiter_waiterdetailModel = require('./../models/waiter_waiterdetailModel');

var waiter_restaurantdetailModel = require('./../models/waiter_restaurantdetailModel');
var waiter_chefdetailModel = require('./../models/waiter_chefdetailModel');



router.post('/create', async function(req, res) {

   var admin_user = await waiter_restaurantdetailModel.findOne({res_contact_no:req.body.waiter_number});
   var waiter_user = await waiter_waiterdetailModel.findOne({waiter_number:req.body.waiter_number});
   var chef_user = await waiter_chefdetailModel.findOne({chef_number:req.body.waiter_number});
    if(admin_user !== null){
       res.json({Status:"Failed",Message:"Contact number already exist", Data : {} ,Code:404}); 
    }else if(waiter_user !== null){
       res.json({Status:"Failed",Message:"Contact number already exist", Data : {} ,Code:404}); 
    }else if(chef_user !== null){
       res.json({Status:"Failed",Message:"Contact number already exist", Data : {} ,Code:404}); 
    }else{
  
  var table_details = await waiter_waiterdetailModel.findOne({rest_id:req.body.rest_id,waiter_number:req.body.waiter_number});
  if(table_details !== null){
    res.json({Status:"Failed",Message:"Waiter number already created", Data : {} ,Code:200}); 
  }else{
  try{
  await waiter_waiterdetailModel.create({
  rest_id: req.body.rest_id,
  waiter_name : req.body.waiter_name,
  waiter_number : req.body.waiter_number,
  waiter_emailid: req.body.waiter_emailid,
  waiter_address : req.body.waiter_address,
  waiter_emergency_no : req.body.waiter_emergency_no,
  waiter_status : req.body.waiter_status,
  date_of_create : req.body.date_of_create,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Waiter added successfully", Data : user ,Code:200}); 
        });
}catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  }

}


});


router.post('/getting_shop_name', function (req, res) {
        waiter_waiterdetailModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"Waiter type List", Data : a ,Code:200});
        });
});


router.get('/avator/getlist', function (req, res) {
    let a = [
       {'title':"Male"},
       {'title':"Female"},
       {'title':"Others"},
    ];
    res.json({Status:"Success",Message:"Waiter list Details", Data : a ,Code:200});
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
      waiter_waiterdetailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Waiter Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        waiter_waiterdetailModel.find({rest_id:req.body.rest_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Waiter List", Data : StateList ,Code:200});
        }).populate('rest_id');
});



router.get('/getlist', function (req, res) {
        waiter_waiterdetailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Waiter Details", Data : Functiondetails ,Code:200});
        }).populate('rest_id');
});


router.get('/mobile/getlist', function (req, res) {
        waiter_waiterdetailModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"Waiter Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        waiter_waiterdetailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Waiter Updated", Data : UpdatedDetails ,Code:200});
        });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      waiter_waiterdetailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Waiter Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
