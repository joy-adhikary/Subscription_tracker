import express from "express";

// Envs
import { PORT } from "./config/env.js";

// Routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

const app = express();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

app.get("/status", (req, res) => {
    res.send("SubsHub is live");
});

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});

export default app;
