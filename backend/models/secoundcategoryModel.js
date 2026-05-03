import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const secoundcategorySchema = new mongoose.Schema(
  {
    name:{type:String},
  },
  { collection: "secoundcategory", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
secoundcategorySchema.plugin(mongoosePaginate);

const SecoundcategoryModel = mongoose.model('secoundcategory', secoundcategorySchema);

export default SecoundcategoryModel;
