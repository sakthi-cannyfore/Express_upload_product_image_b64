import express from "express";
import {
  userSignIn,
  login,
  testingAuth,
} from "../controllers/AuthController.js";
import { authMiddle } from "../middlewares/authMiddleware.js";

const Route = express.Router();

Route.post("/signin", userSignIn);
Route.post("/login", login);
Route.post("/test", authMiddle, testingAuth);

Route.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({
    message: "Logout SuccessFully",
  });
});

export default Route;
