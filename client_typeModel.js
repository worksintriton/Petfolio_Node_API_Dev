var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var client_typeSchema = new mongoose.Schema({  
  client_type:  String,
  addedby : String
});
client_typeSchema.plugin(timestamps);
mongoose.model('client_type', client_typeSchema);
module.exports = mongoose.model('client_type');