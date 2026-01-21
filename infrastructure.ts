import { Router } from "express";
const router = Router();

router.get("/cpu", (req, res) => {
  res.json({ usage: "87%", status: "critical" });
});

router.get("/memory", (req, res) => {
  res.json({ usage: "65%", status: "ok" });
});

export default router;