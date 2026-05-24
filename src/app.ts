import express, { Application, Request, Response } from "express";
import config from "./config";
import { initDB } from "./db/index";
import AuthRoute from "./modules/auth/auth.route";
import IssueRoute from "./modules/issues/issues.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler.js";


const app: Application = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors(
  {
    origin: "http://localhost:3000"
  } 
));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// MIddleware to initialize DB connection



// Routes

app.use("/api/auth", AuthRoute);

app.use("/api/", IssueRoute);



app.use(globalErrorHandler);

export default app;
