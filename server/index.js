import express from "express";
import dotenv from "dotenv";
import { Database } from "./config/Database.js";
import Router from "./routes/productRout.js";
import cors from "cors";
dotenv.config();

export const app = express();
Database();

app.use(cors());

app.use("/api/", Router);
app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT} 👍`);
});
