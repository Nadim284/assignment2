import { pool } from "../../db/index";
import { IUser } from "./auth.interface";

const registerUser = async (payload: IUser) => {
  // Simulate user registration logic (e.g., save user to database)
  // You can replace this with actual database logic
  console.log("Registering user:", payload);
  const { name, email, password, role } = payload;

  const result = await pool.query(
    `INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *`,
    [name, email, password, role],
  );
  return result;
};

const loginUser = async (payload: { email: string; password: string }) => {
  // Simulate user login logic (e.g., check credentials against database)
  // You can replace this with actual authentication logic
  const { email, password } = payload;

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1 AND password=$2
    `,
    [email, password],
  );

  return userData.rows[0];
};

export const AuthService = {
  registerUser,
  loginUser,
};
