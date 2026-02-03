import express from "express";
import { ethers } from "ethers";
import fetch from "node-fetch";
import fs from "fs";

const router = express.Router();

const CONTRACT_ADDRESS = process.env.BERRY_CONTRACT_ADDRESS; // set in Railway
const RPC_URL = process.env.RPC_URL;                         // Base RPC
const OWNER_PRIVATE_KEY = process.env.OWNER_PK;              // your key
const ABI = JSON.parse(
  fs.readFileSync(new URL("../../../contracts/out/BoundlessBerriesABI.json", import.meta.url))
).abi;

// placeholder pin function
async function pinToIPFS(updatedMetadata) {
  // later: call NFT.Storage / Pinata
  // for now: write to local file and pretend it's pinned
  console.log("Updated metadata:", updatedMetadata);
  return "ipfs://REPLACE_WITH_REAL_CID";
}

router.post("/updateMetadata", async (req, res) => {
  try {
    const { tokenId, progress } = req.body;

    if (!tokenId) {
      return res.status(400).json({ error: "tokenId required" });
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const currentUri = await contract.tokenURI(tokenId);
    const metaRes = await fetch(currentUri);
    const currentMeta = await metaRes.json();

    const updatedMeta = {
      ...currentMeta,
      attributes: [
        ...(currentMeta.attributes || []),
        {
          trait_type: "Progress",
          value: JSON.stringify(progress || ["lesson1"])
        }
      ]
    };

    const newUri = await pinToIPFS(updatedMeta);

    const tx = await contract.setTokenURI(tokenId, newUri);
    await tx.wait();

    return res.json({ ok: true, newUri, txHash: tx.hash });
  } catch (err) {
    console.error("updateMetadata failed:", err);
    return res.status(500).json({ error: "updateMetadata failed" });
  }
});

export default router;