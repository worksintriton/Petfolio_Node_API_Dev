var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_user_detailsSchema = new mongoose.Schema({  
  Customer_id:  String,
  Customer_name : String,
  Customer_email : String,
  Customer_phone : String,
  Date_of_register : String,
  Customer_browser : Array,
  Customer_urgent : String
});
ordr_user_detailsSchema.plugin(timestamps);
mongoose.model('ordr_user_details', ordr_user_detailsSchema);
module.exports = mongoose.model('ordr_user_details');
