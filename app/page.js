"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [character, setCharacter] = useState("Robot");
  const [loading, setLoading] = useState(false); // Loader state
  const characters = ["Robot", "Wizard", "Cat", "Alien"];

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true); // Show loader
    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");

    try {
      const response = await axios.post("/api/ask", { message, character });

      // Homework Exercise
      const homework = `Now, try this exercise: Write a Python function that takes a number and returns whether it's even or odd.`;

      setChat([
        ...newChat,
        { sender: "AI", text: response.data.reply, homework },
      ]);
    } catch (error) {
      setChat([
        ...newChat,
        { sender: "AI", text: "Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex items-center gap-5 min-h-screen bg-blue-100 dark:bg-blue-900 p-4 mt-[-30]">
      <div className="flex flex-col justify-center items-center ml-[150px]">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
          AI Python Tutor for Kids
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Choose your AI tutor character:
        </p>
        <div className="flex gap-4 mb-4">
          {characters.map((char) => (
            <button
              key={char}
              className={`px-4 py-2 rounded-lg ${
                character === char
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-400 dark:bg-gray-800 dark:text-white"
              }`}
              onClick={() => setCharacter(char)}
            >
              {char}
            </button>
          ))}
        </div>

        {/* Chat Box */}
        <div className="bg-white p-4 w-96 h-64 overflow-y-auto border rounded-lg mb-4 dark:bg-gray-800 dark:border-gray-600">
          {chat.map((c, i) => (
            <div key={i} className="mb-2">
              <p
                className={
                  c.sender === "user"
                    ? "text-right text-blue-500 dark:text-blue-400"
                    : "text-left text-gray-700 dark:text-gray-300"
                }
              >
                <strong>{c.sender === "user" ? "You" : character}:</strong>{" "}
                {c.text}
              </p>
              {c.homework && (
                <p className="text-left text-red-500 dark:text-red-400 mt-1">
                  <strong>Homework:</strong> {c.homework}
                </p>
              )}
            </div>
          ))}

          {/* Loader - Show only when loading */}
          {loading && (
            <div className="flex justify-center mt-2">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Input & Send Button */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a Python question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border border-gray-400 rounded-lg w-80 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={loading} // Disable input while loading
          />
          <button
            onClick={sendMessage}
            className={`px-4 py-2 rounded-lg ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } text-white dark:bg-blue-700`}
            disabled={loading} // Disable button while loading
          >
            Send
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full mt-8 lg:mt-0 lg:w-1/2 flex ml-[150px]">
        <div className="relative">
          <img
            src="https://www.spec-india.com/wp-content/uploads/2022/11/Banner-Python-Developer.png"
            alt="Illustration"
            className="w-full h-auto max-w-lg mx-auto drop-shadow-xl"
          />
          <div className="absolute top-[-60] right-0 p-3 bg-white rounded-full shadow-lg dark:bg-gray-800">
            <span className="text-sm font-semibold text-blue-600">
              #Trending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
