const express = require("express");
const router = express.Router();

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ extended: true, limit: "50mb" }));
const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);
router.get(
  "/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.getAllProductsAdmin
);
router.get("/allLatest", productController.getAllProducts);
router.get("/single/:id", productController.getSingleProduct);
router.put(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);

module.exports = router;
