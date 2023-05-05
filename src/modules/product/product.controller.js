import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js";
import slugify from "slugify";
import fs from 'fs'
import { productModel } from "../../../databases/models/product.model.js";
import { categoryModel } from "../../../databases/models/category.model.js";

export const createProduct = catchAsyncHandler(async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.fields;
        const { photo } = req.files;
        const user = req.user;
        switch (true) {
            case !name:
                return res.status(400).send({ message: 'Name is required' })
            case !description:
                return res.status(400).send({ message: 'discription is required' })
            case !price:
                return res.status(400).send({ message: 'price is required' })
            case !quantity:
                return res.status(400).send({ message: 'quantity is required' })
            case !category:
                return res.status(400).send({ message: 'category id is required' })
            case !photo && photo.size > 1000000:
                return res.status(400).send({ message: 'photo is required and should be less than 1mb' })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name), createdBy: user._id })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product Added Successfully',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in Create product',
            error
        })
    }
})

export const getProducts = catchAsyncHandler(async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        if (!products) {
            return res.status(404).send({
                success: true,
                message: 'Empty result',
                error
            })
        }
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All products',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in getting product',
            error
        })
    }
})

export const getSingleProduct = catchAsyncHandler(async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category')
        if (!product) {
            return res.status(404).send({
                success: true,
                message: 'Empty result',
                error
            })
        }
        res.status(200).send({
            success: true,
            message: 'All products',
            product
        })
        console.log(product);

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in getting product',
            error
        })
    }
})

export const deleteProductById = catchAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        // const checkId = await productModel.findOne({id}).select("-photo");
        // console.log(checkId);
        // if (!checkId) {
        //     return res.status(404).send({
        //         success: true,
        //         message: 'Empty result',
        //         error
        //     })
        // }
        const product = await productModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Delete product successfully',
            name: product.name
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in getting product',
            error
        })
    }
})


export const productPhoto = catchAsyncHandler(async (req, res) => {
    try {
        const checkId = await productModel.findById(req.params.pid);
        if (!checkId) {
            return res.status(404).send({
                success: true,
                message: 'Empty result',
                error
            })
        }
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in getting photo product',
            error
        })
    }
})


export const updateProduct = catchAsyncHandler(async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.fields;
        const { photo } = req.files;
        const user = req.user;
        switch (true) {
            case !name:
                return res.status(400).send({ message: 'Name is required' })
            case !description:
                return res.status(400).send({ message: 'discription is required' })
            case !price:
                return res.status(400).send({ message: 'price is required' })
            case !quantity:
                return res.status(400).send({ message: 'quantity is required' })
            case !category:
                return res.status(400).send({ message: 'category id is required' })
            // case !photo && photo.size > 1000000:
            //     return res.status(400).send({ message: 'photo is required and should be less than 1mb' })
        }

        const checkNameIsExist = await productModel.findOne({ name });
        if (checkNameIsExist && checkNameIsExist._id.toString() !== req.params.pid) {
            return res.status(404).send({
                success: true,
                message: 'Product name is already regsiterd',
                checkNameIsExist
            })
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name), createdBy: user._id }, { new: true }).select("-photo")
        console.log(product);
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'Product updated Successfully',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in updating product',
            error
        })
    }
})


export const filterProduct = catchAsyncHandler(async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}

        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        console.log(args);
        const filterProducts = await productModel.find(args)
        console.log(filterProduct);
        res.status(200).send({
            success: true,
            message: "Filterd products successfully",
            filterProducts
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " Error while filtering products"
        })

    }
})

export const countProduct = catchAsyncHandler(async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: "Count products successfully",
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " Error while count product"
        })
    }
})


export const productList = catchAsyncHandler(async (req, res) => {
    try {
        const perPage = 4
        const page  = req.params.page ? req.params.page : 1;
        const products = await productModel.find({})
            .select("-photo").skip((page-1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "get page of products successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " Error while productList page control"
        })
    }
})


export const searchProduct = catchAsyncHandler(async (req, res) => {
    try {
        const { keyword } = req.params
        console.log(keyword);
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }).select("-photo")
        res.status(200).send({
            success: true,
            message: "get search rsult of products successfully",
            results
        })
        console.log(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " Error while search product"
        })
    }
})

export const realtedProduct = catchAsyncHandler( async( req, res ) => {
    try {
        const { pid , cid } = req.params
        const products = await productModel.find({category : cid , _id :{$ne : pid}  }).select("-photo").limit(3).populate('category')
        if (!products) {
            return res.status(404).send({
                success: true,
                message: 'Empty result',
                error
            })
        }
        res.status(200).send({
            success: true,
            message: 'All products',
            products
        })
        console.log(products);

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in getting product',
            error
        })
    }
} ) 


export const productCategory = catchAsyncHandler( async ( req ,res ) =>  {
    try {
        const category = await categoryModel.findOne({slug : req.params.slug})
        const products = await productModel.find({ category  }).populate("category")
        res.status(200).send({
            success : true,
            message : " get data succesffilly",
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: faild,
            message: 'Error in getting product',
            error
        })
    }
} )