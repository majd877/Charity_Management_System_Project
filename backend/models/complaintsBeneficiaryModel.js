import mongoose from "mongoose";

const ComplaintsSchema = new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    note:{type:String},
    user:{type:Object},
    status:{type:Boolean},
},{collection : "complaintsBeneficiary", strict: false,timestamps:true})

const ComplaintsBeneficiaryModel = mongoose.model('complaintsBeneficiarySchema', ComplaintsSchema)

export default ComplaintsBeneficiaryModel;