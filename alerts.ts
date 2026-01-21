import { Router } from "express";

const router = Router();

// Example static alerts (replace with DB later)
const alerts = [
  { id: 1, title: "High CPU Usage", severity: "high", source: "Infrastructure" },
  { id: 2, title: "Unauthorized Login Attempt", severity: "medium", source: "Security" }
];

// GET /api/alerts
router.get("/", (req, res) => {
  res.json(alerts);
});

// GET /api/alerts/:id
router.get("/:id", (req, res) => {
  const alert = alerts.find(a => a.id === Number(req.params.id));
  if (!alert) return res.status(404).json({ message: "Alert not found" });
  res.json(alert);
});

export default router;