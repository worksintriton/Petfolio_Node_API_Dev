var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var AppointmentsModel = require('./../models/AppointmentsModel');
var doctordetailsModel = require('./../models/doctordetailsModel');


router.post('/mobile/create', async function(req, res) {
  try{
        let display_date = req.body.date_and_time;

        let Appointmentid = "PET-" + new Date().getTime();
        var doctordetailsModels = await doctordetailsModel.findOne({user_id:req.body.doctor_id});

        await AppointmentsModel.create({
            doctor_id : req.body.doctor_id,
            appointment_UID : Appointmentid,
            booking_date : req.body.booking_date,
            booking_time : req.body.booking_time,
            booking_date_time : req.body.booking_date_time,
            communication_type : req.body.communication_type,
            msg_id : Appointmentid,
            video_id : req.body.video_id,
            user_id : req.body.user_id,
            pet_id : req.body.pet_id,
            problem_info : req.body.problem_info,
            doc_attched : req.body.doc_attched,
            appoinment_status : "Incomplete",
            start_appointment_status : "Not Started",
            end_appointment_status : "Not End",
            doc_feedback : req.body.doc_feedback,
            doc_rate : req.body.doc_rate,
            user_feedback : req.body.user_feedback,
            user_rate : req.body.user_rate,
            display_date : req.body.display_date,
            server_date_time : req.body.server_date_time,
            payment_method : req.body.payment_method,
            prescription_details : "",
            vaccination_details :"",
            appointment_types : req.body.appointment_types,
            allergies : req.body.allergies,
            payment_id : req.body.payment_id,
            amount : req.body.amount,
            service_name :  req.body.service_name,
            service_amount :  req.body.service_amount,
            completed_at : req.body.completed_at,
            missed_at : req.body.missed_at,
            mobile_type : req.body.mobile_type,
            doc_business_info : doctordetailsModels
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Appointment Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.post('/mobile/doc_getlist/newapp', function (req, res) {
        AppointmentsModel.find({doctor_id:req.body.doctor_id,appoinment_status:"Incomplete"}, function (err, StateList) {
          console.log(StateList);
           StateList.sort(function compare(a, b) {
              console.log(a.server_date_time);
              console.log(b.server_date_time);
               var dateA = new Date(a.server_date_time);
               var dateB = new Date(b.server_date_time);
               console.log(dateA,dateB);
               return dateB - dateA;
               });
          res.json({Status:"Success",Message:"New Appointment List", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});


router.post('/mobile/doc_getlist/comapp', function (req, res) {
        AppointmentsModel.find({doctor_id:req.body.doctor_id,appoinment_status:"Completed"}, function (err, StateList) {
          console.log(StateList);
           StateList.sort(function compare(a, b) {
              console.log(a.server_date_time);
              console.log(b.server_date_time);
               var dateA = new Date(a.server_date_time);
               var dateB = new Date(b.server_date_time);
               console.log(dateA,dateB);
               return dateB - dateA;
               });
          res.json({Status:"Success",Message:"Completed Appointment List", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});



router.post('/mobile/doc_getlist/missapp', function (req, res) {
        AppointmentsModel.find({doctor_id:req.body.doctor_id,appoinment_status:"Missed"}, function (err, StateList) {
          console.log(StateList);
           StateList.sort(function compare(a, b) {
              console.log(a.server_date_time);
              console.log(b.server_date_time);
               var dateA = new Date(a.server_date_time);
               var dateB = new Date(b.server_date_time);
               console.log(dateA,dateB);
               return dateB - dateA;
               });
          res.json({Status:"Success",Message:"Missed Appointment List", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});


router.post('/mobile/plove_getlist/newapp',async function (req, res) {
        AppointmentsModel.find({user_id:req.body.user_id,appoinment_status:"Incomplete"}, function (err, StateList) {
          console.log(StateList);
           StateList.sort(function compare(a, b) {
              console.log(a.server_date_time);
              console.log(b.server_date_time);
               var dateA = new Date(a.server_date_time);
               var dateB = new Date(b.server_date_time);
               console.log(dateA,dateB);
               return dateB - dateA;
               });
          res.json({Status:"Success",Message:"New Appointment List", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});


router.post('/mobile/plover_getlist/comapp', function (req, res) {
        AppointmentsModel.find({user_id:req.body.user_id,appoinment_status:"Completed"}, function (err, StateList) {
          console.log(StateList);
           StateList.sort(function compare(a, b) {
              console.log(a.server_date_time);
              console.log(b.server_date_time);
               var dateA = new Date(a.server_date_time);
               var dateB = new Date(b.server_date_time);
               console.log(dateA,dateB);
               return dateB - dateA;
               });
          res.json({Status:"Success",Message:"Completed Appointment List", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});



router.post('/mobile/plover_getlist/missapp', function (req, res) {
        AppointmentsModel.find({user_id:req.body.user_id,appoinment_status:"Missed"}, function (err, StateList) {
          console.log(StateList);
           StateList.sort(function compare(a, b) {
              console.log(a.server_date_time);
              console.log(b.server_date_time);
               var dateA = new Date(a.server_date_time);
               var dateB = new Date(b.server_date_time);
               console.log(dateA,dateB);
               return dateB - dateA;
               });
          res.json({Status:"Success",Message:"Missed Appointment List", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});



router.post('/get_doc_new',async function (req, res) {
   var date_details = await New_Doctor_time.findOne({user_id:req.body.user_id});
   var Holiday_details = await HolidayModel.find({user_id:req.body.user_id});
   var doctor_details = await LiveDoctor.findOne({user_id:req.body.user_id});
  let reqdate = req.body.Date.split("-");
  let repdate = reqdate[2]+"-"+reqdate[1]+"-"+reqdate[0];
  var d = new Date(repdate);
   let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   let dayss = weekday[d.getDay()];
   for(let a = 0 ; a < date_details.Doctor_date_time.length ; a ++){
     if(dayss == date_details.Doctor_date_time[a].Title){
               if(date_details.Doctor_date_time[a].Status == false){
                res.json({Status:"Failed",Message:"Doctor is not available on this day", Data : [] ,Code:404});
               }else{
                   let times = date_details.Doctor_time[a].Time;
                   let finaltime = [];
                   for(let c = 0 ; c < times.length ; c ++){
                    if(times[c].Status == true){
                      let d = {
                        time : times[c].Time
                      }
                      finaltime.push(d);
                    }
                    if(c == times.length-1){
                      let ad = [];
                      let Comm_type_chat = 'No';
                      let Comm_type_video = 'No';
                      let Doctor_ava_Date = req.body.Date;
                      let Doctor_name = doctor_details.Name;
                      let Doctor_email_id =  doctor_details.Email;
                      if(doctor_details.call_type == 'Chat'){
                            Comm_type_chat = 'Yes';
                      }else if(doctor_details.call_type == 'Video'){
                             Comm_type_video = 'Yes';
                      }else if(doctor_details.call_type == 'Chat & Video'){
                             Comm_type_video = 'Yes';
                             Comm_type_chat = 'Yes';
                      }
                       console.log(req.body.Date,req.body.cur_date);

                      if(req.body.Date == req.body.cur_date){
                        let datas = [];
                        let check = 1;
                        console.log(finaltime);
                        for(let a  = 0 ; a < finaltime.length ; a ++)
                        {
                          // console.log(finaltime[a].time)
                          let cur_time = finaltime[a].time.split(":");
                          let cur_time1 = req.body.cur_time.split(":");
                          let cur_time2 = finaltime[a].time.split(" ");
                          let cur_time3 = req.body.cur_time.split(" ");
                          if(cur_time2[1] == cur_time3[1]){
                            console.log(finaltime[a].time);
                            console.log(+cur_time[0],+cur_time1[0]);
                          if(+cur_time[0] >= +cur_time1[0]){
                            check = 0;
                            console.log("Testing");
                           }
                           }
                          if(check == 0){
                            let d = {
                            time : finaltime[a].time
                            }
                            datas.push(d);
                          }
                          if(a == finaltime.length - 1){
                            finaltime = [];
                                     let cur_time3 = req.body.cur_time.split(" ");
                                     let cur_time1 = cur_time3[0].split(":");
                                     let cur_time2 = datas[0].time.split(" ");
                                     let cur_time4 = cur_time2[0].split(":");
                                     console.log(cur_time1,cur_time4); 
                                     if(+cur_time1[1] > 0 &&  cur_time1[0] == cur_time4[0]){
                                         datas.splice(0, 1);
                                     }
                            finaltime = datas;
                          }
                        }
                      }
                      console.log(finaltime);
                      let dd = {
                        Comm_type_chat : Comm_type_chat,
                        Comm_type_video : Comm_type_video,
                        Doctor_email_id : Doctor_email_id,
                        Doctor_ava_Date : Doctor_ava_Date,
                        Doctor_name : Doctor_name,
                        Times : finaltime    
                      }
                      ad.push(dd);
                       console.log("VVVVVVV",Holiday_details);
                       let checkss = 0
                     
                       if(Holiday_details.length == 0){
                             if(ad[0].Times.length == 0){
                                              res.json({Status:"Failed",Message:"Doctor is not available on this day", Data : [] ,Code:404});

                                       }else{
                                              res.json({Status:"Success",Message:"Doctor Available", Data : ad,Code:200});

                                       }
                       }else{
                       for(let t = 0 ; t < Holiday_details.length ; t++){
                           if(req.body.Date == Holiday_details[t].Date){
                            checkss = 1
                           }
                           if(t == Holiday_details.length - 1){
                                 if(checkss == 0){
                                       if(ad[0].Times.length == 0){
                                              res.json({Status:"Failed",Message:"Doctor is not available on this day", Data : [] ,Code:404});

                                       }else{
                                              res.json({Status:"Success",Message:"Doctor Available", Data : ad,Code:200});

                                       }

                                                       }else{
                                                                   res.json({Status:"Failed",Message:"Doctor is not available on this day", Data : [] ,Code:404});
                                                       }
                           }
                       }
                     }
                    }
                   }
               }
     }
   
   }
});



router.post('/check', async function(req, res) {
  try{
    await AppointmentsModel.findOne({user_id:req.body.user_id,Booking_Date:req.body.Booking_Date,Booking_Time:req.body.Booking_Time}, function (err, Appointmentdetails) {
          console.log(Appointmentdetails);
          if(Appointmentdetails!== null){
            res.json({Status:"Failed",Message:"Slot not Available",Data : {} ,Code:300});
          }
          else{
            res.json({Status:"Success",Message:"Available",Data : {} ,Code:200});
          }
          
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});



router.get('/deletes', function (req, res) {
      AppointmentsModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Appointment Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        AppointmentsModel.findOne({_id:req.body.Appointment_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"Appointment Details", Data : StateList ,Code:200});
        }).populate('user_id doctor_id pet_id');
});



router.get('/getlist', function (req, res) {
        AppointmentsModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Appointment Details", Data : Functiondetails ,Code:200});
        });
});


router.get('/mobile/getlist', function (req, res) {
        AppointmentsModel.find({}, function (err, Functiondetails) {
          let a = {
            usertypedata : Functiondetails
          }
          res.json({Status:"Success",Message:"Appointment Details", Data : a ,Code:200});
        });
});


router.post('/mobile/doctor/app_edit', function (req, res) {
        AppointmentsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Appointment Updated", Data : UpdatedDetails ,Code:200});
        });
});


router.post('/mobile/user/edit', function (req, res) {
        AppointmentsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Appointment Updated", Data : UpdatedDetails ,Code:200});
        });
});




router.post('/edit', function (req, res) {
        AppointmentsModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Appointment Updated", Data : UpdatedDetails ,Code:200});
        });
});


// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      AppointmentsModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"Appointment Deleted successfully", Data : {} ,Code:200});
      });
});


module.exports = router;
