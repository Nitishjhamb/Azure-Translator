const axios = require("axios");

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, to } = req.body;

  if (!text || !to) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  try {
    const response = await axios({
      method: "post",
      baseURL: "https://api.cognitive.microsofttranslator.com",
      url: `/translate?api-version=3.0&to=${to}`,
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_KEY,
        "Ocp-Apim-Subscription-Region": process.env.AZURE_REGION,
        "Content-type": "application/json",
      },
      data: [{ Text: text }],
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Translation failed" });
  }
};
