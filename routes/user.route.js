import { Router } from "express";

const userRoute = Router();

userRoute.get("/profile", (req, res) => {
  res.send({
    message: "Profile route",
  });
});

userRoute.post("/user", (req, res) => {
  res.send({
    message: "Update profile route",
  });
});

userRoute.get('/allusers', (req, res)=> {
    res.send({
        message: 'All users route',
    })
})

userRoute.get('/:id', (req,res)=> {
    res.send({
        message: 'Get user by id route',
    })
})

userRoute.delete('/:id', (req, res) => {
    res.send({
        message: 'Delete user by id route',
    })
})

export default userRoute;