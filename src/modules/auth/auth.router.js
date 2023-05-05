import express from "express";
import { forgotPassword, login, register , testController, updateProfile} from "./auth.controller.js";
import { isAdmin, requireSignIn } from './../../middleware/auth.middleware.js';

// router object
const authRouter = express.Router()

// routing
authRouter.post('/register' , register)
authRouter.post('/login' , login)


authRouter.post('/forget-password' , forgotPassword)

// protected user routes
authRouter.get('/user-auth' , requireSignIn , (req , res) => {
    res.status(200).send({ ok : true })
}) 

// protected admin routes
authRouter.get('/admin-auth' , requireSignIn , isAdmin , (req , res) => {
    res.status(200).send({ ok : true })
}) 
// test route
authRouter.get('/test' ,  requireSignIn , isAdmin ,testController)


authRouter.put('/profile' , requireSignIn , updateProfile)
export default authRouter