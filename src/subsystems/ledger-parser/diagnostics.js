// Ledger Parser — Diagnostics State (v1.0)

// Supported networks for v1.0 (BTC only)
let supported_networks = ["btc"];

// Count of parsed ledgers in the last 24 hours
let parsed_ledger_count_24h = 0;

// Last successfully parsed block height
let last_parsed_height = null;

// Increment the 24h counter
export function incrementParsedCount() {
  parsed_ledger_count_24h += 1;
}

// Update the last parsed height
export function updateLastParsedHeight(height) {
  last_parsed_height = height;
}

// Reset the 24h counter (you can call this via a daily cron later)
export function reset24hCounter() {
  parsed_ledger_count_24h = 0;
}

// Get the full diagnostics object
export function getDiagnostics() {
  return {
    supported_networks,
    parsed_ledger_count_24h,
    last_parsed_height
  };
}
