import { userModel } from "../../../databases/models/user.model.js"
import { catchAsyncHandler } from "../../middleware/catchAsyncHandler.js"
import { comparPassword, hashPassword } from './../../helpers/auth.helper.js';
import Jwt from 'jsonwebtoken'

export const register = catchAsyncHandler(async (req, res, next) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        // validation
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }
        if (!answer) {
            return res.send({ message: 'Address is Required' })
        }
        // check user 
        const existingUser = await userModel.findOne({ email })
        // exisitng user email
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "This Email is Already registerd",
            })
        }
        const hashedPassword = await hashPassword(password)
        // save user new user
        let user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()
        res.status(201).send({
            success: true,
            message: "Registerd Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })
    }
})

export const login = catchAsyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validtion
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: ' invalid email or password'
            })
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: ' Email is not Registerd!!'
            })
        }
        // compare password
        const match = await comparPassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }
        // create token
        const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: " login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                _id: user._id,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).snd({
            success: false,
            message: " error in login",
            error
        })
    }
})


export const forgotPassword = catchAsyncHandler(async (req, res, next) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'newPassword is required' })
        }

        // check user
        const user = await userModel.findOne({ email, answer })

        // validation
        if (!user) {
            return res.status(404).sned({
                success: false,
                message: 'Wrogn email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password Reset successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'somthing went wrong',
            error
        })
    }
})

export const testController = catchAsyncHandler(async (req, res, next) => {
    res.send("protected route")
})

export const updateProfile = catchAsyncHandler(async (req, res) => {
    try {
        const { name, email, password, address  , phone} = req.body;
        const user = await userModel.findById(req.user._id)

        if (password && password.length < 6) {
            return res.json({ error: "password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,
             { name : name || user.name,
               address : address ||  user.address,
               password : hashedPassword || user.password,
               phone : phone || user.phone,
                email:email || user.email }
             , { new: true })

        res.status(200).send({
            success : true,
            message : "Update profile succesfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'somthing went wrong',
            error
        })
    }
})
