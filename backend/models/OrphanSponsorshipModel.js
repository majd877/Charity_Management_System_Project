import mongoose from "mongoose";

const OrphanSponsorshipsSchema = new mongoose.Schema({
    image:{type:String},
    name:{type:String},
    title:{type:String},
    description:{type:String},
    price:{type:String},
    user_id:{type:String,default:""},
    status:{type:Boolean},
},{collection : "OrphanSponsorships", strict: false,timestamps:true})

const OrphanSponsorshipModel = mongoose.model('OrphanSponsorshipsSchema', OrphanSponsorshipsSchema)

export default OrphanSponsorshipModel;