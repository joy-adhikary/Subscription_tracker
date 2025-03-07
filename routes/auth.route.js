import { Router } from "express";

const authRoute = Router();

authRoute.post("/sign-up", (req, res) => {
  res.send({
    message: "Sign up route",
  });
});


authRoute.post("/sign-in", (req, res) => {
  res.send({
    message: "Sign in route",
  });
});

authRoute.post('/sign-out', (req, res) => {
    res.send({
      message: 'Sign out route',
    });
});

export default authRoute;