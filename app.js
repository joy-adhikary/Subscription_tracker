import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";
import connectToDB from "./database/mongodb.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import subscriptionRoute from "./routes/subscription.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(errorMiddleware);
app.use(express.urlencoded({ extended: false })); // process the from data send from the client in a simple html form format 
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/subscriptions', subscriptionRoute);

app.get("/status", (res) => {
    res.send("SubsHub is up and running");
});

// DB & Port connections
app.listen(PORT, async () => {
    console.log("server running on port " + PORT);
    // Connect to the MongoDB
   await connectToDB();
});

export default app;
