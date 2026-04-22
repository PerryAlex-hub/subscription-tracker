import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ body: 'Subscriptions' })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({ body: `Subscription with id ${req.params.id}` })
})

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', authorize, (req, res) => {
    res.send({ body: `Update Subscription with id ${req.params.id}` })
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ body: `Delete Subscription with id ${req.params.id}` })
})

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ body: `Cancel Subscription with id ${req.params.id}` })
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ body: 'Upcoming Renewals' })
})

export default subscriptionRouter;