# Issue Tracker Backend

A backend API for managing issues, users, and authentication. Built with Express, TypeScript, PostgreSQL, and JWT authentication.

## Live URL

Backend Live Link: [https://your-backend-url.vercel.app
](https://assignment2-brown-eight.vercel.app/)
---

# Features

- User Authentication with JWT
- Role-based authorization
- Create, update, delete, and retrieve issues
- PostgreSQL database integration
- Secure password hashing
- Middleware-based error handling
- Environment variable support
- CORS configuration


---

# Tech Stack

## Backend

- Express.js
- TypeScript

## Database
- PostgreSQL
- NeonDB 

## Authentication
- JWT (JSON Web Token)
- bcrypt

## Deployment
- Vercel 

---

# Project Structure

```bash
app/
│
├── src/
│   ├── modules/
│   │   ├── auth/
|   |      |-- auth.controller.ts
|   |      |-- auth.interface.ts
|   |      |-- auth.route.ts
|   |      |-- auth.service.ts
│   │   └── issues/
|   |      |-- issues.controller.ts
|   |      |-- issues.interface.ts
|   |      |--  issues.route.ts
|   |      |-- issues.service.ts
│   │
│   ├── middleware/
|   |     |-- auth.ts
|   |     |-- delete_issue.ts
|   |     |-- globalErrorHandler.ts
|   |     |-- update_issue.ts
│   ├── db/
|         |-- index.ts
│   ├── config/
|         |-- index.ts
│   └── utils/
|         |-- sendResponse.ts
├── server.ts
└── app.ts
