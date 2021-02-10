var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UsertypeModel = require('./../models/UsertypeModel');


router.post('/create', async function(req, res) {
  try{
       let usertype  =  await UsertypeModel.findOne({user_type_title : req.body.user_type_title});
       if(usertype !== null){
        res.json({Status:"Failed",Message:"This title already added", Data : {},Code:500});
       } 
       else 
       {
         await UsertypeModel.create({
            user_type_title:  req.body.user_type_title,
            user_type_value : req.body.user_type_value,
            user_type_img : req.body.user_type_img,
            date_and_time : req.body.date_and_time,
            delete_status : false
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"User type Added successfully", Data : user ,Code:200}); 
        });
       }     
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});




router.post('/filter_date', function (req, res) {
        UsertypeModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"Demo screen  List", Data : final_Date ,Code:200});
            }
          }
        });
});

router.get('/deletes', function (req, res) {
      UsertypeModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        UsertypeModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User type List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        UsertypeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/admin/getlist', function (req, res) {
        UsertypeModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User type Details", Data : Functiondetails ,Code:200});
        });
});

router.get('/mobile/getlist', function (req, res) {
        UsertypeModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"User type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        UsertypeModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User type Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/delete', function (req, res) {
 let c = {
    delete_status : true
  }
  UsertypeModel.findByIdAndUpdate(req.body._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Location Deleted successfully", Data : UpdatedDetails ,Code:200});
  });
});



// // DELETES A USER FROM THE DATABASE
router.post('/admin_delete', function (req, res) {
      UsertypeModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
