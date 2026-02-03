import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import updateMetadataRoute from "./routes/updateMetadata.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, status: "Berry backend alive" });
});

app.use("/api", updateMetadataRoute);

app.listen(PORT, () => {
  console.log(`Berry backend running on port ${PORT}`);
});