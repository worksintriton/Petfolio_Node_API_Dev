var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var waiter_billingSchema = new mongoose.Schema({   
  Bill_No : String,
  Cash_type : String,
  User_Number: String,
  User_Name: String,
  Grand_total : Number,
  Item_Details: Array,
  billing_time : String,
  rest_id : String,
});

waiter_billingSchema.plugin(timestamps);
mongoose.model('waiter_billing', waiter_billingSchema);
module.exports = mongoose.model('waiter_billing');