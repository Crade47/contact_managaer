"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = yield User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered.");
    }
    //Hashed password
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = yield User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
}));
//@desc Login the user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = yield User.findOne({ email });
    //Compare password
    if (user && (yield bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Password or email are not valid");
    }
    res.json({ message: "Login the user" });
}));
//@desc Login the user
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
}));
module.exports = { registerUser, loginUser, currentUser };
