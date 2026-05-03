import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const eventSchema = new mongoose.Schema(
  {
    name:{type:String},
  },
  { collection: "event", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
eventSchema.plugin(mongoosePaginate);

const EventModel = mongoose.model('event', eventSchema);

export default EventModel;
