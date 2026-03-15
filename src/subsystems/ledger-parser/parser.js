// Ledger Parser — Minimal BTC Parser (v1.0)

import fetch from 'node-fetch';

// Public BTC API endpoint (you can replace with your own node later)
const BTC_API = 'https://blockstream.info/api';

export async function parseLatestBlock() {
  try {
    // 1. Get latest block height
    const heightRes = await fetch(`${BTC_API}/blocks/tip/height`);
    const latestHeight = parseInt(await heightRes.text(), 10);

    // 2. Fetch block metadata
    const blockRes = await fetch(`${BTC_API}/block-height/${latestHeight}`);
    const blockHash = await blockRes.text();

    const blockDataRes = await fetch(`${BTC_API}/block/${blockHash}`);
    const blockData = await blockDataRes.json();

    // 3. Extract useful fields
    const height = latestHeight;
    const tx_count = blockData.tx_count || 0;
    const block_timestamp = new Date(blockData.timestamp * 1000).toISOString();

    // 4. Optional anomaly check
    const anomaly = {
      is_unusual_tx_count: tx_count > 5000
    };

    // 5. Return structured result
    return {
      height,
      tx_count,
      block_timestamp,
      anomaly
    };

  } catch (err) {
    console.error('Ledger Parser Error:', err);

    return {
      error: true,
      message: 'Failed to parse latest block',
      details: err.message
    };
  }
}
