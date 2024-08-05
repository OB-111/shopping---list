"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.post("/", productController_1.addOrUpdateProducts);
router.delete("/", productController_1.deleteProduct);
router.get("/", productController_1.getSavedProducts);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map
