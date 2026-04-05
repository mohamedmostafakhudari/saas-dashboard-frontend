import { Router } from "express";
import protect from "../../common/middleware/auth.middleware";
import authorize from "../../common/middleware/authorize.middleware";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
} from "./product.controller";

const router = Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllProducts);
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
