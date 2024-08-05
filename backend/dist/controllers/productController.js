"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedProducts =
  exports.deleteProduct =
  exports.updateShoppingList =
  exports.addOrUpdateProducts =
    void 0;
const models_1 = require("../models");
// Add or update products
const addOrUpdateProducts = async (req, res) => {
  const products = req.body; // Ensure this is an array of products
  console.log("Received products:", products);
  try {
    for (const product of products) {
      const { name, category, quantity } = product;
      const existingProduct = await models_1.Product.findOne({
        where: { name, category },
      });
      if (existingProduct) {
        existingProduct.quantity += quantity;
        await existingProduct.save();
      } else {
        await models_1.Product.create({ name, category, quantity });
      }
    }
    res.status(201).json({ message: "Products added/updated successfully" });
  } catch (error) {
    console.error("Error saving products:", error); // Log error
    res.status(500).json({ error: "Failed to add/update products" });
  }
};
exports.addOrUpdateProducts = addOrUpdateProducts;
const updateShoppingList = async (req, res) => {
  const newProducts = req.body;
  console.log(newProducts);
  try {
    await models_1.Product.upsert(newProducts);
    res.json({ message: "Product Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
exports.updateShoppingList = updateShoppingList;
// Delete a product
const deleteProduct = async (req, res) => {
  const { name, category } = req.body;
  console.log("Deleting product:", name, category);
  try {
    const result = await models_1.Product.destroy({
      where: { name, category },
    });
    if (result) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
exports.deleteProduct = deleteProduct;
// Fetch saved products
const getSavedProducts = async (req, res) => {
  try {
    const products = await models_1.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved products" });
  }
};
exports.getSavedProducts = getSavedProducts;
//# sourceMappingURL=productController.js.map
