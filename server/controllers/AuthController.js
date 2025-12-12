import { AuthModel } from "../models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignIn = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }

    const ismatch = await AuthModel.findOne({ email });

    if (ismatch) {
      return res.status(400).json({
        message: "User Already Matched could you Login Please ",
      });
    }
    const HasedPassword = await bcrypt.hash(password, 10);

    const newUserCreated = await AuthModel.create({
      name,
      email,
      password: HasedPassword,
    });

    return res.status(201).json({
      message: "User Created SuccessFully",
      newUserCreated,
    });
  } catch (error) {
    console.log("Fialed User Creation", error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter name and Password",
    });
  }

  const MatchedUser = await AuthModel.findOne({ email });

  if (!MatchedUser) {
    return res.status(404).json({
      message: "User not Found ",
    });
  }

  const valid = await bcrypt.compare(password, MatchedUser.password);

  if (!valid) {
    return res.status(400).json({
      message: "Invalid username or password ",
    });
  }

  const token = jwt.sign({ userId: MatchedUser._id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login Successfully",
    token,
  });
};

export const testingAuth = async (req, res, next) => {
  try {
    res.send("authenticated User ");
  } catch (error) {
    console.log("non authorized", error);
  }
};
