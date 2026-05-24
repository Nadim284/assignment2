import { pool } from "../../db";
import { IIssues } from "./issues.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const IssuesCreate = async (payload: IIssues) => {
  // Simulate issue creation logic (e.g., save issue to database)
  const { title, description, type, reporter_id } = payload;

  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, type, reporter_id],
  );
  return result;
};

const getAllIssues = async (userData: { sort?: string }) => {
  try {
    const sortOrder = userData.sort === "newest" ? "DESC" : "ASC";

    // console.log("Sort order:", sortOrder); // Debugging log

    const result = await pool.query(`
        SELECT * FROM issues
        ORDER BY created_at ${sortOrder}
    `);
    return result;
  } catch (error) {
    console.error("Error retrieving issues:", error);
    throw new Error("Failed to retrieve issues");
  }
};

const getSingleIssue = async (issueId: string) => {
  try {
    const result = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
      issueId,
    ]);
    return result;
  } catch (error) {
    console.error("Error retrieving issue:", error);
    throw new Error("Failed to retrieve issue");
  }
};

const updateIssue = async (payload: IIssues) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `UPDATE issues SET title = $1, description = $2, type = $3 RETURNING *`,
    [title, description, type],
  );
  return result;
};

async function deleteIssue(issueId: string) {
  const result = await pool.query(
    `DELETE FROM issues WHERE id = $1 RETURNING *`,
    [issueId]
  );
  return result;
}

export const IssuesService = {
  IssuesCreate,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
