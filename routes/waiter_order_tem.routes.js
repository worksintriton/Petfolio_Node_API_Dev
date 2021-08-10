var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var waiter_order_temMode = require('./../models/waiter_order_temModel');

var waiter_waiterdetailModel = require('./../models/waiter_waiterdetailModel');


router.post('/create', async function(req, res) {

  var waiter_detail = await waiter_order_temMode.findOne({_id:req.body.taken_id});
  console.log(waiter_detail);

  try{
  await waiter_order_temMode.create({
  rest_id: req.body.rest_id,
  order_id: req.body.order_id,
  table_no: req.body.table_no,
  taken_by: waiter_detail.waiter_name,
  taken_id: req.body.taken_id,
  order_date_book: req.body.order_date_book,
  item_detail: req.body.item_detail,
  order_date_complete: req.body.order_date_complete,
  chef_id: req.body.chef_id || "",
  order_status: "Booked",
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"category added successfully", Data : user ,Code:200}); 
        });
}catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/getting_shop_name', function (req, res) {
        waiter_order_temMode.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"category List", Data : a ,Code:200});
        });
});


router.get('/avator/getlist', function (req, res) {
    let a = [
       {'title':"Male"},
       {'title':"Female"},
       {'title':"Others"},
    ];
    res.json({Status:"Success",Message:"category Details", Data : a ,Code:200});
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




router.post('/update/overall_status',async function (req, res) {
  var order_details = await waiter_order_detailModel.findOne({order_id:req.body.order_id});
  var waiter_detail = await waiter_waiterdetailModel.findOne({_id:req.body.taken_id});
    // console.log(waiter_detail);
  console.log(order_details);
  let temp_data = order_details.item_detail; 
  for(let c = 0 ; c < temp_data.length ; c ++ ){
      temp_data[c].table_no = req.body.table_no;
      temp_data[c].waiter_id = req.body.taken_id;
      temp_data[c].item_status = req.body.order_status;
      if(c == temp_data.length - 1){
  // console.log(temp_data);
  let a = {
  table_no: req.body.table_no,
  taken_by: waiter_detail.waiter_name,
  taken_id: req.body.taken_id,
  order_date_complete : req.body.order_date_complete,
  remarks : req.body.remarks,
  chef_id : req.body.chef_id,
  order_status : req.body.order_status,
  item_detail : temp_data,
  order_cast : req.body.order_cast
  }
  console.log(order_details._id,a);
     waiter_order_detailModel.findByIdAndUpdate(order_details._id, a, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"category Updated", Data : UpdatedDetails ,Code:200});
   });

      }
  }
});




router.post('/update/single_status',async function (req, res) {
  var order_details = await waiter_order_detailModel.findOne({order_id:req.body.order_id});
  let temp_data = order_details.item_detail; 
  for(let c = 0 ; c < temp_data.length ; c ++ ){
    if(temp_data[c]._id == req.body._id){
      temp_data[c].item_status = req.body.item_status;
    }
  if(c == temp_data.length - 1){
  let a = {
  item_detail : temp_data,
  }
  console.log(order_details._id,a);
     waiter_order_detailModel.findByIdAndUpdate(order_details._id, a, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"category Updated", Data : UpdatedDetails ,Code:200});
   });
    }
  }
});






router.get('/deletes', function (req, res) {
      waiter_order_temMode.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"category Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        waiter_order_temMode.find({rest_id:req.body.rest_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"category List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        waiter_order_temMode.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"category Details", Data : Functiondetails ,Code:200});
        }).populate('rest_id');
});


router.get('/mobile/getlist', function (req, res) {
        waiter_order_temMode.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"category Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        waiter_order_temMode.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"category Updated", Data : UpdatedDetails ,Code:200});
        });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      waiter_order_temMode.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"category Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
