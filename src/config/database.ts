import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  url: string | undefined;
  dialect: "postgres";
  logging: boolean | typeof console.log;
  dialectOptions: {
    ssl?: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

interface Config {
  development: DatabaseConfig;
  production: DatabaseConfig;
}

const config: Config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : undefined,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
