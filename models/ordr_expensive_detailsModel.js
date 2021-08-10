var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_expensive_detailsSchema = new mongoose.Schema({  
  Vendor_id:  String,
  Stock_name : String,
  Stock_qtn_type : String,
  Stock_total : Number,
  Stock_Spend : Number,
  Stock_pending : Number
});
ordr_expensive_detailsSchema.plugin(timestamps);
mongoose.model('ordr_expensive_details', ordr_expensive_detailsSchema);
module.exports = mongoose.model('ordr_expensive_details');
