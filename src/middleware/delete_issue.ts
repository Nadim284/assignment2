import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const deleteIssue = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string,
    ) as jwt.JwtPayload;

    const userdata = await pool.query(
      "SELECT * FROM users WHERE role = $1 AND id = $2",
      [decoded.role, decoded.id],
    );


    console.log("Authenticated user role:", userdata.rows[0].role); // Debugging log

    if (userdata.rows[0].role === "contributor") {
      return res.status(403).json({
        success: false,
        message:
          "Sorry, you are a contributor and don't have permission to delete this issue.",
      });
    }

    next();
  };
};

export default deleteIssue;
