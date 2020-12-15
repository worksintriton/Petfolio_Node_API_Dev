var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

var DemoscreenSchema = new mongoose.Schema({  
  img_path:  String,
  img_title : String,
  img_describ : String,
  img_index : Number,
  show_status : Boolean,
  date_and_time : String,
    delete_status : Boolean,
      delete_status : Boolean,
});
mongoose.model('Demoscreen', DemoscreenSchema);

module.exports = mongoose.model('Demoscreen');