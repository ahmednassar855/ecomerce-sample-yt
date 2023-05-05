import express  from "express";
import { isAdmin, requireSignIn } from "../../middleware/auth.middleware.js";
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategory } from "./category.controller.js";

const categoryRouter = express.Router()

// routes required login and admin
categoryRouter.post('/create-category' , requireSignIn , isAdmin , createCategory)
categoryRouter.put('/update-category/:id' , requireSignIn , isAdmin , updateCategory)
categoryRouter.delete('/delete-category/:id', requireSignIn , isAdmin ,  deleteCategoryById)
// routes for without login
categoryRouter.get('/get-categories' ,getAllCategories)
categoryRouter.get('/single-category/:slug' ,getCategoryById)


export default categoryRouter