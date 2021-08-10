var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_request_detailsSchema = new mongoose.Schema({  
  res_id:  String,
  manager_id : String,
  req_data : String,
  req_type : String,
  req_date : String,
  status : String,
  attachment : String,
  Date_of_approve : String,
  Date_of_register : String,
});
ordr_request_detailsSchema.plugin(timestamps);
mongoose.model('ordr_request_details', ordr_request_detailsSchema);
module.exports = mongoose.model('ordr_request_details');
