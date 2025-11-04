// Load modules (CommonJS)
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

dotenv.config(); // load .env variables

const app = express();
const token = process.env.RLChatbot;
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o";

// Serve static files from assets folder
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json()); // to parse JSON request bodies

const client = ModelClient(endpoint, new AzureKeyCredential(token));

// API endpoint for chat
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body.message;

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: userInput }],
        model: model
      }
    });

    if (isUnexpected(response)) {
      return res.status(500).json({ error: response.body });
    }

    const reply = response.body.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(1000, () => {
  console.log("Server running on http://localhost:1000");
});