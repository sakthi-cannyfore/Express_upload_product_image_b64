import express from "express";
import dotenv from "dotenv";
import { Database } from "./config/Database.js";
import Router from "./routes/productRout.js";
import Route from "./routes/AuthRoute.js";
import cors from "cors";
import cookieparser from "cookie-parser";
dotenv.config();

export const app = express();
Database();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

app.use("/api/", Router);
app.use("/api/auth/", Route);
app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT} 👍`);
});
