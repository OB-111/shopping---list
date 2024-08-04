"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/products', productRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default); // Mount categoryRoutes under /api/categories
models_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connected');
    return models_1.sequelize.sync();
})
    .then(() => {
    console.log('Database synchronized');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = app;
//# sourceMappingURL=app.js.map