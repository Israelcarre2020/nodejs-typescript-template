import { Op } from "sequelize";
import Product from "./product.model.js";
import User from "../users/user.model.js";
import { HTTP_STATUS } from "../../shared/constants/index.js";
import { CreateProductData, ProductFilters, AppError } from "../../shared/types/index.js";

type ProductInstance = InstanceType<typeof Product>;

/**
 * Create a new product
 */
export const createProduct = async (
  productData: CreateProductData,
  userId: string
): Promise<ProductInstance> => {
  const { name, description, price, stock } = productData;

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    userId,
  });

  return product;
};

/**
 * Get all products with optional filters
 */
export const getAllProducts = async (filters: ProductFilters = {}): Promise<ProductInstance[]> => {
  const { userId, minPrice, maxPrice } = filters;
  const where: Record<string, unknown> = {};

  if (userId) {
    where.userId = userId;
  }

  if (minPrice || maxPrice) {
    const priceCondition: Record<string | symbol, unknown> = {};
    if (minPrice) {
      priceCondition[Op.gte] = minPrice;
    }
    if (maxPrice) {
      priceCondition[Op.lte] = maxPrice;
    }
    where.price = priceCondition;
  }

  const products = await Product.findAll({
    where,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return products;
};

/**
 * Get product by ID
 */
export const getProductById = async (productId: string): Promise<ProductInstance> => {
  const product = await Product.findByPk(productId, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    ],
  });

  if (!product) {
    const error: AppError = new Error("Product not found");
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return product;
};

/**
 * Update product
 */
export const updateProduct = async (
  productId: string,
  productData: Partial<CreateProductData>,
  userId: string
): Promise<ProductInstance> => {
  const product = await Product.findByPk(productId);

  if (!product) {
    const error: AppError = new Error("Product not found");
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  // Check if user owns the product
  if (product.userId !== userId) {
    const error: AppError = new Error("Not authorized to update this product");
    error.statusCode = HTTP_STATUS.FORBIDDEN;
    throw error;
  }

  await product.update(productData);
  return product;
};

/**
 * Delete product
 */
export const deleteProduct = async (
  productId: string,
  userId: string
): Promise<{ message: string }> => {
  const product = await Product.findByPk(productId);

  if (!product) {
    const error: AppError = new Error("Product not found");
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  // Check if user owns the product
  if (product.userId !== userId) {
    const error: AppError = new Error("Not authorized to delete this product");
    error.statusCode = HTTP_STATUS.FORBIDDEN;
    throw error;
  }

  await product.destroy();
  return { message: "Product deleted successfully" };
};
