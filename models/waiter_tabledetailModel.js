var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_tabledetailSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  table_no : String,
  table_desc : String,
  table_status : String,
  table_color_code : String,
  table_order_status : String,
  date_of_create : String,
  
});
waiter_tabledetailSchema.plugin(timestamps);
mongoose.model('waiter_tabledetail', waiter_tabledetailSchema);
module.exports = mongoose.model('waiter_tabledetail');
