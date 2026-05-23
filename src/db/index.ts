import { Pool } from "pg";
import config from "../config/index";

export const pool = new Pool({
  connectionString: config.db_url,
});

export const initDB = async () => {
  try {
    await pool.query(`

            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'contributor',

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )



        `);

    await pool.query(`

            CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                type VARCHAR(20) NOT NULL,  
                status VARCHAR(20) NOT NULL DEFAULT 'open',
                
                reporter_id INTEGER REFERENCES users(id),
                
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )

    `);

    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
