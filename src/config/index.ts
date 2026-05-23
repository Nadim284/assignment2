import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  db_url: process.env.db_url as string,
  port: process.env.port || 5000,
};

export default config;
