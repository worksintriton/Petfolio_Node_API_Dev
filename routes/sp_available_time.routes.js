var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var SP_available_timeModel = require('./../models/SP_available_timeModel');


router.post('/fetch_dates', async function(req, res) {
  try{
    var datas = await SP_available_timeModel.findOne({user_id:req.body.user_id});
    if(datas == null){
         let dates = [
           {
             "status" : false,
             "title" : "Monday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           },
           {
             "status" : false,
             "title" : "Tuesday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           },
           {
             "status" : false,
             "title" : "Wednesday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           },
           {
             "status" : false,
             "title" : "Thursday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           },
           {
             "status" : false,
             "title" : "Friday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           },
           {
             "status" : false,
             "title" : "Saturday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           },
           {
             "status" : false,
             "title" : "Sunday",
             "morning_time_start" : "10:00 AM",
             "morning_time_end" : "12:00 PM",
             "evening_time_start" : "01:00 PM",
             "evening_time_end" : "06:00 PM"
           }
         ];
        await SP_available_timeModel.create({
            user_id : req.body.user_id,
            Dates : dates,
            mobile_type : req.body.mobile_type,
            delete_status : true,
        }, 
        function (err, user) {
          console.log(err);

        res.json({Status:"Success",Message:"SP Added successfully", Data : user ,Code:200}); 
        });
            }
            else{
              res.json({Status:"Failed",Message:"Already added", Data : datas ,Code:404}); 
            }
}
catch(e){

      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});




router.get('/deletes', function (req, res) {
      SP_available_timeModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"ActivityModel Deleted", Data : {} ,Code:200});     
      });
});

router.post('/filter_date', function (req, res) {
        SP_available_timeModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"SP screen  List", Data : final_Date ,Code:200});
            }
          }
        });
});


router.post('/getlist_id', function (req, res) {
        SP_available_timeModel.find({user_id:req.body.user_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"SP holiday list", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        SP_available_timeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"SP holiday list", Data : Functiondetails ,Code:200});
        });
});


router.post('/updatetime',async function (req, res) {
  var datas = await SP_available_timeModel.findOne({user_id:req.body.user_id});
  console.log(datas)
        SP_available_timeModel.findByIdAndUpdate(datas._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"SP Time Updated", Data : UpdatedDetails ,Code:200});
        });
});

router.post('/edit',async function (req, res) {
  var datas = await SP_available_timeModel.findOne({user_id:req.body.user_id});
  console.log(datas)
        SP_available_timeModel.findByIdAndUpdate(datas._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"SP Time Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      SP_available_timeModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          console.log(err);
          res.json({Status:"Success",Message:"Holiday Deleted successfully", Data : {} ,Code:200});
      });
});



module.exports = router;
