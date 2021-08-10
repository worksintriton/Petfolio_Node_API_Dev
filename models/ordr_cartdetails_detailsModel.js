var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_cart_detailsSchema = new mongoose.Schema({  
  Customer_id : String,
  vendor_id : String,
  Total_price : Number,
  Item_id : {
          type: Schema.Types.ObjectId,
          ref: 'ordr_productitem_details'
      },
  catagories_id : {
          type: Schema.Types.ObjectId,
          ref: 'ordr_catagories_details'
      },
  additional_info : String,
  Delivery : Number,
  quantity : Number,
  Tax : Number
});
ordr_cart_detailsSchema.plugin(timestamps);
mongoose.model('ordr_cart_details', ordr_cart_detailsSchema);
module.exports = mongoose.model('ordr_cart_details');


