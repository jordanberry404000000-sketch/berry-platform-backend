// src/api/ledger-parser-status.js

import { runLedgerParserHeartbeat } from '../../subsystems/ledger-parser/heartbeat.js';

export default async function handler(req, res) {
  try {
    const statusPayload = await runLedgerParserHeartbeat();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(statusPayload);

  } catch (err) {
    console.error('Ledger Parser API Error:', err);

    res.status(500).json({
      subsystem: "Ledger Parser",
      status: "offline",
      integrity_fingerprint: null,
      last_update_utc: new Date().toISOString(),
      diagnostics: {
        supported_networks: ["btc"],
        parsed_ledger_count_24h: 0,
        last_parsed_height: null,
        api_latency_ms: null,
        last_error: err.message,
        heartbeat_count: null,
        uptime_seconds: null,
        block_delay_seconds: null
      }
    });
  }
}
