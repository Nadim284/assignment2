import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";
import cookies from "cookie-parser";

const createUser = async (req: Request, res: Response) => {
  // Handle user registration logic here

    try {
    // Simulate user registration logic (e.g., save user to database)
        
        const userData = req.body;

        const result = await AuthService.registerUser(userData);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully",
            data: result,
        });
    } 
    catch (error) {
        console.error("Error registering user:", error);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal server error",
        });
    }

    res.send("User registered successfully!");
};

const loginUser = async (req: Request, res: Response) => {
  // Handle user login logic here

    try{
    
        const result = await AuthService.loginUser(req.body);

        const {refreshToken} = result;

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        if (!result) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    }
    catch(error){
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const refreshToken = async (req: Request, res: Response) => {
    
    try{
    
        const result = await AuthService.generateRefreshToken(req.cookies.refreshToken);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Refresh token generated successfully",
            data: result,
        });
    }
    catch(error){
        console.error("Error generating refresh token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const AuthController = {
    createUser,
    loginUser,
    refreshToken,
};

