import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// verify token to confirm that it wasnt created by another party
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["authToken"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    req.userId = (decodedToken as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

export default verifyToken;
