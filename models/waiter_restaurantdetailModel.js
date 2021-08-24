var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var waiter_restaurantSchema = new mongoose.Schema({   
  
  res_name: String,
  log_id: String,
  res_contact_no : Number,
  res_google_link : String,
  res_open_time : String,
  res_close_time : String,
  res_address : String,
  res_person_name : String,
  res_person_contact : Number,
  res_date_of_exp : String,
  res_status : String,
  password : String,
  create_by : String,
  waiter_count : Number,
  chef_count : Number,
  user_count : Number,
  fb_token : String,

});
waiter_restaurantSchema.plugin(timestamps);
mongoose.model('waiter_restaurant', waiter_restaurantSchema);
module.exports = mongoose.model('waiter_restaurant');