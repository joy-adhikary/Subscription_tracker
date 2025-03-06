import { Router } from "express";

const userRoute = Router();

userRoute.get("/profile", (req, res) => {
  res.send({
    message: "Profile route",
  });
});

userRoute.post("/update-profile", (req, res) => {
  res.send({
    message: "Update profile route",
  });
});

userRoute.get('/allusers', (req, res)=> {
    res.send({
        message: 'All users route',
    })
})

export default userRoute;