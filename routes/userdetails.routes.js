var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var userdetailsModel = require('./../models/userdetailsModel');


router.post('/create', async function(req, res) {
  try{
       let random = Math.floor(Math.random() * 899999 + 100000)
       let phone  =  await userdetailsModel.findOne({user_phone : req.body.user_phone});
       console.log(phone);
       if(phone !== null){
        res.json({Status:"Failed",Message:"This phone number already registered",Data : {},Code:404}); 
       }else
       {
          await userdetailsModel.create({
            first_name:  req.body.first_name,
            last_name : req.body.last_name,
            user_email : req.body.user_email,
            user_phone : req.body.user_phone,
            date_of_reg : req.body.date_of_reg,
            user_type : req.body.user_type,
            otp : random,
        }, 
        function (err, user) {
          console.log(user)
          let a  = {
            user_details : user
          }
        res.json({Status:"Success",Message:"Sign up successfully! welcome to petfolio",Data : a , Code:200}); 
        });
       }
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      userdetailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User Details Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        userdetailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User Details List", Data : StateList ,Code:200});
        });
});


router.post('/mobile/resendotp', function (req, res) {
        userdetailsModel.findOne({user_phone:req.body.user_phone}, function (err, StateList) {
        
        if(StateList == null){
           res.json({Status:"Failed",Message:"Invalid Mobile Number", Data : {} ,Code:404});
        }else{
          let a = {
            OTP : StateList.otp,
            User_Details : StateList
          }
          res.json({Status:"Success",Message:"OTP sent successfully! welcome to petfolio", Data : a ,Code:200});
        }
        });
});



router.get('/getlist', function (req, res) {
        userdetailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User Details Details", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        userdetailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User Details Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      userdetailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User Details Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
