const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3003;

app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    const apiKey = "AIzaSyAkomVE4dJTITZYH6SH7E5X9jtgYYrU9OY";

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: userPrompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
    console.log(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    res.status(500).send("Error generating response");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
