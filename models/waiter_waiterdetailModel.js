var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_detailSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  waiter_name : String,
  waiter_number : Number,
  waiter_emailid: String,
  waiter_address : String,
  waiter_emergency_no : Number,
  waiter_status : String,
  date_of_create : String,
});
waiter_detailSchema.plugin(timestamps);
mongoose.model('waiter_detail', waiter_detailSchema);
module.exports = mongoose.model('waiter_detail');
