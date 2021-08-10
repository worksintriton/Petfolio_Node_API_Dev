var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var waiter_restaurantdetailModel = require('./../models/waiter_restaurantdetailModel');
var waiter_waiterdetailModel = require('./../models/waiter_waiterdetailModel');
var waiter_chefdetailModel = require('./../models/waiter_chefdetailModel');








// var VerifyToken = require('./VerifyToken');
// const { check, validationResult } = require('express-validator');

router.post('/create', async function(req, res) {
  try{
    var admin_user = await waiter_restaurantdetailModel.findOne({res_contact_no:req.body.res_contact_no});
    var waiter_user = await waiter_waiterdetailModel.findOne({waiter_number:req.body.res_contact_no});
    var chef_user = await waiter_chefdetailModel.findOne({chef_number:req.body.res_contact_no});
    console.log(admin_user,waiter_user,chef_user);
    if(admin_user !== null){
       res.json({Status:"Failed",Message:"Contact number already exist", Data : {} ,Code:404}); 
    }else if(waiter_user !== null){
       res.json({Status:"Failed",Message:"Contact number already exist", Data : {} ,Code:404}); 
    }else if(chef_user !== null){
       res.json({Status:"Failed",Message:"Contact number already exist", Data : {} ,Code:404}); 
    }else{
     var chat_user_Details = await waiter_restaurantdetailModel.findOne({log_id:req.body.log_id});
     console.log(chat_user_Details);
     if(chat_user_Details == null){
     await waiter_restaurantdetailModel.create({
          res_name: req.body.res_name || "",
          log_id: req.body.log_id || "",
          res_contact_no : req.body.res_contact_no || 0,
          res_google_link : req.body.res_google_link || "",
          res_open_time : req.body.res_open_time || "",
          res_close_time : req.body.res_close_time || "",
          res_address : req.body.res_address || "",
          res_person_name : req.body.res_person_name || "",
          res_person_contact : req.body.res_person_contact || 0,
          res_date_of_exp :req.body.res_date_of_exp || "",
          res_status : req.body.res_status || "",
          password : req.body.password || "",
          create_by : req.body.create_by || "",
          waiter_count : req.body.waiter_count || 0,
          chef_count : req.body.chef_count || 0,
          user_count : req.body.user_count || 0,
        },
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Restaurant added successfully", Data : user ,Code:200}); 
    });   
       } else{
        res.json({Status:"Failed",Message:"This restaurant already created", Data : {} ,Code:404}); 
       }


     }
}
catch(e){
  console.log(e);
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}
);






router.post('/forgotpassword',  function(req, res) {
      waiter_restaurantdetailModel.findOne({ Email_id: req.body.Email_id }, async function (err, user) {
        if (err) return res.error(500, "Internal server Error");
        console.log(user);
        if (user == null){
         res.json({Status:"Failed",Message:"Invalid Email Id. Enter registered Email id", Data : {},Code:300});
        } else {     
        var passworddata = await waiter_restaurantdetailModel.findOne({Email_id:req.body.Email_id});
        console.log('Testif',passworddata);
       var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'theteamordr@gmail.com',
            pass: 'ordr2020'
          }
        });
        var mailOptions = {
          to: req.body.vendor_email,
          subject: 'Forgot password Mail',
          text: "Please check your password : " + passworddata.Password,
      };
       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log("erorr related the mail ", error);
          } else {
          console.log('Email sent: ' + info.response);
          }
        });
       res.json({Status:"Success",Message:"Password has been sent to the registered Email ID", Data : {},Code:200});
           }
      });
});



router.post('/getlist_id', function (req, res) {
        waiter_restaurantdetailModel.find({_id:req.body.rest_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Restaurant List", Data : StateList ,Code:200});
        }).populate('rest_id');
});



router.post('/login',async function (req, res) {
      await waiter_restaurantdetailModel.findOne({log_id:req.body.User_id,password:req.body.Password}, function (err, UserDetails) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      if(UserDetails  == null){
           res.json({Status:"Success",Message:"User Not Found", Data : {} ,Code:404});  
      }else{
        res.json({Status:"Success",Message:"User Details", Data : UserDetails ,Code:200});
      }
      });
})



router.get('/getlist', async function (req, res) {
        await waiter_restaurantdetailModel.find({}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
        }).sort({createdAt:-1});
});



router.get('/getlist_fnyr', async function (req, res) {
          let start_yr =  1971;
          let end_yr = 2050
          let years = [];
        for(let a = start_yr ; a < end_yr ; a ++){
          let x = a+2;
          let y = a+1 +" - "+ x;
          years.push(y);
          if(a == end_yr - 1){
            res.json({Status:"Success",Message:"Financialyrs", Data : years ,Code:200});    
          }
        }
});




router.get('/deletes', function (req, res) {
      waiter_restaurantdetailModel.remove({}, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      res.json({Status:"Success",Message:"Financialyrs Deleted all", Data : {} ,Code:200});     
      });
});


router.get('/getlist_dropdown', async function (req, res) {
        await waiter_restaurantdetailModel.find({status:'false'}, function (err, CategoryDetails) {
          if(err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(CategoryDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Financialyrs", Data : CategoryDetails ,Code:200});
        }).sort({createdAt:-1});
});


router.post('/edit', async function (req, res) {
  console.log(req.body);
        await waiter_restaurantdetailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             if(UpdatedDetails == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
             res.json({Status:"Success",Message:"Updated successfully", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES A USER FROM THE DATABASE
router.post('/delete', async function (req, res) {
      await waiter_restaurantdetailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
           if(user == ""){
            return res.json({Status:"Failed",Message:"No data Found", Data : {},Code:404});
           }
          res.json({Status:"Success",Message:"Restaurant Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;