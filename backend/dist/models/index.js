"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.Product = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const category_1 = require("./category");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
            serverName: process.env.DB_SERVER_NAME
        }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false // Enable logging in development only
});
exports.sequelize = sequelize;
const Product = (0, product_1.ProductFactory)(sequelize);
exports.Product = Product;
const Category = (0, category_1.CategoryFactory)(sequelize);
exports.Category = Category;
//# sourceMappingURL=index.js.map