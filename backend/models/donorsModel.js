import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const DonorsSchema = new mongoose.Schema(
  {
    name:{type:String},
  },
  { collection: "Donors", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
DonorsSchema.plugin(mongoosePaginate);

const DonorsModel = mongoose.model('Donors', DonorsSchema);

export default DonorsModel;
