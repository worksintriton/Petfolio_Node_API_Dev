var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_table_detailsSchema = new mongoose.Schema({  
  vendor_id:  String,
  table_name : String,
  table_link : String,
  Date_of_create : String,
  Status : Boolean,
});
ordr_table_detailsSchema.plugin(timestamps);
mongoose.model('ordr_table_details', ordr_table_detailsSchema);
module.exports = mongoose.model('ordr_table_details');
