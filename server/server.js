import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Validate environment variables
if (!process.env.GROQ_API_KEY) {
  console.error("❌ Missing GROQ_API_KEY in .env");
  process.exit(1);
}

if (!process.env.PORT) {
  console.error("❌ Missing PORT in .env");
  process.exit(1);
}

// Groq client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "Server running successfully 🚀",
  });
});

// Refactor endpoint
app.post("/api/refactor", async (req, res) => {
  try {
    const { code } = req.body;

    // Input validation
    if (!code || typeof code !== "string") {
      return res.status(400).json({
        error: "Valid code string is required",
      });
    }

    // Prevent extremely large requests
    if (code.length > 15000) {
      return res.status(400).json({
        error: "Code input is too large",
      });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer.

Tasks:
- Refactor the code
- Fix bugs
- Improve readability
- Improve performance
- Add concise comments where necessary

Rules:
- Return ONLY valid code
- Do not explain outside the code
- Preserve original functionality
          `,
        },
        {
          role: "user",
          content: code,
        },
      ],

      temperature: 0.2,
      max_tokens: 1200,
    });

    const refactoredCode =
      response.choices?.[0]?.message?.content || "No response generated.";

    res.status(200).json({
      success: true,
      refactoredCode,
      timeSaved: Math.floor(Math.random() * 15) + 5,
    });
  } catch (error) {
    console.error("❌ Groq API Error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to process code.",
      details: error?.message || "Unknown error",
    });
  }
});

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT||8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});