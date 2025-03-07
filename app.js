import express from "express";

// Envs
import { PORT } from "./config/env.js";

// Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import subscriptionRoute from "./routes/subscription.route.js";
import connectToDB from "./database/mongodb.js";

const app = express();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/subscriptions', subscriptionRoute);

app.get("/status", (req, res) => {
    res.send("SubsHub is live");
});

app.listen(PORT, async () => {
    console.log("server running on port " + PORT);
    // Connect to the MongoDB
   await connectToDB();
});

export default app;
