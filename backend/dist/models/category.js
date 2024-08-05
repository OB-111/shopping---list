"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryFactory = void 0;
const sequelize_1 = require("sequelize");
// class representing the Category model
class Category extends sequelize_1.Model {
  id;
  name;
}
//  initializes and returns the Category model
const CategoryFactory = (sequelize) => {
  Category.init(
    {
      id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      sequelize,
    },
  );
  return Category;
};
exports.CategoryFactory = CategoryFactory;
exports.default = Category; // Export as default
//# sourceMappingURL=category.js.map
