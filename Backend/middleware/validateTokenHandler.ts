import type { NextFunction, Request, Response } from "express";
import type { ObjectId } from "mongoose";
export interface user{
    id:ObjectId,
    username: string,
    email: string,
    expiresIn: string
}

interface JwtPaylod{
    user: user,
}

export interface CustomRequest extends Request {
    user: user,
}

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req:CustomRequest,res:Response, next:NextFunction)=>{
    let token:string;
    let authHeader = req.headers.Authorization || req.headers.authorization;    
    if(authHeader && (typeof(authHeader)==="string") && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err:Error,decoded:JwtPaylod)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
                
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
});

module.exports = validateToken;