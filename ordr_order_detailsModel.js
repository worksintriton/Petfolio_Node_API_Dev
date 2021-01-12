var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_order_detailsSchema = new mongoose.Schema({  
  Customer_id:  String,
  Item_detals : Array,
  Payment_id : String,
  Total_amount : Number,
  booking_date : String,
  order_status : String,
  vendor_id : String,
});
ordr_order_detailsSchema.plugin(timestamps);
mongoose.model('ordr_order_details', ordr_order_detailsSchema);
module.exports = mongoose.model('ordr_order_details');
