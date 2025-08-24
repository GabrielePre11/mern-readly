import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    userRole: "user" | "admin";
  };
}

export const verifyUserRole = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRole = (req as any).userRole;
    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
