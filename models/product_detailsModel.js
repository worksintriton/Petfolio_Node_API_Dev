var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var product_detailsSchema = new mongoose.Schema({ 
  user_id :  String,
  cat_id : {
        type: Schema.Types.ObjectId, 
        ref: 'product_categ',
    },
  sub_cat_id : {
        type: Schema.Types.ObjectId, 
        ref: 'product_sub_cate',
    },
  breed_type :[{
          type: Schema.Types.ObjectId, 
          ref: 'breedtype',
      }],
  pet_type : [{
          type: Schema.Types.ObjectId, 
          ref: 'pettype',
      }],
  age : Array,
  cost : Number,
  threshould : String,
  product_name : String,
  product_discription : String,
  product_img : Array,
  product_name : String,
  discount : Number,
  related : String,
  count : Number,
  status : String,
  verification_status : String,
  date_and_time : String,
  mobile_type : String,
  delete_status : Boolean
});
product_detailsSchema.plugin(timestamps);
mongoose.model('product_details', product_detailsSchema);
module.exports = mongoose.model('product_details');
