import { Product } from "../models/ProductSchema.js";
import fs from "fs";

export const productsController = async (req, res, next) => {
  try {
    const { name, price, description, colors, size } = req.body;

    let base64image = null;

    if (req.file) {
      let image = fs.readFileSync(req.file.path);
      base64image = image.toString("base64");
    }

    const product = await Product.create({
      name,
      price,
      description,
      colors,
      size,
      image: base64image,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `"something went Wrong",${error.message}`,
    });
  }
};
