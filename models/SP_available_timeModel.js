var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var SP_availabel_timeSchema = new mongoose.Schema({  
  user_id : String,
  Dates : Array,
  mobile_type : String,
  delete_status : Boolean,
});
SP_availabel_timeSchema.plugin(timestamps);
mongoose.model('SP_availabel_time', SP_availabel_timeSchema);
module.exports = mongoose.model('SP_availabel_time');