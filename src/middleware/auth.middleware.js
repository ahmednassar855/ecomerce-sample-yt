import Jwt  from "jsonwebtoken";
import { catchAsyncHandler } from "./catchAsyncHandler.js";
import { userModel } from "../../databases/models/user.model.js";

// protected route token base
export const requireSignIn = catchAsyncHandler(async( req , res , next ) => {
    try {
        const decode = Jwt.verify(req.headers.authorization , process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success : false,
            message : "Error, No Token is provided",
            error
        })
    }
})

// admin
export const isAdmin = async( req , res , next ) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role === "admin" ){
        req.user
           next()
        }else{
            return res.status(401).send({
                success : false,
                message : "unAuthorized Access"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success : false,
            message : "Error in admin middleware",
            error
        })
    }
}