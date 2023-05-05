import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique : [true , "The name must be unique"],
        trim :true,
        required :  [true , "The name is required"],
    },
    slug : {
        type : String,
        lowercase : true,
        required : true
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : [true , 'created user id is required']
    }
   
}, { timestamps: true, })


export const categoryModel = mongoose.model('category', categorySchema)