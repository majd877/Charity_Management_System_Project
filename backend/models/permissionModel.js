import mongoose from "mongoose";

const PermissionsSchema = new mongoose.Schema({
    name:{type:String},
    to:{type:String},
},{collection : "permissions", strict: false,timestamps:true})

const PermissionModel = mongoose.model('PermissionsSchema', PermissionsSchema)

export default PermissionModel;