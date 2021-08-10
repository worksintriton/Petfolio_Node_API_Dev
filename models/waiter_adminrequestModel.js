var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_adminreqSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  waiter_id : String,
  waiter_name : String,
  chef_id : String,
  chef_name : String,
  type : String,
  title : String,
  request_text : String,
  request_date : String,
  response_text : String,
  response_date : String,
  date_of_create : String,  
});
waiter_adminreqSchema.plugin(timestamps);
mongoose.model('waiter_adminreq', waiter_adminreqSchema);
module.exports = mongoose.model('waiter_adminreq');
