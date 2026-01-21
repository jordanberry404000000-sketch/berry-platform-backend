import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "Berry Platform backend operational",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;