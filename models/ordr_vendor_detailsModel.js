var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_vendor_detailsSchema = new mongoose.Schema({  
  shop_logo:  String,
  shop_doc : String,
  vendor_doc : String,
  vendor_name : String,
  shop_name : String,
  shop_link_name : String,
  vendor_email : String,
  vendor_password : String,
  vendor_phone : String,
  status : String,
  map_link : String,
  lat : String,
  long : String,
  address : String,
  shop_number : String,
  shop_opening_time : Array,

});
ordr_vendor_detailsSchema.plugin(timestamps);
mongoose.model('ordr_vendor_details', ordr_vendor_detailsSchema);
module.exports = mongoose.model('ordr_vendor_details');
