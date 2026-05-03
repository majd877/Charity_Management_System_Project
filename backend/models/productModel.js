import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name:{type:String},
    category_id:{type:String},
  },
  { collection: "product", strict: false,timestamps:true }
);

// Add pagination plugin to the schema
productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;
