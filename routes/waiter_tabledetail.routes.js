var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var waiter_tabledetailModel = require('./../models/waiter_tabledetailModel');


router.post('/create', async function(req, res) {
  
  var table_details = await waiter_tabledetailModel.findOne({rest_id:req.body.rest_id,table_no:req.body.table_no});
  if(table_details !== null){
    res.json({Status:"Failed",Message:"Table number already created", Data : {} ,Code:200}); 
  }else{
  try{
  await waiter_tabledetailModel.create({
  rest_id: req.body.rest_id,
  table_no : req.body.table_no,
  table_desc : req.body.table_desc,
  table_status : req.body.table_status,
  table_color_code : req.body.table_color_code,
  table_order_status : req.body.table_order_status,
  date_of_create : req.body.date_of_create,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Table added successfully", Data : user ,Code:200}); 
        });
}catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  }

});


router.post('/getting_shop_name', function (req, res) {
        waiter_tabledetailModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
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
      waiter_tabledetailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        waiter_tabledetailModel.find({rest_id:req.body.rest_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Table List", Data : StateList ,Code:200});
        }).populate('rest_id');
});



router.get('/getlist', function (req, res) {
        waiter_tabledetailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        }).populate('rest_id');
});


router.get('/mobile/getlist', function (req, res) {
        waiter_tabledetailModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        waiter_tabledetailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      waiter_tabledetailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Table Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
