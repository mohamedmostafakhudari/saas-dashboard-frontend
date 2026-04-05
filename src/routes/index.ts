import { Router, Request, Response } from "express";
import productRoutes from "../modules/product/routes";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, message: "API is running 🚀" });
});

router.use("/products", productRoutes);

export default router;
