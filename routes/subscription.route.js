import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { getAllSubscriptions, getAllSubscriptionsByUser, createSubscription, getSubscription, updateSubscriptions, deleteSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRoute = Router();


subscriptionRoute.get('/all-subs/:id', authMiddleware, getAllSubscriptionsByUser);

subscriptionRoute.get('/', authMiddleware, getAllSubscriptions)

subscriptionRoute.get('/:id', authMiddleware, getSubscription);

subscriptionRoute.post('/subscribe', authMiddleware, createSubscription);

subscriptionRoute.put('/:id', authMiddleware, updateSubscriptions);

subscriptionRoute.put('/:id/cancle', (req, res) => {
    res.send({
        message: 'cancle subscription by id route',
    })
})

subscriptionRoute.delete('/:id', authMiddleware, deleteSubscriptions);

export default subscriptionRoute;
