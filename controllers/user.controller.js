import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (users.length <= 0) {
            const error = new Error("Ops, No users found");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        // get user information by id without password
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            const error = new Error("Ops, User Not Found");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const error = new Error("Ops, User Not Found");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User Deleted successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body);

        if (!user) {
            const error = new Error("Ops, User Not Updated");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully"
        });
    } catch (error) {
        next(error);
    }
}
