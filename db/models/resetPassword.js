import mongoose from "mongoose";

const ResetPasswordModel = new mongoose.Schema({
    email:String,
    expireDate:Number
})

export default ResetPasswordModel