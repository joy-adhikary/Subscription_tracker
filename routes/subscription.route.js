import { Router } from "express";

const subscriptionRoute = Router();

subscriptionRoute.get('/', (req, res) => {
    res.send({
        message: 'get all subscription route',
    })
})

subscriptionRoute.get('/:id', (req,res)=> {
    res.send({
        message: 'get subscription by id route',
    })
})

subscriptionRoute.post('/subscribe', (req, res) => {
    res.send({
        message: 'subscribe route',
    })
})

subscriptionRoute.put('/:id', (req,res)=> {
    res.send({
        message: 'update subscription by id route',
    })
})

subscriptionRoute.put('/:id/cancle', (req,res)=> {
    res.send({
        message: 'cancle subscription by id route',
    })
})


subscriptionRoute.delete('/:id', (req, res) => {
    res.send({
        message: 'update subscription route',
    })
})

export default subscriptionRoute;
