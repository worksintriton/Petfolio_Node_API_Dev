var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var product_detailsModel = require('./../models/product_detailsModel');


router.post('/create', async function(req, res) {
   
   
  try{
        await product_detailsModel.create({
            user_id :  req.body.user_id,
            cat_id :  req.body.cat_id,
            sub_cat_id:req.body.sub_cat_id,
            breed_type : req.body.breed_type,
            pet_type : req.body.pet_type,
            age : req.body.age,
            cost : req.body.cost,
            threshould : req.body.threshould,
            product_name : req.body.product_name,
            product_discription : req.body.product_discription,
            product_img :req.body.product_img,
            discount : req.body.discount,
            related : req.body.related,
            count : req.body.count,
            status : req.body.status,
            verification_status : req.body.verification_status,
            date_and_time : req.body.date_and_time,
            mobile_type : req.body.mobile_type,
            delete_status : req.body.delete_status,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"product details screen Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}

});




router.post('/test_create', async function(req, res) { 
  try{
        await product_detailsModel.create({
            user_id :  req.body.user_id,
            cat_id :  req.body.cat_id,
            sub_cat_id : req.body.sub_cat_id,
            pet_type : req.body.pet_type,
            breed_type : req.body.breed_type,
            age : req.body.age,
            cast : req.body.cast,
            threshould : req.body.threshould,
            product_discription : req.body.product_discription,
            product_img :req.body.product_img,
            discount : req.body.discount,
            related : req.body.related,
            count : req.body.count,
            status : req.body.status,
            verification_status : req.body.verification_status,
            date_and_time : req.body.date_and_time,
            mobile_type : req.body.mobile_type,
            delete_status : req.body.delete_status,
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"product details screen Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/getdetails', async function (req, res) {
	if(req.body.pet_type=="ALL"&& req.body.breed_type=="ALL"&&req.body.age=="ALL"){
		var Flitered_Data = await product_detailsModel.find({});
		res.json({Status:"Success",Message:"Demo screen List1", Data : Flitered_Data ,Code:200});
	}
	else if(req.body.breed_type=="ALL"&& req.body.age=="ALL"){
		var Flitered_Data = await product_detailsModel.find({pet_type:{$in:req.body.pet_type}});
		res.json({Status:"Success",Message:"Demo screen List2", Data : Flitered_Data ,Code:200});
	}
	else if(req.body.breed_type=="ALL"){
		var Flitered_Data = await product_detailsModel.find({Pet_Type:{$in:req.body.pet_type},Age:{$in:req.body.age}});
		res.json({Status:"Success",Message:"Demo screen List2", Data : Flitered_Data ,Code:200});
	}
	else if(req.body.pet_type=="ALL"){
		var Flitered_Data = await product_detailsModel.find({Breed_Type:{$in:req.body.breed_type},Age:{$in:req.body.age}});
		res.json({Status:"Success",Message:"Demo screen List2", Data : Flitered_Data ,Code:200});
	}
	else{
		var Flitered_Data = await product_detailsModel.find({Pet_Type:{$in:req.body.pet_type},Breed_Type:{$in:req.body.breed_type},Age:{$in:req.body.age}});
      console.log(Flitered_Data);
       res.json({Status:"Success",Message:"Demo screen List3", Data : Flitered_Data ,Code:200});
	}
   
});

router.post('/filter_date', function (req, res) {
        product_detailsModel.find({}, function (err, StateList) {
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
              res.json({Status:"Success",Message:"Demo screen List", Data : final_Date ,Code:200});
            }
          }
        });
});


router.get('/deletes', function (req, res) {
      product_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"product details screen  Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        product_detailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"product details screen  List", Data : StateList ,Code:200});
        });
});



router.get('/getlist', function (req, res) {
        product_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"product details screen  Details", Data : Functiondetails ,Code:200});
        }).populate('cat_id sub_cat_id breed_type pet_type');
});


router.get('/mobile/getlist', function (req, res) {
        product_detailsModel.find({show_status:true}, function (err, Functiondetails) {
          let a ={
             SplashScreendata : Functiondetails
          }
          res.json({Status:"Success",Message:"product details screen  Details", Data : a ,Code:200});
        });
});



router.post('/delete', function (req, res) {
 let c = {
    delete_status : true
  }
  product_detailsModel.findByIdAndUpdate(req.body._id, c, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Location Deleted successfully", Data : UpdatedDetails ,Code:200});
  });
});


router.post('/edit', function (req, res) {
        product_detailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"product details screen  Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/admin_delete', function (req, res) {
      product_detailsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"product details screen Deleted successfully", Data : {} ,Code:200});
      });
});

module.exports = router;
