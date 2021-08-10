var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var cart_detailSchema = new mongoose.Schema({  
  user_id :  String,
  product_id : {  
       type: Schema.Types.ObjectId,
       ref: 'product_details',
      },
  product_count : Number,
});
cart_detailSchema.plugin(timestamps);
mongoose.model('cart_detail', cart_detailSchema);
module.exports = mongoose.model('cart_detail');