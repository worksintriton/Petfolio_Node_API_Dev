var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ordr_productitem_detailsModels = require('./../models/ordr_productitem_detailsModels');
var ordr_cartdetails_detailsModel = require('./../models/ordr_cartdetails_detailsModel');

router.post('/create', async function(req, res) {
  try{

        await ordr_productitem_detailsModels.create({
  catagories_id:  req.body.catagories_id,
  cart_type : req.body.cart_type,
  item_title :req.body.item_title,
  item_descri : req.body.item_descri,
  item_audio : req.body.item_audio,
  item_image : req.body.item_image,
    item_nature_status : req.body.item_nature_status,
      item_tag_type : req.body.item_tag_type,
        item_tag_name : req.body.item_tag_name,
          Prices : req.body.Prices,
          item_original_price : req.body.item_original_price,
          item_discount_type : req.body.item_discount_type,
          status : req.body.status,
          Order_information : req.body.Order_information,
          cart_count : req.body.cart_count,
          Tax : req.body.Tax,
          Delivery : req.body.Delivery,
          item_day_setting : req.body.item_day_setting,
          item_time_start : req.body.item_time_start,
          item_time_end : req.body.item_time_end,
          item_day_type : req.body.item_day_type,
          Expensive : [],
          vendor_id: req.body.vendor_id,
        }, 
        function (err, user) {


        res.json({Status:"Success",Message:"company type Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/getting_shop_name', function (req, res) {
        ordr_productitem_detailsModels.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
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
      ordr_productitem_detailsModels.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});







router.post('/getlist_websie_id',async function (req, res) {
    var type_check = await ordr_cartdetails_detailsModel.find({Customer_id:req.body.Customer_id,catagories_id:req.body.catagories_id});
        ordr_productitem_detailsModels.find({catagories_id : req.body.catagories_id}, function (err, StateList) {
           for(let a = 0 ; a < StateList.length ; a++){
                   for(let b = 0 ; b < type_check.length ; b++){
                    console.log(StateList[a]._id,type_check[b].Item_id);
                         if(""+StateList[a]._id == ""+type_check[b].Item_id){
                               StateList[a].cart_count = type_check[b].quantity
                         }
                   }
                   if(a == StateList.length - 1){
                    console.log(StateList);
                    res.json({Status:"Success",Message:"company type List", Data : StateList ,Code:200});
                   }
           }
        }).populate('catagories_id');
});


router.post('/getlist_id', function (req, res) {
        ordr_productitem_detailsModels.find({catagories_id:req.body._id}, function (err, StateList) {
          res.json({Status:"Success",Message:"company type List", Data : StateList ,Code:200});
        });
});



router.post('/getlist_id_menusetting', function (req, res) {
        ordr_productitem_detailsModels.find({}, function (err, StateList) {
          var final_Data = [];
          for(let a  = 0 ; a < StateList.length;a ++){
            console.log(StateList[a]._id);
             // console.log(StateList[a].catagories_id.vendor_id,req.body._id);
              if(""+StateList[a].catagories_id.vendor_id == ""+req.body._id){
              final_Data.push(StateList[a]);
              if(a == StateList.length - 1){
                 res.json({Status:"Success",Message:"company type List", Data : final_Data ,Code:200})
               }
              }
          }
         ;
        }).populate('catagories_id');
});


router.post('/update_time_date_time',async function (req, res) {
    var item_detailss = req.body.Item_details
    for(let a = 0 ; a < item_detailss.length ; a ++) {
    const update = {
      item_day_type : req.body.item_day_type,
      item_time_end : req.body.item_time_end,
      item_time_start : req.body.item_time_start,
     };
      var Corporatecodeupdate = await ordr_cartdetails_detailsModel.findByIdAndUpdate({_id:item_detailss[a]},update,{
      new: true
      });
      if(a == item_detailss.length - 1){
        res.json({Status:"Success",Message:"Time Added successfully", Data : {} ,Code:200})
      }
    } 
});


router.get('/getlist', function (req, res) {
        ordr_productitem_detailsModels.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        }).populate('catagories_id');
});


router.get('/mobile/getlist', function (req, res) {
        ordr_productitem_detailsModels.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        ordr_productitem_detailsModels.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});

// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      ordr_productitem_detailsModels.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"company type Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
