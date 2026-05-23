import express from "express";
import { IssuesController } from "./issues.controller";

const IssueRoute = express.Router();

IssueRoute.post("/issues", IssuesController.createIssue);

IssueRoute.get("/issues", IssuesController.getIssues);

IssueRoute.get("/issues/:id", IssuesController.getSingleIssue);

IssueRoute.patch("/issues/:id", IssuesController.updateIssue);

IssueRoute.delete("/issues/:id", IssuesController.deleteIssue);


export default IssueRoute;
