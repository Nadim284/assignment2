import type { Response } from "express";

type TResponseData<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    user?: any;
    error?: any;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        user: data.user,
        error: data.error,
    });
};

export default sendResponse;
