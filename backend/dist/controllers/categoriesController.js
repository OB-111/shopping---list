"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const models_1 = require("../models");
const getCategories = async (req, res) => {
  try {
    const categories = await models_1.Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
exports.getCategories = getCategories;
//# sourceMappingURL=categoriesController.js.map
