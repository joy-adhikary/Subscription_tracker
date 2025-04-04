import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get("/profile", (req, res) => {
  res.send({
    message: "Profile route",
  });
});

// caile multiple middlewares add kora jabe. Just aktar por akta middleware comma diye add kore dite hobe.
// middlewares er next() ta porer middleware ke pass kore dibe jodi sob ok thake. 

userRoute.post('/:id', authMiddleware, updateUser);

userRoute.get('/allusers', getAllUsers);

userRoute.get('/:id', authMiddleware, getUser);

userRoute.delete('/:id', authMiddleware, deleteUser);

export default userRoute;