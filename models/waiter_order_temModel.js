var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_order_temSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  category_id : {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_categorydetail',
      },
  item_id : String,
  waiter_id : String,
  item_name : String,
  table_no : String,
  item_price : Number,
  item_count : Number,
  item_status : String,
  date_of_create : String,
});
waiter_order_temSchema.plugin(timestamps);
mongoose.model('waiter_order_tem', waiter_order_temSchema);
module.exports = mongoose.model('waiter_order_tem');
