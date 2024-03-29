var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 
var waiter_notificationSchema = new mongoose.Schema({  

  rest_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'waiter_restaurant',
  },
  user_id :  String,
  notify_title : String,
  notify_descri : String,
  notify_img : String,
  notify_time : String,
  date_and_time : String,
  delete_status : Boolean,
  read_status : Boolean,

});
waiter_notificationSchema.plugin(timestamps);
mongoose.model('waiter_notification', waiter_notificationSchema);
module.exports = mongoose.model('waiter_notification');
