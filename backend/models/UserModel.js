import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String, },
    image : {type : String},
    email : {type : String, required : true,unique: true },
    password : {type : String},
    status:{type:Boolean,required:true},
    source : {type: String},
    is_admin:{type:String, default: undefined},
    permission:{type:[String]},
    user_type:{type:String,required:true},
},{collection : "users"})

const UserModel = mongoose.model('UserSchema', userSchema)

export default UserModel;