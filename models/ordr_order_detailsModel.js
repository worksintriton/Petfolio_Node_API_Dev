var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_order_detailsSchema = new mongoose.Schema({  
  Booking_id : Number,
  Customer_id:  {
          type: Schema.Types.ObjectId,
          ref: 'ordr_user_details'
      },
  Item_detals : Array,
  Payment_id : String,
  Total_amount : Number,
  booking_date : String,
  order_status : String,
  vendor_id : {
          type: Schema.Types.ObjectId,
          ref: 'ordr_vendor_details'
      },
  table_number : String,
});
ordr_order_detailsSchema.plugin(timestamps);
mongoose.model('ordr_order_detail', ordr_order_detailsSchema);
module.exports = mongoose.model('ordr_order_detail');
