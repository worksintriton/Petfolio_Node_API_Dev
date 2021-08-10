var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_notification_detailsSchema = new mongoose.Schema({  
  vendor_id :  String,
  user_id :  String,
  title : String,
  message : Array,
  status : String,
  view_status : String,
  date_of_register : String,
});
ordr_notification_detailsSchema.plugin(timestamps);
mongoose.model('ordr_notification_details', ordr_notification_detailsSchema);
module.exports = mongoose.model('ordr_notification_details');
