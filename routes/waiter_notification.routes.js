var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var waiter_notificationModel = require('./../models/waiter_notificationModel');


router.post('/create', async function(req, res) {
  try{
  await waiter_notificationModel.create({
  rest_id:  req.body.rest_id,
  user_id :  req.body.user_id,
  notify_title : req.body.notify_title,
  notify_descri : req.body.notify_descri,
  notify_img : req.body.notify_img,
  notify_time : req.body.notify_time,
  date_and_time : req.body.date_and_time,
  delete_status : req.body.delete_status || false,
  read_status : req.body.read_status || false,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Notification added successfully", Data : user ,Code:200}); 
        });
}catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  

});


router.post('/getting_shop_name', function (req, res) {
        waiter_notificationModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
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
      waiter_notificationModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/user/getlist_id', function (req, res) {
        waiter_notificationModel.find({user_id:req.body.user_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User Notification List", Data : StateList ,Code:200});
        });
});


router.post('/admin/getlist_id', function (req, res) {
        waiter_notificationModel.find({rest_id:req.body.rest_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Admin Notification List", Data : StateList ,Code:200});
        });
});


router.post('/markread',async function (req, res) {
 var notify_details = await waiter_notificationModel.findOne({_id:req.body._id});
  let a = {
    read_status :  true
  }
  waiter_notificationModel.findByIdAndUpdate(req.body._id, a, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Notification Updated", Data : {} ,Code:200});
  });
});



router.get('/getlist', function (req, res) {
        waiter_notificationModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        }).populate('rest_id');
});


router.get('/mobile/getlist', function (req, res) {
        waiter_notificationModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        waiter_notificationModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      waiter_notificationModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Table Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
