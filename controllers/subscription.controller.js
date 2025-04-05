import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
            userEmail: req.user.email,
        });

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Ops, Subscription Not Found");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription fetched successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        // if (!subscriptions) {
        //     const error = new Error("Ops, Subscription Not Found");
        //     error.statusCode = 500;
        //     throw error;
        // }

        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptionsByUser = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.params.id });

        // if (!subscriptions) {
        //     const error = new Error("Ops, Subscription Not Found");
        //     error.statusCode = 500;
        //     throw error;
        // }

        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
}

export const updateSubscriptions = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body);

        if (!subscription) {
            const error = new Error("Ops, Subscription Not Found");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteSubscriptions = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!subscription) {
            const error = new Error("Ops, Subscription Not Found");
            error.statusCode = 500;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
}
