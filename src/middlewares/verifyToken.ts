import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  _id?: string;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token ;

  console.log('Received Token:', token); 

  if (!token) {
    return res.status(401).send({ message: `Token: ${token}...No token provided. Access denied.` });
  }
  jwt.verify(
    token,
    process.env.JWT_KEY!,
    (err: JsonWebTokenError | null, data: any) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(401).send({ message: `Token: ${token}...Invalid token. Access denied.` });
      }

      req._id = data._id;
      next();
    }
  );
};