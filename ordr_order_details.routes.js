var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ordr_order_detailsModel = require('./../models/ordr_order_detailsModel');



router.post('/create', async function(req, res) {
  try{
        await ordr_order_detailsModel.create({

  Customer_id:  req.body.Customer_id,
  Item_detals : req.body.Item_detals,
  Payment_id : req.body.Payment_id,
  Total_amount : req.body.Total_amount,
  booking_date : req.body.booking_date,
  order_status : req.body.order_status,
  vendor_id : req.body.vendor_id,

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
        ordr_order_detailsModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
        });
});

// router.post('/getting_shop_name1',async function (req, res) {
//         var ordr_banner_detailsModels = await ordr_banner_detailsModel.find({user_id:req.body.user_id,Date:req.body.Date});
//         var ordr_catagories_detailsModels = await ordr_catagories_detailsModel.find({user_id:req.body.user_id,Date:req.body.Date}).populate('catagories_id');
//         ordr_vendor_detailsModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
//           let a = {
//             Vendor_details : StateList,
//             Catagories : ordr_catagories_detailsModels,
//             Vendor_banner : ordr_banner_detailsModels
//           }
//           res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
//         });
// });


router.post('/forgotpassword', function (req, res) {
        ordr_order_detailsModel.findOne({vendor_email:req.body.vendor_email}, function (err, StateList) {
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
      ordr_order_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        ordr_order_detailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"company type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        ordr_order_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        ordr_order_detailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        ordr_order_detailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ordr_order_detailsModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"company type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
