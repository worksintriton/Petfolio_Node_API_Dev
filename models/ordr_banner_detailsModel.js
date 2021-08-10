var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_banner_detailsSchema = new mongoose.Schema({  
  vendor_id:  String,
  title : String,
  link : String,
  Image_path : String,
  Date_of_create : String,
  Status : Boolean,
});
ordr_banner_detailsSchema.plugin(timestamps);
mongoose.model('ordr_banner_details', ordr_banner_detailsSchema);
module.exports = mongoose.model('ordr_banner_details');
