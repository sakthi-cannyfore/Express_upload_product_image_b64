import express from "express";
import multer from "multer";
import { productsController } from "../controllers/ProductController.js";

const upload = multer({ dest: "uploads/" });

const Router = express.Router();
Router.post("/upload-file", upload.single("image"), productsController);

export default Router;
