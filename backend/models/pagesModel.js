import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema({
    image:{type:String},
    name:{type:String},
    description:{type:String},
    status:{type:Boolean},
},{collection : "pages", strict: false,timestamps:true})

const PageModel = mongoose.model('pagesSchema', pagesSchema)

export default PageModel;