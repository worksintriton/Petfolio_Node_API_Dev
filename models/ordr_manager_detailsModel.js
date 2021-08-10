var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_manager_detailsSchema = new mongoose.Schema({  
  res_id:  String,
  manager_name : String,
  manager_phone : String,
  manager_email : String,
  manager_password : String,
  Date_of_register : String
});
ordr_manager_detailsSchema.plugin(timestamps);
mongoose.model('ordr_manager_details', ordr_manager_detailsSchema);
module.exports = mongoose.model('ordr_manager_details');
