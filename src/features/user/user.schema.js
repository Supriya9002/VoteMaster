import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
        min: 18, max: 120,
    },
    mobile: {
        type: Number,
        minlength: 10, maxlength: 10,
        required: true,
    },
    email:{
        type: String,
    },
    address:{
        type: String,
        required: true,
    },
    adharCardNumber:{
        type: Number,
        required: true,
        minlength: 12, maxlength: 12,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["voter","Admin"],
        default: "voter"
    },
    isVoted:{
        type: Boolean,
        default: false,
    }
})

export default UserSchema;