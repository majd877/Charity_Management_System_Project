import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const DonorsUserSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: { type: String },
    about: { type: String },
    category:{type:String},
    image:{type:String}
  },
  { collection: "DonorsUser" }
);

// Add pagination plugin to the schema
DonorsUserSchema.plugin(mongoosePaginate);

const DonorsUserModel = mongoose.model('DonorsUser', DonorsUserSchema);

export default DonorsUserModel;
