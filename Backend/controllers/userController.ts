import type { Request, Response } from "express";
import type { CustomRequest } from "../middleware/validateTokenHandler";


const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered.");
  }

  //Hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login the user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });

  //Compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ "token":accessToken });
  }else{
    res.status(401);
    throw new Error("Password or email are not valid");
    
  }

  res.json({ message: "Login the user" });
});

//@desc Login the user
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
