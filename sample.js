
import fetch from "node-fetch";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import 'dotenv/config';

const app = express();


const token = process.env.GITHUB_PAT; 
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
