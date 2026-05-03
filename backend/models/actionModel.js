import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const eventSchema = new mongoose.Schema(
  {
    name:{type:String},
  },
  { collection: "Action", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
eventSchema.plugin(mongoosePaginate);

const ActionModel = mongoose.model('Action', eventSchema);

export default ActionModel;
