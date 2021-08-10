var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ordr_user_detailsModels = require('./../models/ordr_user_detailsModel');

var ordr_order_detailsModel = require('./../models/ordr_order_detailsModel');
var ordr_productitem_detailsModels = require('./../models/ordr_productitem_detailsModels');
var ordr_manager_detailsModel = require('./../models/ordr_manager_detailsModel');


router.post('/create', async function(req, res) {
  try{
    console.log(req.body);
        await ordr_user_detailsModels.create({
  Customer_id:  req.body.Customer_id,
  Customer_name : req.body.Customer_name,
  Customer_email :req.body.Customer_email,
  Customer_phone : req.body.Customer_phone,
  Date_of_register : req.body.Date_of_register,
  Customer_browser : req.body.Customer_browser,
  Customer_urgent : req.body.Customer_urgent
        }, 
        function (err, user) {
        res.json({Status:"Success",Message:"company type Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/getting_shop_name', function (req, res) {
        ordr_user_detailsModels.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
        });
});




router.post('/dashboard',async function (req, res) {
	var order_details = await ordr_order_detailsModel.find({vendor_id:req.body.vendor_id}).sort({_id:1}).limit(5).populate('Customer_id vendor_id');
    var Item_details = await ordr_order_detailsModel.find({vendor_id:req.body.vendor_id}).count();
    var order_details_count = await ordr_order_detailsModel.find({vendor_id:req.body.vendor_id}).count();
    var manager_details_count = await ordr_manager_detailsModel.find({res_id:req.body.vendor_id}).count();
	console.log('order_details',order_details);
	console.log('Item_details',Item_details);
	console.log('order_details_count',order_details_count);
	console.log('manager_details_count',manager_details_count);
    let a = {
    	item_count : Item_details || 0,
    	manager_count : manager_details_count || 0,
    	order_count : order_details_count || 0,
    	over_all_payment : 2303,
    	today_payment_count : 200,
    	today_order_count : 10,
    	last_five_order_detail : order_details
    }
    res.json({Status:"Success",Message:"dashboard Details", Data : a ,Code:200});
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




router.post('/edit_customer_id', function (req, res) {
        ordr_user_detailsModels.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});




router.get('/deletes', function (req, res) {
      ordr_user_detailsModels.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        ordr_user_detailsModels.findOne({Customer_phone:req.body.Customer_phone}, function (err, StateList) {
          res.json({Status:"Success",Message:"company type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        ordr_user_detailsModels.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        ordr_user_detailsModels.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        ordr_user_detailsModels.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ordr_user_detailsModels.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"company type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
