var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var sp_appointmentSchema = new mongoose.Schema({  
  sp_id : {  
       type: Schema.Types.ObjectId,
       ref: 'userdetails',
      },
  appointment_UID: String,
  booking_date: String,
  booking_time: String,
  booking_date_time : String,
  // communication_type : String,
  // msg_id : String,
  // video_id : String,
  user_id : {  
       type: Schema.Types.ObjectId,
       ref: 'userdetails',
      },
  pet_id : {  
       type: Schema.Types.ObjectId,
       ref: 'petdetails',
    },

   // pet_record :
   // {  
   //     type: Schema.Types.ObjectId,
   //     ref: 'Payment',
   //    }  
   
  // problem_info : String,
  sp_attched : Array,
  appoinment_status : String,
  start_appointment_status : String,
  end_appointment_status : String,
  sp_feedback : String,
  sp_rate : String,
  user_feedback : String,
  user_rate : String,
  display_date : String,
  server_date_time : String,
  payment_id : String,
  payment_method : String,
  // prescription_details : String,
  // vaccination_details : String,
  appointment_types : String,
  allergies : String,
  amount : String,
  service_name : String,
  service_amount : String,
  completed_at : String,
  missed_at : String,
  mobile_type : String,
  sp_business_info : Array,
  delete_status : Boolean,

  
});
sp_appointmentSchema.plugin(timestamps);
mongoose.model('sp_appointment', sp_appointmentSchema);
module.exports = mongoose.model('sp_appointment');