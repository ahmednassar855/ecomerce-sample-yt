import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'name is too short'],
        maxLength: [30, 'name is too long'],
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phone: {
        type: String,
        minLength: [3, 'company name is too short'],
        maxLength: [50, 'company name is too long'],
        require: true,
        trim: true
    },
    address: {
        type: String,
        minLength: [3, 'company name is too short'],
        maxLength: [50, 'company name is too long'],
        require: true
    },
    confirmedEmail: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    question:{
        type : String,
    },
    answer:{
        type : String,
        required : true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'],
        default: 'user',
    }
}, { timestamps: true, })


export const userModel = mongoose.model('user', userSchema)