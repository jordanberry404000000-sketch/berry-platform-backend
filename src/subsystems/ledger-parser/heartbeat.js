// Ledger Parser — Heartbeat Engine (v1.0)

import { parseLatestBlock } from './parser.js';
import {
  incrementParsedCount,
  updateLastParsedHeight,
  getDiagnostics
} from './diagnostics.js';
import { generateFingerprint } from './fingerprint.js';

// Subsystem status
let status = "initializing";

// Last update timestamp
let last_update_utc = null;

// Main heartbeat function
export async function runHeartbeat() {
  try {
    const result = await parseLatestBlock();

    if (result.error) {
      status = "degraded";
    } else {
      status = "operational";

      // Update diagnostics
      incrementParsedCount();
      updateLastParsedHeight(result.height);
    }

    // Update timestamp
    last_update_utc = new Date().toISOString();

  } catch (err) {
    console.error("Heartbeat error:", err);
    status = "offline";
    last_update_utc = new Date().toISOString();
  }
}

// Returns the full subsystem status payload
export function getStatusPayload() {
  return {
    subsystem: "Ledger Parser",
    status,
    integrity_fingerprint: generateFingerprint(),
    last_update_utc,
    diagnostics: getDiagnostics()
  };
}

// Auto-run heartbeat every 15 seconds (adjust as needed)
setInterval(runHeartbeat, 15000);

// Run immediately on startup
runHeartbeat();
