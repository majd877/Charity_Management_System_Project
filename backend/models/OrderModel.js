import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    image:{type:String},
    name:{type:String},
    title:{type:String},
    description:{type:String},
    price:{type:String},
    status:{type:Boolean},
},{collection : "orders", strict: false,timestamps:true})

const OrderModel = mongoose.model('OrdersSchema', OrdersSchema)

export default OrderModel;