import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from client folder
app.use(express.static(path.join(__dirname, "client")));

// Optional: serve dashboard or cert folders
app.use("/dashboard", express.static(path.join(__dirname, "dashboard")));
app.use("/certs", express.static(path.join(__dirname, "CERT")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Berry Hub running on port ${PORT}`);
});