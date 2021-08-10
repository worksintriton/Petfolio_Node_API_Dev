var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var waiter_adminrequestModel = require('./../models/waiter_adminrequestModel');


router.post('/create', async function(req, res) {
  try{
  await waiter_adminrequestModel.create({
  rest_id: req.body.rest_id,
  waiter_id : req.body.waiter_id || "",
  waiter_name : req.body.waiter_name|| "",
  chef_id : req.body.chef_id || "",
  chef_name : req.body.chef_name || "",
  type : req.body.type || "",
  title : req.body.title || "",
  request_text : req.body.request_text || "",
  request_date : req.body.request_date || "",
  response_text : req.body.response_text || "",
  response_date : req.body.response_date || "",
  date_of_create : req.body.date_of_create || "",
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Table added successfully", Data : user ,Code:200}); 
        });
}catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});



router.post('/chef/create', async function(req, res) {
  try{
  await waiter_adminrequestModel.create({
  rest_id: req.body.rest_id,
  waiter_id : req.body.waiter_id || "",
  waiter_name : req.body.waiter_name|| "",
  chef_id : req.body.chef_id || "",
  chef_name : req.body.chef_name || "",
  type : req.body.type || "",
  title : req.body.title || "",
  request_text : req.body.request_text || "",
  request_date : req.body.request_date || "",
  response_text : req.body.response_text || "",
  response_date : req.body.response_date || "",
  date_of_create : req.body.date_of_create || "",
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Table added successfully", Data : user ,Code:200}); 
        });
}catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});




router.post('/getting_shop_name', function (req, res) {
        waiter_adminrequestModel.findOne({shop_link_name:req.body.shop_link_name}, function (err, StateList) {
          let a = {
            Vendor_details : StateList
          }
          res.json({Status:"Success",Message:"company type List", Data : a ,Code:200});
        });
});



router.post('/chef/getlist',async function (req, res) {
  var table_details = await waiter_adminrequestModel.find({chef_id:req.body.chef_id});
  if(table_details.length == 0){
     res.json({Status:"Success",Message:"Waiter Request list", Data : [] ,Code:200});
  } else {
    let final_req = [];
    for(let a  = 0; a < table_details.length ; a ++){
      let c  = {
        "_id": table_details[a]._id,
        "rest_id":table_details[a].rest_id,
        "chef_id": table_details[a].chef_id,
        "chef_name": table_details[a].chef_name,
        "type": table_details[a].type,
        "title": table_details[a].title,
        "request_text": table_details[a].request_text,
        "request_date": table_details[a].request_date,
        "response_text":table_details[a].response_text,
        "response_date":table_details[a].response_date,
        "date_of_create": table_details[a].date_of_create,
      }
      final_req.push(c);
      if(a == table_details.length - 1){
         res.json({Status:"Success",Message:"Chef Request list", Data : final_req ,Code:200});
      }
    }
  }
    // res.json({Status:"Success",Message:"avator list Details", Data : table_details ,Code:200});
});




router.post('/waiter/getlist',async function (req, res) {
  var table_details = await waiter_adminrequestModel.find({waiter_id:req.body.waiter_id});
  if(table_details.length == 0){
     res.json({Status:"Success",Message:"Waiter Request list", Data : [] ,Code:200});
  } else {
    let final_req = [];
    for(let a  = 0; a < table_details.length ; a ++){
      let c  = {
        "_id": table_details[a]._id,
        "rest_id":table_details[a].rest_id,
        "waiter_id": table_details[a].waiter_id,
        "waiter_name": table_details[a].waiter_name,
        "type": table_details[a].type,
        "title": table_details[a].title,
        "request_text": table_details[a].request_text,
        "request_date": table_details[a].request_date,
        "response_text":table_details[a].response_text,
        "response_date":table_details[a].response_date,
        "date_of_create": table_details[a].date_of_create,
      }
      final_req.push(c);
      if(a == table_details.length - 1){
         res.json({Status:"Success",Message:"Waiter Request list", Data : final_req ,Code:200});
      }
    }
  }


  // res.json({Status:"Success",Message:"avator list Details", Data : table_details ,Code:200});
});


router.post('/admin/getlist',async function (req, res) {
  var table_details = await waiter_adminrequestModel.find({rest_id:req.body.rest_id});
  if(table_details.length == 0){
     res.json({Status:"Success",Message:"Admin Request list", Data : [] ,Code:200});
  } else {
    let final_req = [];
    for(let a  = 0; a < table_details.length ; a ++){
    	let user_name = "";
        if(table_details[a].type == "Chef"){
            user_name = table_details[a].chef_name;
        }else if(table_details[a].type == "Waiter"){
           user_name = table_details[a].waiter_name;
        }
      let c  = {
        "_id": table_details[a]._id,
        "rest_id":table_details[a].rest_id,
        "user_name": user_name,
        "type": table_details[a].type,
        "title": table_details[a].title,
        "request_text": table_details[a].request_text,
        "request_date": table_details[a].request_date,
        "response_text":table_details[a].response_text,
        "response_date":table_details[a].response_date,
        "date_of_create": table_details[a].date_of_create,
      }
      final_req.push(c);
      if(a == table_details.length - 1){
         res.json({Status:"Success",Message:"Admin Request list", Data : final_req ,Code:200});
      }
    }
  }

});




router.post('/chef/getlist',async function (req, res) {
  var table_details = await waiter_adminrequestModel.find({chef_id:req.body.chef_id});
  res.json({Status:"Success",Message:"avator list Details", Data : table_details ,Code:200});
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


router.get('/dropdown/getlist', function (req, res) {
    let a = [
       {'title':"Title 1"},
       {'title':"Title 2"},
       {'title':"Title 3"},
    ];
    res.json({Status:"Success",Message:"dropdown list Details", Data : a ,Code:200});
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
      waiter_adminrequestModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"company type Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        waiter_adminrequestModel.find({rest_id:req.body.rest_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Table List", Data : StateList ,Code:200});
        }).populate('rest_id');
});



router.get('/getlist', function (req, res) {
        waiter_adminrequestModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"company type Details", Data : Functiondetails ,Code:200});
        }).populate('rest_id');
});


router.get('/mobile/getlist', function (req, res) {
        waiter_adminrequestModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"company type Details", Data : a ,Code:200});
        });
});

router.post('/edit', function (req, res) {
        waiter_adminrequestModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"company type Updated", Data : UpdatedDetails ,Code:200});
        });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      waiter_adminrequestModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Table Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
