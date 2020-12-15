var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var notificationModel = require('./../models/notificationModel');


router.post('/create', async function(req, res) {
  try{
        await notificationModel.create({
            user_id:  req.body.user_id,
            notify_title : req.body.notify_title,
            notify_descri : req.body.notify_descri,
            notify_img : req.body.notify_img,
            notify_time : "",
            date_and_time : req.body.date_and_time,
            delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Notification Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});



router.post('/send_notifiation', async function(req, res) {
  ///Notification Sending process///
   var headers1 = {
          authorization:
            "key=AAAAuAfKTJc:APA91bEgV3d-Ww4UU6EbruDZ-UOQUhFsYnwuuYGclQ6-AEr0i1cqhrprwD7o2bUc_CXAPlqOE4A0JKy-c_RsBNfOP2eoFgSVGICKpFIYQjzMuUKdUD61HVI0U9KTOOKXVwbUszR2BeVQ",
          "content-type": "application/json"
     };
     // Set the message as high priority and have it expire after 24 hours.
        var options = {
          priority: "high",
          timeToLive: 60 * 60 * 24
        };
          var request1 = require("request");
           // firebase url
        var myURL1 = "https://fcm.googleapis.com/fcm/send";
        var body1 = {
          to: req.body.user_token,
          notification: {
            title: req.body.title,
            body: req.body.message,
            subtitle: req.body.subtitle,
            sound: "default"
          }
        };
         request1.post(
            {
              url: myURL1,
              method: "POST",
              headers1,
              body: body1,
              options,
              json: true
            }, function(error, response, body1) {
              if (error) {
                return res.json(
                  _.merge(
                    {
                      error: error
                    },
                    utils.errors["500"]
                  )
                );
              }else {
              	// console.log(response);
                console.log("Firebase Send");
              }
            });

  try{
        await notificationModel.create({
            user_id:  req.body.user_id,
            notify_title : req.body.notify_title,
            notify_descri : req.body.notify_descri,
            notify_img : req.body.notify_img,
            notify_time : "",
            date_and_time : req.body.date_and_time
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Notification Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});



router.get('/deletes', function (req, res) {
      notificationModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Notification Deleted", Data : {} ,Code:200});     
      });
});


router.post('/mobile/getlist_id', function (req, res) {
        notificationModel.find({user_id:req.body.user_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Notification List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        notificationModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Notification Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        notificationModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"Notification Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        notificationModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Notification Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      notificationModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Notification Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
