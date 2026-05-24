import { Request, Response } from "express";
import { IssuesService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";


const createIssue = async (req: Request, res: Response) => {
  // Handle issue creation logic here

  try {
    const userData = req.body;

    const result = await IssuesService.IssuesCreate(userData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const getIssues = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort;
    const result = await IssuesService.getAllIssues({ sort: sort as string });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully",
      error: result.rows,
    });
  } catch (error) {
    console.error("Error retrieving issues:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const issueId = req.params.id;
    const result = await IssuesService.getSingleIssue(issueId as string);
    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrieved successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error retrieving issue:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const issueId = req.params.id;

  const result = await IssuesService.updateIssue(req.body);

  if (result.rowCount === 0) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Issue not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Issue updated successfully",
    data: result.rows[0],
  });
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issueId = req.params.id;
    const result = await IssuesService.deleteIssue(issueId as string);

    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting issue:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const IssuesController = {
  createIssue,
  getIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
