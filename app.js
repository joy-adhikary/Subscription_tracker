import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("SubsHub is live");
});

app.listen(4000, () => {
    console.log("server running");
});

export default app;
