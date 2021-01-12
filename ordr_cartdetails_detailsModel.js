var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_order_detailsSchema = new mongoose.Schema({  
  Customer_id:  String,
  vendor_id : String,
  Single_price : String,
  Item_id : String,
  catagories_id : Boolean,
  additional_info : Array,
  Delivery : String,
  Tax : String,
});
ordr_order_detailsSchema.plugin(timestamps);
mongoose.model('ordr_order_details', ordr_order_detailsSchema);
module.exports = mongoose.model('ordr_order_details');
