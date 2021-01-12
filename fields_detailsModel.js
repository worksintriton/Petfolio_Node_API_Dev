var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var fields_detailSchema = new mongoose.Schema({  
  fields :  String,
  addedby : String
});
fields_detailSchema.plugin(timestamps);
mongoose.model('fields_detail', fields_detailSchema);
module.exports = mongoose.model('fields_detail');