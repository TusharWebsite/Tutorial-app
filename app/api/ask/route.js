export async function POST(req) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY; // Hugging Face API key
    if (!apiKey) {
      return Response.json({ error: "Missing API key" }, { status: 500 });
    }

    // Function to fetch AI response with timeout
    async function fetchAIResponse(prompt) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 sec timeout

      try {
        const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt, options: { use_cache: false } }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          console.error(`API Error: ${response.status} - ${response.statusText}`);
          return `API error: ${response.status}`;
        }

        const data = await response.json();
        return data[0]?.generated_text || "I couldn't generate a response.";
      } catch (error) {
        console.error("Fetch failed:", error);
        return error.name === "AbortError" ? "API request timed out." : "Failed to fetch AI response.";
      }
    }

    // Fetch explanation response
    const explanation = await fetchAIResponse(`Explain: ${message}`);

    // Fetch exercise based on the explanation
    const exercisePrompt = `Now, create a simple beginner-level Python exercise related to this topic.`;
    const exercise = await fetchAIResponse(exercisePrompt);

    return Response.json({ reply: explanation, exercise }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ error: "Failed to process request" }, { status: 500 });
  }
}
