import express, { Router }  from "express";
import { isAdmin, requireSignIn } from "../../middleware/auth.middleware.js";
import { countProduct, createProduct, deleteProductById, filterProduct, getProducts, getSingleProduct, productCategory, productList, productPhoto, realtedProduct, searchProduct, updateProduct } from './product.controller.js';
import formidable from "express-formidable";

const productRouter = express.Router()

// routes login and admin
productRouter.post('/create-product' , requireSignIn , isAdmin , formidable(), createProduct)
productRouter.put('/update-product/:pid' , requireSignIn , isAdmin , formidable(), updateProduct)
productRouter.delete('/delete-product/:id' , requireSignIn , isAdmin , deleteProductById)

// routes without login
productRouter.get('/get-products' , getProducts)
productRouter.get('/get-product/:slug' , getSingleProduct)
productRouter.get('/product-photo/:pid' , productPhoto)
// product filter
productRouter.post('/product-filter'   , filterProduct)
productRouter.get('/product-count'   , countProduct)
productRouter.get('/product-list/:page'   , productList)
productRouter.get('/search/:keyword'   , searchProduct)
// similar product
productRouter.get('/related-product/:pid/:cid'   , realtedProduct)
//  get product category 
productRouter.get('/product-category/:slug'   , productCategory)



export default productRouter