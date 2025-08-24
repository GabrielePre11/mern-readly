import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token was provided.",
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET or NODE_ENV is not defined in environment variables"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      userRole: "user" | "admin";
    };

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token.",
      });
    }

    (req as any).userId = decoded.userId;
    (req as any).userRole = decoded.userRole;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during token verification:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
