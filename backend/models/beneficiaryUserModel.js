import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const BeneficiaryUserSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone: { type: String },
    about: { type: String },
    category:{type:String},
    image:{type:String}
  },
  { collection: "BeneficiaryUser" }
);

// Add pagination plugin to the schema
BeneficiaryUserSchema.plugin(mongoosePaginate);

const BeneficiaryUserModel = mongoose.model('BeneficiaryUser', BeneficiaryUserSchema);

export default BeneficiaryUserModel;
