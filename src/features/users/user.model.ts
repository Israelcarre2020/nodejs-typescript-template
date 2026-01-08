import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/sequelize.js";
import bcrypt from "bcrypt";
import { USER_ROLES, UserRole } from "../../shared/constants/index.js";

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role" | "createdAt" | "updatedAt"> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(USER_ROLES)),
      defaultValue: USER_ROLES.USER,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: UserInstance) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: UserInstance) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// Instance method to compare password
(User.prototype as UserInstance).comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, (this as UserInstance).password);
};

export default User;
