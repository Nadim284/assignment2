import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  db_url: process.env.db_url as string,
  port: process.env.port || 5000,
  jwt_secret: process.env.jwt_secret as string,
  access_token_expiry: process.env.access_token_expiry as string,
  refresh_token_secret: process.env.refresh_token_secret as string,
  refresh_token_expiry: process.env.refresh_token_expiry as string,
};

export default config;
