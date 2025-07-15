const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.send("🌐 Azure Translator API is running.");
});

// ✅ Health check endpoint for Render
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  try {
    const response = await axios({
      baseURL: `https://api.cognitive.microsofttranslator.com`,
      url: `/translate?api-version=3.0&to=${to}`,
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_KEY,
        "Ocp-Apim-Subscription-Region": process.env.AZURE_REGION,
        "Content-type": "application/json",
      },
      data: [{ Text: text }],
    });

    res.json(response.data);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
