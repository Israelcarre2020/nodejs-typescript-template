import { Response, NextFunction } from "express";
import * as productService from "./product.service.js";
import { HTTP_STATUS } from "../../shared/constants/index.js";
import { AuthenticatedRequest, ApiResponse, ProductFilters } from "../../shared/types/index.js";
import Product from "./product.model.js";

type ProductInstance = InstanceType<typeof Product>;

/**
 * Create a new product
 * POST /api/products
 */
export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<ProductInstance>>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body, req.user!.id);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products
 * GET /api/products
 */
export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<ProductInstance[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const filters: ProductFilters = {
      userId: req.query.userId as string | undefined,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
    };

    const products = await productService.getAllProducts(filters);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get product by ID
 * GET /api/products/:id
 */
export const getProductById = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<ProductInstance>>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product
 * PUT /api/products/:id
 */
export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<ProductInstance>>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      req.user!.id
    );
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 * DELETE /api/products/:id
 */
export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<{ message: string }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await productService.deleteProduct(req.params.id, req.user!.id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
