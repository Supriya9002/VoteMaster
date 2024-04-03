import express from "express";
import UserController from "./user.controller.js"
import jwtAuth from "./../../middleware/jwt.middleware.js"

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/register", (req, res)=>{
    //console.log("Supriya2");
    userController.register(req, res);
})
userRouter.post("/login", (req, res)=>{
    userController.login(req, res);
});
userRouter.get("/profile",jwtAuth, (req, res)=>{
    userController.profile(req, res);
});
userRouter.put("/profile/password/:adharCardNumber", (req, res)=>{
    userController.updatePassword(req, res);
});

export default userRouter;