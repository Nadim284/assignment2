import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const updateIssue = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string,
    ) as jwt.JwtPayload;

    const userdata = await pool.query(
      "SELECT * FROM users WHERE role = $1 ",
      [decoded.role],
    );

    const userRole = userdata.rows[0].role;
    const userId = userdata.rows[0].id;

    const reqBody = req.body;


    console.log("User Role:", userRole); // Debugging log
    console.log("User ID:", userId); // Debugging log
    console.log("Issue ID:", reqBody.reporter_id); // Debugging log

    if (userRole === "contributor" && reqBody.reporter_id !== userId) {

      return res.status(403).json({
        success: false,
        message:
          "Sorry, you are a contributor and don't have permission to update this issue.",
      });
    }

    if(userRole === "contributor" && reqBody.status !== "open"){
       // Debugging log
       return res.status(403).json({
        success: false,
        message:
          "Sorry, you can only update an open issue.",
      });
    }
    
    next();
  };
};

export default updateIssue;
