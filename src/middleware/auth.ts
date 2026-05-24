import { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("Auth middleware executed");
    // console.log(req.headers.authorization); // Debugging log

    const token = req.headers.authorization;

    if (!token) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as jwt.JwtPayload;

    const userdata = await pool.query("SELECT * FROM users WHERE email = $1", [
      decoded.email,
    ]);

    const user = userdata.rows[0];
    console.log("Authenticated user:", user); // Debugging log

    if (!user) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    next();
  };
};

export default auth;
