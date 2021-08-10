var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_order_detailSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  order_id : String,
  table_no : String,
  taken_by : String,
  taken_id : String,
  order_date_book : String,
  item_detail : Array,
  order_date_complete : String,
  chef_id : String,
  order_status : String,
  remarks : String,
  order_cast : Number,
  chef_status : String,
  waiter_status : String,
});
waiter_order_detailSchema.plugin(timestamps);
mongoose.model('waiter_order_detail', waiter_order_detailSchema);
module.exports = mongoose.model('waiter_order_detail');
