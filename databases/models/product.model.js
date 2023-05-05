import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    description : {
        type : String,
        lowercase : true,
        required : true
    },
    price : {
        type : Number,
        required : true,
        default :0
    },
    photo :{
        data : Buffer,
        contentType :String,
    },
    shipping : {
        type : Boolean,
        default : false,
    },
    quantity : {
        type : Number,
        required : true,
        default : 0
    },
    category:{
        type : mongoose.Types.ObjectId,
        ref : 'category',
        required : [true , 'category id is required']
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref : 'user',
        required : [true , 'created user id is required']
    }
   
}, { timestamps: true, })


export const productModel = mongoose.model('product', productSchema)