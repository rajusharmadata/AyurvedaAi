import OpenAI from "openai";

export const getRemedyForMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Validate NVIDIA key
    if (!process.env.NVIDIA_API_KEY) {
      return res.status(500).json({
        message: "NVIDIA API key not configured",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const completion = await openai.chat.completions.create({
      model:
        process.env.NVIDIA_MODEL ||
        "meta/llama-3.1-8b-instruct",
      temperature: 0.7,
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content:
            
          "You are a helpful medical assistant that provides accurate and concise medical advice based on user queries. Always prioritize user safety and recommend consulting a healthcare professional for serious concerns. Provide information in a clear and empathetic manner. If you are unsure about a medical condition, suggest seeing a doctor rather than guessing. Never provide harmful or dangerous advice.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return res.json({
      type: "ai_response",
      provider: "nvidia",
      content: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("❌ NVIDIA Controller Error:", error);
    return res.status(500).json({
      message: "Failed to generate response from NVIDIA model",
    });
  }
};
