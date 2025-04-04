import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            const error = new Error("Opps, User Not Found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordMatched) {
            const error = new Error("Opps, Invalid Password");
            error.statusCode = 401;
            throw error;
        }
        
        const token = jwt.sign({ userId: isUserExist._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({
            success: true,
            message: "User login successfully",
            data: {
                user: isUserExist,
                token,
            }
        })
    } catch (error) {
        next(error);
    }
}

export const SignUp = async (req, res, next) => {
    //  Start atomic transaction ( db te update korar agei sob check kore nibo jate pore issue nah hoi)
    const transaction = await mongoose.startSession();
    transaction.startTransaction();

    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("Opps, User already exists");
            error.statusCode = 409;
            throw error;
        }

        const solt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, solt);

        const newUsers = await User.create([{ email, password: hashedPassword, name, role }], { session: transaction });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await transaction.commitTransaction();
        transaction.endSession();

        res.status(201).json({
            sucess: true,
            message: "User created successfully",
            data: {
                user: newUsers[0],
                token,
                expiresIn: JWT_EXPIRES_IN,
            }
        });
    } catch (error) {
        await transaction.abortTransaction();
        transaction.endSession();

        return next(error);
    }
}

export const SignOut = async (req, res, next) => {
    try {
        console.log("Forgot Password");
    } catch (error) {
        next(error);
    }
}

export const ForgotPassword = async (req, res, next) => {
    try {
        console.log("Forgot Password");
    } catch (error) {
        next(error);
    }
}

export const ResetPassword = async (req, res, next) => {
    try {
        console.log("Forgot Password");
    } catch (error) {
        next(error);
    }
}
