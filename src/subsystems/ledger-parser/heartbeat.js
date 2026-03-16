// src/subsystems/ledger-parser/heartbeat.js

import fetch from 'node-fetch';
import crypto from 'crypto';

// -------------------------------
// Subsystem State
// -------------------------------
let heartbeat_count = 0;
let startTime = Date.now();
let lastError = null;
let lastBlockTime = null;

let parsed_ledger_count_24h = 0;
let last_parsed_height = null;
let api_latency_ms = 0;

// -------------------------------
// Helper: Fetch latest BTC block height
// -------------------------------
async function fetchBlockHeight() {
  const res = await fetch('https://blockstream.info/api/blocks/tip/height');
  if (!res.ok) throw new Error(`Blockstream API error: ${res.status}`);
  const height = await res.text();
  return { height: parseInt(height, 10) };
}

// -------------------------------
// Helper: Generate integrity fingerprint
// -------------------------------
function generateFingerprint(payload) {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex');

  return `sha256:${hash}`;
}

// -------------------------------
// Main Heartbeat Function
// -------------------------------
export async function runLedgerParserHeartbeat() {
  heartbeat_count++;

  const start = Date.now();

  try {
    const blockData = await fetchBlockHeight();
    api_latency_ms = Date.now() - start;

    last_parsed_height = blockData.height;
    parsed_ledger_count_24h += 1;
    lastBlockTime = Date.now();
    lastError = null;

  } catch (err) {
    api_latency_ms = Date.now() - start;
    lastError = err.message;
  }

  const diagnostics = {
    supported_networks: ["btc"],
    parsed_ledger_count_24h,
    last_parsed_height,

    api_latency_ms,
    last_error: lastError || null,
    heartbeat_count,
    uptime_seconds: Math.floor((Date.now() - startTime) / 1000),

    block_delay_seconds: lastBlockTime
      ? Math.floor((Date.now() - lastBlockTime) / 1000)
      : null
  };

  const payload = {
    subsystem: "Ledger Parser",
    status: lastError ? "degraded" : (last_parsed_height ? "operational" : "initializing"),
    last_update_utc: new Date().toISOString(),
    diagnostics
  };

  payload.integrity_fingerprint = generateFingerprint(payload);

  return payload;
}
