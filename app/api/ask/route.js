export async function POST(req) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Missing API key" }, { status: 500 });
    }

    // Function to fetch AI response with reduced timeout
    async function fetchAIResponse(prompt) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // Reduced to 5 sec timeout

      try {
        const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            inputs: prompt,
            options: { 
              use_cache: true, // Enable caching
              wait_for_model: false, // Don't wait if model is loading
              max_length: 100 // Limit response length
            }
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeout);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data[0]?.generated_text || "I couldn't generate a response.";
      } catch (error) {
        console.error("Fetch failed:", error);
        return error.name === "AbortError" ? 
          "Request timed out." : 
          "Failed to generate response.";
      } finally {
        clearTimeout(timeout);
      }
    }

    // Make both API calls in parallel instead of sequential
    const [explanation, exercise] = await Promise.all([
      fetchAIResponse(`Explain: ${message}`),
      fetchAIResponse("Create a simple beginner-level Python exercise.")
    ]);

    return Response.json({ reply: explanation, exercise }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ 
      error: "Failed to process request", 
      details: error.message 
    }, { status: 500 });
  }
}
