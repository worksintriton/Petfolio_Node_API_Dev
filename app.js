var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');	
var fileUpload = require('express-fileupload');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
var fs = require('fs');
var pug = require ('pug');

var responseMiddleware = require('./middlewares/response.middleware');

/*Routing*/

var Activity = require('./routes/Activity.routes');
var userdetails = require('./routes/userdetails.routes');
var Usertype = require('./routes/Usertype.routes');
var Splashscreen = require('./routes/Splashscreen.routes');
var Demoscreen = require('./routes/Demoscreen.routes');
var PrescriptionRouter  = require('./routes/Prescription.routes');




var petdetails = require('./routes/petdetails.routes');
var doctordetails = require('./routes/doctordetails.routes');
var livedoctordetails = require('./routes/livedoctordetails.routes');
var vendordetails = require('./routes/vendordetails.routes');
var locationdetails = require('./routes/locationdetails.routes');
var homebannerdetails = require('./routes/homebanner.routes');
var doctor_sepc = require('./routes/doctor_sepc.routes');


var appointments = require('./routes/appointments.routes');

var pettype = require('./routes/pettype.routes');
var breedtype = require('./routes/breedtype.routes');
var notification = require('./routes/notification.routes');
var New_DoctorAvailable = require('./routes/New_Doctor_available.routes');
var HolidayRouter = require('./routes/Holiday.routes');

var SP_Holiday = require('./routes/SP_Holiday.routes');
var SP_services = require('./routes/SP_services.routes');
var SP_appointments = require('./routes/sp_appointments.routes');
var SP_available_time = require('./routes/sp_available_time.routes');


var product_vendor = require('./routes/product_vendor.routes');
var product_cate = require('./routes/product_categories.routes');
var product_subcat = require('./routes/product_subcat.routes');
var product_details = require('./routes/product_details.routes');




/*Database connectivity*/

var BaseUrl = "http://54.212.108.156:3000/api"; 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/Salveo'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

app.use(fileUpload());
app.use(responseMiddleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'pug');

/*Response settings*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});



///////Notification Auto Schedule Process for 15 min  once ///////
const intervalObj = setInterval(() => {
var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
console.log(indiaTime);
var space = indiaTime.split(":");
console.log(space);
console.log(+space[1]);
if(+space[1] % 5 === 0  ){
  console.log("Checking Notification");
}
notificationcall();
},60000);

function notificationcall(){
    console.log("***********************API IS CALL *********************");
    console.log("********************************************");
//     console.log(time,dates);
// let params = {   
//         "Booking_Date" : dates,
//         "Booking_Time": time
// }
// var request = require("request");
//   request.post('http://mysalveo.com/api/notifications/notifydoctor',params,function(err,res,body)
//   {
//   if(err) //TODO: handle err
//     console.log(res.body);
// });

//     request.post('http://mysalveo.com/api/notifications/notifypatient',params,function(err,res,body)
//   {
//   if(err) //TODO: handle err
//     console.log(res.body);
// });

}


////////////// Notification Process Close here //////////////




app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.error(300,'No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/public/uploads/' + sampleFile.name;

  var Finalpath =  BaseUrl +'/uploads/'+ sampleFile.name;
   console.log("uploaded path",uploadPath )


  sampleFile.mv(uploadPath, function(err) {
    if (err) {
   console.log(err)
   return res.error(500, "Internal server error");
    }
   res.json({Status:"Success",Message:"file upload success", Data :Finalpath,Code:200});
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/', express.static(path.join(__dirname, 'public')));
app.use('/api/', express.static(path.join(__dirname, 'routes')));


app.use('/api/activity', Activity);
app.use('/api/userdetails', userdetails);
app.use('/api/usertype', Usertype);
app.use('/api/splashscreen', Splashscreen);
app.use('/api/demoscreen', Demoscreen);

app.use('/api/petdetails',petdetails);
app.use('/api/doctordetails',doctordetails);
app.use('/api/livedoctordetails',livedoctordetails);
app.use('/api/service_provider',vendordetails);
app.use('/api/locationdetails',locationdetails);

app.use('/api/appointments',appointments);
app.use('/api/pettype',pettype);
app.use('/api/breedtype',breedtype);
app.use('/api/notification',notification);
app.use('/api/new_doctortime',New_DoctorAvailable);
app.use('/api/holiday',HolidayRouter);
app.use('/api/homebanner',homebannerdetails);
app.use('/api/doctor_spec',doctor_sepc);
app.use('/api/prescription',PrescriptionRouter);

app.use('/api/sp_holiday',SP_Holiday);
app.use('/api/sp_services',SP_services);
app.use('/api/sp_appointments',SP_appointments);
app.use('/api/sp_available_time',SP_available_time);





app.use('/api/product_vendor',product_vendor);
app.use('/api/product_cate',product_cate);
app.use('/api/product_subcat',product_subcat);
app.use('/api/product_details',product_details);













// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
