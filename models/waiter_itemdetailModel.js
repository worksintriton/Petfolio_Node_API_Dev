var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_itemdetailSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  category_id : {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_categorydetail',
      },
  item_code : String,
  item_name : String,
  item_price : Number,
  item_status : String,
  date_of_create : String,
});
waiter_itemdetailSchema.plugin(timestamps);
mongoose.model('waiter_itemdetail', waiter_itemdetailSchema);
module.exports = mongoose.model('waiter_itemdetail');
