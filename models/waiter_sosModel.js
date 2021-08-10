var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_sosSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  sos : Array,
  date_of_create : String,
  
});
waiter_sosSchema.plugin(timestamps);
mongoose.model('waiter_sos', waiter_sosSchema);
module.exports = mongoose.model('waiter_sos');
