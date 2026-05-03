import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema(
  {
    name:{type:String},
  },
  { collection: "category", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
categorySchema.plugin(mongoosePaginate);

const CategoryModel = mongoose.model('category', categorySchema);

export default CategoryModel;
