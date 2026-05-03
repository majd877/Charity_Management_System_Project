import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const representativeSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: { type: String },
    about: { type: String },
    salary: { type: String },
    image:{type:String}
  },
  { collection: "representatives" }
);

// Add pagination plugin to the schema
representativeSchema.plugin(mongoosePaginate);

const RepresentativeModel = mongoose.model('Representative', representativeSchema);

export default RepresentativeModel;
