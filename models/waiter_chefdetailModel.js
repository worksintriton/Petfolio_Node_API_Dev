var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var chef_detailSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  chef_name : String,
  chef_number : Number,
  chef_emailid: String,
  chef_address : String,
  chef_emergency_no : Number,
  chef_status : String,
  date_of_create : String,
  fb_token : String,
});
chef_detailSchema.plugin(timestamps);
mongoose.model('chef_detail', chef_detailSchema);
module.exports = mongoose.model('chef_detail');
