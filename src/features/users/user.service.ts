import User from "./user.model.js";
import jwt, { SignOptions } from "jsonwebtoken";
import { HTTP_STATUS } from "../../shared/constants/index.js";
import { CreateUserData, UserResponse, LoginResponse, AppError } from "../../shared/types/index.js";

/**
 * Create a new user
 */
export const createUser = async (userData: CreateUserData): Promise<UserResponse> => {
  const { email, password, name } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error: AppError = new Error("User with this email already exists");
    error.statusCode = HTTP_STATUS.CONFLICT;
    throw error;
  }

  const user = await User.create({ email, password, name });
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
};

/**
 * Authenticate user and generate JWT token
 */
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error: AppError = new Error("Invalid credentials");
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error: AppError = new Error("Invalid credentials");
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    } as SignOptions
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<UserResponse> => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    const error: AppError = new Error("User not found");
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
};

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<UserResponse[]> => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    order: [["createdAt", "DESC"]],
  });

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  }));
};
