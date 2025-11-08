import React, { useState } from "react";
import "./rag.css";

const RagDemoPage = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file first.");
    const formData = new FormData();
    formData.append("file", file);

    await fetch("https://ai-demo-zzgy.onrender.com/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("Document uploaded successfully!");
  };

  const handleAsk = async () => {
    if (!query) return;
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);

    const response = await fetch("https://ai-demo-zzgy.onrender.com/api/askdoc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    console.log(response)

    const data = await response.json();
    const botMsg = { sender: "bot", text: data.response };
    setMessages((prev) => [...prev, botMsg]);
    setQuery("");
  };

  return (
    <div className="rag-demo-container">
      <div className="rag-content">
        <h2 className="rag-title">RAG Demo</h2>

        <div className="upload-section">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button onClick={handleUpload} className="upload-btn">
            Upload Document
          </button>
        </div>

        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-section">
            <input
              type="text"
              placeholder="Ask something about your documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="query-input"
            />
            <button onClick={handleAsk} className="ask-btn">
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RagDemoPage;
