var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var userdetailsSchema = new mongoose.Schema({ 

  first_name:  String,
  last_name : String,
  user_email : String,
  user_phone : String,
  date_of_reg : String,
  otp : Number,
  user_type : Number

});

mongoose.model('userdetails', userdetailsSchema);
module.exports = mongoose.model('userdetails');
