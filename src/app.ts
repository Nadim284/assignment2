import express, { Application, Request, Response } from "express";
import config from "./config";
import { initDB } from "./db/index";
import AuthRoute from "./modules/auth/auth.route";
import IssueRoute from "./modules/issues/issues.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routes

app.use("/api/auth", AuthRoute);

app.use("/api/", IssueRoute);


export default app;
