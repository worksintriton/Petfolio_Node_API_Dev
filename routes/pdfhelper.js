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
var fs = require('fs');
var pug = require ('pug');
var BaseUrl = "http://52.25.163.13:3000";
var app = express();
app.use('/api/', express.static(path.join(__dirname, 'public')));

exports.pdfgenerator = async function (doctordata,Prescription_data,doctor_commeents) {
   try{
    //console.log(Prescription_data);
    console.log("image path",doctordata);
       var source = fs.readFileSync(path.resolve(__dirname, "./views/doctor.pug"),'utf-8');
       //console.log(source)
     var specialization = "";
     for(var i=0; i< doctordata.specialization.length; i++){
            
            if(i == 0){
              specialization = doctordata.specialization[i].specialization;
            }
            else{
              specialization = specialization + "," + doctordata.specialization[i].specialization;
            }
     }
     console.log(specialization)
     let template = pug.compile(source);
     let data = {
      doctorname : doctordata.dr_name,
      doctorsepecilization: specialization,
      doctorsignature: doctordata.signature,
       patientname : "",
    //   patientage: patientdata.Age,
    //   dotorsignature: doctordata.signature,
    //   KMSnumber : doctordata.KMS_registration,
    //   patientage:patientdata.age,
    //   patientgender:patientdata.Gender,
    //   patientheight: patientdata.Height,
    //   patientweight:patientdata.Weight,
    //   Problem_info:meditationdata.Problem_info,
    //   passed_Medications:meditationdata.passed_Medications,
      Prescription_data:Prescription_data,
       doctor_commeents:doctor_commeents
     }
     let html = template(data);
     //console.log("html data" , html);
     //console.log(data)
     //console.log("What is the path" , __dirname)
        var options = { format: 'Letter', height: "20.5in",
  width: "18in"};
        var filepath = __dirname + '/public/' + uuidv4() + '.pdf' ;
        console.log("beffore PDF TRm",filepath);
        var filepart = filepath.slice(52,110);
        console.log("filepart_1",filepath)
        var Finalpath = BaseUrl +'/api/public/' + filepart;
        console.log("Finalpath",Finalpath)
         return new Promise(async function (resolve, reject) {
                 await pdf.create(html, options).toFile(filepath, function(err, response) {
                    if (err){
                        console.log("error",err)
                        reject( false);
                    }
                    resolve(Finalpath);
                });
            });
         return Finalpath;
        //var html = pug.compileFile(layout, { pretty: true })(locals);
      }
      catch(e){
        console.log("error in catch", e)
       return false;
      }
}
