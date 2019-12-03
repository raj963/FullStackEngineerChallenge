const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
   
const AppraisalSchema = new Schema({
  empId:{ type : String, required: true, trim: true },
  passion  : { type : Number, required: true, trim: true },
  Innovation  : { type : Number, required: true, trim: true },
  respect  : { type : Number, required: true, trim: true },
  leadership  : { type : Number, required: true, trim: true },
  codeQuality  : { type : Number, required: true, trim: true },
  personalUtilizatin  : { type : Number, required: true, trim: true },
  Productivity  : { type : Number, required: true, trim: true },
  empFeedback: { type : String,  trim: true }
});
module.exports = mongoose.model('Appraisal', AppraisalSchema);

