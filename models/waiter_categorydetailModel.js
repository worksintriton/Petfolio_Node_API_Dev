var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_categorydetailSchema = new mongoose.Schema({  
  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
      },
  category_name : String,
  category_status : String,
  date_of_create : String,
});
waiter_categorydetailSchema.plugin(timestamps);
mongoose.model('waiter_categorydetail', waiter_categorydetailSchema);
module.exports = mongoose.model('waiter_categorydetail');
