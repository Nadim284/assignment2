import express from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import deleteIssue from "../../middleware/delete_issue";
import updateIssue from "../../middleware/update_issue";

const IssueRoute = express.Router();

IssueRoute.post("/issues", auth(), IssuesController.createIssue);

IssueRoute.get("/issues", IssuesController.getIssues);

IssueRoute.get("/issues/:id", IssuesController.getSingleIssue);

IssueRoute.patch(
  "/issues/:id",
  auth(),
  updateIssue(),
  IssuesController.updateIssue,
);

IssueRoute.delete(
  "/issues/:id",
  auth(),
  deleteIssue(),
  IssuesController.deleteIssue,
);

export default IssueRoute;
