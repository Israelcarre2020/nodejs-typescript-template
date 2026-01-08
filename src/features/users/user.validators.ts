import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../shared/constants/index.js";
import { ApiResponse } from "../../shared/types/index.js";

/**
 * Validate user registration data
 */
export const validateRegister = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  const { email, password, name } = req.body;
  const errors: Array<{ field: string; message: string }> = [];

  if (!email || typeof email !== "string" || !email.includes("@")) {
    errors.push({ field: "email", message: "Valid email is required" });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }

  if (errors.length > 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation errors",
      errors,
    });
    return;
  }

  next();
};

/**
 * Validate user login data
 */
export const validateLogin = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  const { email, password } = req.body;
  const errors: Array<{ field: string; message: string }> = [];

  if (!email || typeof email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  }

  if (!password || typeof password !== "string") {
    errors.push({ field: "password", message: "Password is required" });
  }

  if (errors.length > 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation errors",
      errors,
    });
    return;
  }

  next();
};
