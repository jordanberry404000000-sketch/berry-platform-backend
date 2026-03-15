// Ledger Parser — Integrity Fingerprint Generator (v1.0)

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Path to a deterministic file used for fingerprinting
// You can replace this with config.json or a build manifest later
const CONFIG_PATH = path.join(process.cwd(), 'package.json');

export function generateFingerprint() {
  try {
    // Read the file contents
    const fileData = fs.readFileSync(CONFIG_PATH, 'utf8');

    // Create SHA-256 hash
    const hash = crypto
      .createHash('sha256')
      .update(fileData)
      .digest('hex');

    return `sha256:${hash}`;
  } catch (err) {
    console.error('Fingerprint generation error:', err);

    // Fallback fingerprint (still deterministic)
    return 'sha256:fingerprint_error';
  }
}
