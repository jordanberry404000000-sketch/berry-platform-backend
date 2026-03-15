// Ledger Parser — Subsystem Interface (v1.0)

import { runHeartbeat, getStatusPayload } from './heartbeat.js';

// Export the public API for this subsystem
export const LedgerParser = {
  runHeartbeat,
  getStatusPayload
};
