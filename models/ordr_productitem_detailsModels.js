var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var ordr_productitem_detailsSchema = new mongoose.Schema({  
  catagories_id:  {
          type: Schema.Types.ObjectId,
          ref: 'ordr_catagories_details'
      },
  cart_type : String,
  item_title : String,
  item_descri : String,
  item_audio : String,
  item_image : String,
  item_nature_status : String,
  item_tag_type : String,
  item_tag_name : String,
  Prices : Number,
  item_original_price : Number,
  item_discount_type : String,
  status : Boolean,
  Order_information : String,
  cart_count : Number,
  Tax : Number,
  Delivery : Number,
  item_day_setting : Array,
  item_time_start : String,
  item_time_end : String,
  item_day_type : String,
  cart_type : String,
  Expensive : Array,
  vendor_id:  String,


  
});
ordr_productitem_detailsSchema.plugin(timestamps);
mongoose.model('ordr_productitem_details', ordr_productitem_detailsSchema);
module.exports = mongoose.model('ordr_productitem_details');
