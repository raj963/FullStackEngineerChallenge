const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('./state');
      Appraisal = require('./appraisal');

//console.log(State);
const OrderSchema = new Schema({
  product  : { type : String, required: true, trim: true },
  price    : { type : Number },
  quantity : { type : Number }
});

const appraisalSchema = new Schema({
  empId:{ type : Number, required: true, trim: true },
  passion  : { type : Number, required: true, trim: true },
  Innovation  : { type : Number, required: true, trim: true },
  respect  : { type : Number, required: true, trim: true },
  leadership  : { type : Number, required: true, trim: true },
  codeQuality  : { type : Number, required: true, trim: true },
  personalUtilizatin  : { type : Number, required: true, trim: true },
  Productivity  : { type : Number, required: true, trim: true },
  empFeedback: { type : String, required: true, trim: true }
});

const EmployeeSchema = new Schema({
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },
  email       : { type : String, required: true, trim: true },
  address     : { type : String, required: true, trim: true },
  city        : { type : String, required: true, trim: true },
  stateId     : { type : Number, required: true },
  state       : State.schema ,
  zip         : { type : Number, required: true },
  gender      : { type : String },
  orderCount  : {  type : Number },
  empFeedback: {type:String},
  orders      : [ OrderSchema ],
  OtherEmpReview:[]
  
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employee');


