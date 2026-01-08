import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/sequelize.js";

interface ProductAttributes {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id" | "description" | "stock" | "createdAt" | "updatedAt"> {}

export interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes {}

const Product = sequelize.define<ProductInstance>(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 200],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
