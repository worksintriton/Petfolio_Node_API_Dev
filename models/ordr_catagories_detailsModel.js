var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_catagories_detailsSchema = new mongoose.Schema({  
  vendor_id:  String,
  cat_title : String,
  cat_descri : String,
  cat_image_path : String,
  cat_show_status : Boolean,
  cat_time_service : Array,
  cat_time_end : String,
  cat_time_start : String,
  cat_day_setting : Array,
  cat_day_type : String
});
ordr_catagories_detailsSchema.plugin(timestamps);
mongoose.model('ordr_catagories_details', ordr_catagories_detailsSchema);
module.exports = mongoose.model('ordr_catagories_details');
