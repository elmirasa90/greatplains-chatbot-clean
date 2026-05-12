import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const knowledge = JSON.parse(
  fs.readFileSync("./knowledge.json", "utf-8")
);

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    const context = knowledge.map(item => item.content).join("\n");

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful chatbot for Great Plains Manufacturing."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${userMessage}`
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "Something went wrong."
    });

  }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});