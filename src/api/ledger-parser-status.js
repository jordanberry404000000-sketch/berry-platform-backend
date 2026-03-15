// Ledger Parser — Status API Endpoint (v1.0)

import { LedgerParser } from '../subsystems/ledger-parser/index.js';

export default async function handler(req, res) {
  try {
    // Get the full subsystem status payload
    const payload = LedgerParser.getStatusPayload();

    res.status(200).json(payload);
  } catch (err) {
    console.error("Status endpoint error:", err);

    res.status(500).json({
      subsystem: "Ledger Parser",
      status: "offline",
      error: true,
      message: "Failed to retrieve subsystem status"
    });
  }
}
