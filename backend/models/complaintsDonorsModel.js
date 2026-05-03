import mongoose from "mongoose";

const ComplaintsSchema = new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    note:{type:String},
    status:{type:Boolean},
},{collection : "complaintsDonors", strict: false,timestamps:true})

const ComplaintsDonorsModel = mongoose.model('complaintsDonorsSchema', ComplaintsSchema)

export default ComplaintsDonorsModel;