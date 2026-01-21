import { Router } from "express";
const router = Router();

router.get("/wallets", (req, res) => {
  res.json([
    { address: "0x123...", label: "Founder Wallet" },
    { address: "0xABC...", label: "Recovery Vault" }
  ]);
});

export default router;