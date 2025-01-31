export async function POST(req) {
  try {
    const { message, character } = await req.json();
    
    if (!message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY; // Hugging Face API key

    // Function to fetch AI response
    async function fetchAIResponse(prompt) {
      const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          options: { use_cache: false }
        }),
      });

      const data = await response.json();
      return data[0]?.generated_text || "I couldn't generate a response.";
    }

    // Fetch explanation response
    const explanation = await fetchAIResponse(`Explain: ${message}`);

    // Fetch exercise based on the explanation
    const exercisePrompt = `Now, create a simple beginner-level Python exercise related to this topic.`;
    const exercise = await fetchAIResponse(exercisePrompt);

    return Response.json({ reply: explanation, exercise }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch AI response" }, { status: 500 });
  }
}
