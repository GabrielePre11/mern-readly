import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateTokenAndSetCookie = (
  res: Response,
  userId: Types.ObjectId,
  userRole: "user" | "admin"
) => {
  if (!process.env.JWT_SECRET || !process.env.NODE_ENV) {
    throw new Error(
      "JWT_SECRET or NODE_ENV is not defined in environment variables"
    );
  }
  const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // It prevents XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // It prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // It will expire in 7 days
  });

  return token;
};
