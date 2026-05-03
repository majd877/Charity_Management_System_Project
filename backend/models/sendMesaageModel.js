import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const sendMesaageSchema = new mongoose.Schema(
  {
    name:{type:String},
    is_doubt:{type:Boolean,default:false},
  },
  { collection: "sendMesaage", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
sendMesaageSchema.plugin(mongoosePaginate);

const SendMesaageModel = mongoose.model('sendMesaage', sendMesaageSchema);

export default SendMesaageModel;
