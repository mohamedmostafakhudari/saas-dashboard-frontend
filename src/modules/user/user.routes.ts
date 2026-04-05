import { Router } from "express";
import protect from "../../common/middleware/auth.middleware";
import authorize from "../../common/middleware/authorize.middleware";
import {
	createUser,
	deleteUser,
	getAllUsers,
	updateUser,
} from "./user.controller";

const router = Router();

// All routes below require a valid token and admin role
router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
