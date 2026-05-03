import mongoose from "mongoose";

const TreatmentCampaignsSchema = new mongoose.Schema({
    image:{type:String},
    title:{type:String},
    description:{type:String},
    price:{type:String},
    user_id:{type:String,default:""},
    status:{type:Boolean},
},{collection : "TreatmentCampaigns", strict: false,timestamps:true})

const TreatmentCampaignModel = mongoose.model('TreatmentCampaignsSchema', TreatmentCampaignsSchema)

export default TreatmentCampaignModel;