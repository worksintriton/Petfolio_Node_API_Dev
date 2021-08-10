var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ordr_notification_detailsModel = require('./../models/ordr_notification_detailsModel');



router.post('/create', async function(req, res) {
  try{
await ordr_notification_detailsModel.create({
  vendor_id:  req.body.vendor_id,
  user_id : req.body.user_id,
  title :req.body.title,
  message : req.body.message,
  status : req.body.status,
  view_status : req.body.view_status,
  date_of_register : req.body.date_of_register
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"notification Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/get_notification', function (req, res) {
        ordr_notification_detailsModel.find({vendor_id:req.body.vendor_id,view_status:"Not Readed"}, function (err, StateList) {
           if(StateList.length == 0 ){
            let a = {
            notification_list : [],
            notification_code : 0
           } 
           res.json({Status:"Success",Message:"notification List", Data : a ,Code:200});
           }
           else{

            var final = [];
            for(let x = 0 ; x < StateList.length ; x ++){
            let c = {
                 "_id": StateList[x]._id,
                "vendor_id": StateList[x].vendor_id,
                "user_id": StateList[x].user_id,
                "title": StateList[x].title,
                "view_status": StateList[x].view_status,
                "date_of_register": StateList[x].date_of_register,
                "updatedAt": StateList[x].updatedAt,
                "createdAt": StateList[x].createdAt,
            }
            final.push(c); 
            if(x == StateList.length - 1){
              let a = {
            notification_list : final,
            notification_code : StateList.length
           } 
           res.json({Status:"Success",Message:"notification List", Data : a ,Code:200});

            }
           }

           }
        });
});


router.post('/get_all_notification', function (req, res) {
       ordr_notification_detailsModel.find({vendor_id:req.body.vendor_id}, function (err, StateList) {
           if(StateList.length == 0 ){
            let a = {
            notification_list : [],
            notification_code : 0
           } 
           res.json({Status:"Success",Message:"All notification List", Data : a ,Code:200});
           }
           else{
            var final = [];
            for(let x = 0 ; x < StateList.length ; x ++){
            let c = {
                 "_id": StateList[x]._id,
                "vendor_id": StateList[x].vendor_id,
                "user_id": StateList[x].user_id,
                "title": StateList[x].title,
                "view_status": StateList[x].view_status,
                "date_of_register": StateList[x].date_of_register,
                "updatedAt": StateList[x].updatedAt,
                "createdAt": StateList[x].createdAt,
            }
            final.push(c); 
            if(x == StateList.length - 1){
              let a = {
            notification_list : final,
            notification_code : StateList.length
           } 
           res.json({Status:"Success",Message:"All notification List", Data : a ,Code:200});

            }
           }

           }
        });
});



router.post('/update_notification_status',async function (req, res) {
  let c = {
    view_status : "Readed"
          }
        ordr_notification_detailsModel.findByIdAndUpdate(req.body._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"notification Updated", Data : UpdatedDetails ,Code:200});
        });
});




router.post('/getting_shop_name', function (req, res) {
        ordr_notification_detailsModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"notification List", Data : a ,Code:200});
        });
});



router.post('/forgotpassword', function (req, res) {
        ordr_notification_detailsModel.findOne({vendor_email:req.body.vendor_email}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"notification List", Data : a ,Code:200});
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
    res.json({Status:"Success",Message:"notificationDetails", Data : a ,Code:200});
});


router.get('/access/getlist', function (req, res) {
    let a = [
       {'title':"View"},
       {'title':"Edit"},
    ];
    res.json({Status:"Success",Message:"notification list Details", Data : a ,Code:200});
});


router.get('/projecttype/getlist', function (req, res) {
    let a = [
       {'title':"view"},
       {'title':"Edit"},
    ];
    res.json({Status:"Success",Message:"notification list Details", Data : a ,Code:200});
});






router.get('/deletes', function (req, res) {
      ordr_notification_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"notification Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        ordr_notification_detailsModel.findOne({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"notification List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        ordr_notification_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"notification Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        ordr_notification_detailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"notification Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        ordr_notification_detailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"notification Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ordr_manager_detailsModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"notification Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
