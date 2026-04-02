import type { Request, Response } from "express";

export function root(_req: Request, res: Response): void {
  res.json({ success: true, module: "user" });
}
