import React, { useState } from 'react';
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import './chatbot.css';

function ChatbotPage() {

  const [messages, setMessages] = useState([
      { sender: "bot", text: "Hello! Ask me anything." },
    ]);
  const [input, setInput] = useState("");
  const handleSend = async (e) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      // Add user message to chat
      const userMsg = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
  
      try {
        const response = await fetch("https://ai-demo-zzgy.onrender.com/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });
  
        const data = await response.json();
  
        const botMsg = { sender: "bot", text: data.response };
        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error: could not reach server." },
        ]);
      }
  
      
    };
  

  return (
    // <h1>Chatbot</h1>
    <main className="chat-section">
        <header className="chat-header">
          <h1>AI Chat</h1>
          <button className="header-btn">Clear chat</button>
        </header>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
              style={{
                backgroundColor:
                  msg.sender === "bot" ? "#2a2a2a" : "#3b82f6",
                color: msg.sender === "bot" ? "#fff" : "#fff",
                alignSelf:
                  msg.sender === "bot" ? "flex-start" : "flex-end",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <footer className="chat-footer">
          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </footer>
      </main>
  );
}

export default ChatbotPage;
