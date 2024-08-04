"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFactory = void 0;
const sequelize_1 = require("sequelize");
// class representing the Product model
class Product extends sequelize_1.Model {
    id;
    name;
    category;
    quantity;
}
//  initializes and returns the Category model
const ProductFactory = (sequelize) => {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false
        },
        category: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        }
    }, {
        tableName: 'products',
        // tableName:'shopping_list',
        sequelize,
    });
    return Product;
};
exports.ProductFactory = ProductFactory;
//# sourceMappingURL=product.js.map