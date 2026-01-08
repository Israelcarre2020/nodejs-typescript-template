import { Request, Response, NextFunction } from "express";
import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import { logger } from "../utils/logger.js";
import { HTTP_STATUS } from "../constants/index.js";
import { AppError } from "../types/index.js";

/**
 * Global error handler middleware
 * Handles all errors and returns consistent error responses
 */
export const errorHandler = (
  err: AppError | ValidationError | UniqueConstraintError | ForeignKeyConstraintError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error("Error:", err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    const validationError = err as ValidationError;
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation error",
      errors: validationError.errors.map((e) => ({
        field: e.path || "unknown",
        message: e.message,
      })),
    });
    return;
  }

  // Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    const uniqueError = err as UniqueConstraintError;
    res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: "Duplicate entry",
      errors: uniqueError.errors.map((e) => ({
        field: e.path || "unknown",
        message: `${e.path || "field"} already exists`,
      })),
    });
    return;
  }

  // Sequelize foreign key constraint errors
  if (err.name === "SequelizeForeignKeyConstraintError") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Foreign key constraint violation",
      error: err.message,
    });
    return;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Token expired",
    });
    return;
  }

  // Custom application errors
  const statusCode = (err as AppError).statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" ? "Internal server error" : message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
