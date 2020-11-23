var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var taskcatdetailSchema = new mongoose.Schema({  
  task_title:  String,
  task_created_by : String,
  task_start_date : String,
  task_start_end : String,
  remainder_end : String,
  date_and_time : String
});
mongoose.model('taskcatdetail', taskcatdetailSchema);

module.exports = mongoose.model('taskcatdetail');