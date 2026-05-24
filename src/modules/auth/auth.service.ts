import config from "../../config";
import { pool } from "../../db/index";
import { IUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";

const registerUser = async (payload: IUser) => {
  console.log("Registering user:", payload);
  const { name, email, password, role } = payload;
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *`,
    [name, email, hashPassword, role],
  );

  delete result.rows[0].password; // Remove password from the returned user object

  return result.rows[0];
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  const user = userData.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  delete user.password; // Remove password from the returned user object

  // Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_secret as string,
    {
      expiresIn: config.access_token_expiry,
    } as jwt.SignOptions,
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_secret as string,
    {
      expiresIn: config.refresh_token_expiry,
    } as jwt.SignOptions,
  );

  console.log("Generated Access Token:", accessToken); // Debugging log
  console.log("Generated Refresh Token:", refreshToken); // Debugging log

  return { accessToken, refreshToken, user };
};

// Generate new access token using refresh token

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
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
    throw new Error("User not found");
  }

  // Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.refresh_token_secret as string,
    {
      expiresIn: config.access_token_expiry,
    } as jwt.SignOptions,
  );

  return { accessToken };
};

export const AuthService = {
  registerUser,
  loginUser,
  generateRefreshToken,
};
