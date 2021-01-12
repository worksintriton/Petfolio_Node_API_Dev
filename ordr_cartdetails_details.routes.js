var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ordr_cartdetails_detailsModel = require('./../models/ordr_cartdetails_detailsModel');


router.post('/create', async function(req, res) {
  try{
    console.log(req.body);
var type_check = await ordr_cartdetails_detailsModel.findOne({Customer_id:req.body.Customer_id,vendor_id:req.body.vendor_id,catagories_id:req.body.catagories_id,Item_id:req.body.Item_id});
if(type_check == null){
       await ordr_cartdetails_detailsModel.create({
      "Customer_id": req.body.Customer_id,
      "vendor_id": req.body.vendor_id,
      "Total_price": req.body.Single_price,
      "Item_id":req.body.Item_id,
      "catagories_id": req.body.catagories_id,
      "additional_info": req.body.additional_info,
      "quantity" : 1,
      "Delivery": req.body.Delivery,
      "Tax": req.body.Tax,
        }, 
        function (err, user) {
        res.json({Status:"Success",Message:"company type Added successfully", Data : user ,Code:200}); 
        });
}else{
  console.log(type_check);
     var Total_price = type_check.Total_price + req.body.Single_price;
     var Delivery = type_check.Delivery + req.body.Delivery;
     var Tax = type_check.Tax + req.body.Tax;
     var additional_info = type_check.additional_info + req.body.additional_info;
     var quantity = type_check.quantity + 1 ;
   const update = {
      Total_price : Total_price,
      Delivery : Delivery,
      additional_info : additional_info,
      Tax : Tax,
      quantity : quantity,
     };
            var Corporatecodeupdate = await ordr_cartdetails_detailsModel.findByIdAndUpdate({_id:type_check._id},update,{
             new: true
             });
    console.log("card details", Corporatecodeupdate);
    res.json({Status:"Success",Message:"company type Added successfully", Data : user ,Code:200}); 
}
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});



router.post('/remove', async function(req, res) {
  try{
    console.log(req.body);
var type_check = await ordr_cartdetails_detailsModel.findOne({Customer_id:req.body.Customer_id,vendor_id:req.body.vendor_id,catagories_id:req.body.catagories_id,Item_id:req.body.Item_id});
  console.log("Removed Data",type_check);
  if(type_check.quantity == 1){
    var deletes_data = await ordr_cartdetails_detailsModel.findByIdAndRemove({_id:type_check._id});
    res.json({Status:"Success",Message:"company type Added successfully", Data : user ,Code:200}); 
  } else {
    console.log("Data reducesd");
     var Total_price = type_check.Total_price - req.body.Single_price;
     var Delivery = type_check.Delivery - req.body.Delivery;
     var Tax = type_check.Tax - req.body.Tax;
     var quantity = type_check.quantity - 1 ;

     console.log(Total_price,Delivery,Tax,quantity);
   const update = {
      Total_price : Total_price,
      Delivery : Delivery,
      Tax : Tax,
      quantity : quantity,
     };
     console.log("Datassdf",update);
    var Corporatecodeupdate = await ordr_cartdetails_detailsModel.findByIdAndUpdate({_id:type_check._id},update,{
    new: true
    });
    console.log("card details", Corporatecodeupdate);
    res.json({Status:"Success",Message:"company type Added successfully", Data : {} ,Code:200}); 
  }
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});

router.post('/getting_shop_name', function (req, res) {
        ordr_cartdetails_detailsModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"company type List", cart_count : a ,Code:200});
        });
});



router.post('/getlist_id', function (req, res) {
        ordr_cartdetails_detailsModel.find({Customer_id:req.body.Customer_id,vendor_id : req.body.vendor_id}, function (err, StateList) {
          console.log(StateList);
          var Tax = 0;
          var Delivery = 0;
          var prime_total = 0;
          if(StateList.length == 0){
            res.json({Status:"Success",Message:"company type List", 
            cart_count : StateList.length,
            Data : StateList,
            Tax : Tax,
            Delivery : Delivery,
            prime_total : prime_total,
            Code:200});
          }else{
            for(let a = 0 ; a < StateList.length; a ++){
           console.log(StateList[a].Total_price);
           prime_total = prime_total + StateList[a].Total_price;
           Tax = Tax + StateList[a].Tax;
           Delivery = Delivery + StateList[a].Delivery;
           if(a == StateList.length - 1){
            res.json({Status:"Success",Message:"company type List", 
            cart_count : StateList.length,
            Data : StateList,
            Tax : Tax,
            Delivery : Delivery,
            prime_total : prime_total,
            Code:200});
           }
          }
          }
          

          
        }).populate('Item_id');
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
      ordr_cartdetails_detailsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


// router.post('/getlist_id', function (req, res) {
//         ordr_cartdetails_detailsModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
//           res.json({Status:"Success",Message:"company type List", Data : StateList ,Code:200});
//         });
// });



router.get('/getlist', function (req, res) {
        ordr_cartdetails_detailsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        ordr_cartdetails_detailsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        ordr_cartdetails_detailsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ordr_cartdetails_detailsModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"company type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
