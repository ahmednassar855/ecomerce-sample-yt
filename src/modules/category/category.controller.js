import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js";
import { categoryModel } from './../../../databases/models/category.model.js';
import slugify from "slugify";

export const createCategory =  catchAsyncHandler(async( req ,res) => {
    try {
        const { name } =req.body;
        const user  = req.user;
        if(!name){
            return res.status(401).send({
                message    :'Name is required...'  
            })
        }
        const existingCategory = await categoryModel.findOne({name})
        if (  existingCategory ){
            return res.status(401).send({
                success : true,
                message :'Category is already exist'
            })
        }
        const category = await new categoryModel({ name , slug :slugify(name)  , createdBy : user._id}).save()
        res.status(201).send({
            success : true,
            message : 'new category added',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : faild,
            message :' Error in catgeory',
            error 
        })
    }
})

export const updateCategory = catchAsyncHandler( async(req, res)=> {
    try {
        const { name } = req.body;
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id , {name , slug : slugify(name)} , { new : true })
        res.status(200).send({
            success : true,
            message : ' category udpated',
            category  
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : faild,
            message :' Error while updating catgeory',
            error 
        })
    }
} )

export const getAllCategories = catchAsyncHandler( async(req , res)=> {
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
            success : true,
            message : "Get All Categories successfully",
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : faild,
            message :' Error while getting catgeory',
            error 
        })
    }


} )

export const getCategoryById = catchAsyncHandler( async(req , res)=> {
    try {
        const category = await categoryModel.findOne({slug : req.params.slug})
        res.status(200).send({
            success : true,
            message : "Get Category id successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : faild,
            message :' Error while getting catgeory',
            error 
        })
    }
} )


export const deleteCategoryById = catchAsyncHandler( async(req , res)=> {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : "Deleted Category id successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : faild,
            message :' Error while getting catgeory',
            error 
        })
    }
} )