import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * Extended Express Request with user information
 */
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & {
    id: string;
    email: string;
    role: string;
  };
  body: any;
  params: any;
  query: any;
}

/**
 * User creation data
 */
export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

/**
 * User response (without password)
 */
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: Date;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  token: string;
  user: UserResponse;
}

/**
 * Product creation data
 */
export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock?: number;
}

/**
 * Product filters
 */
export interface ProductFilters {
  userId?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Custom error with status code
 */
export interface AppError extends Error {
  statusCode?: number;
}
