import React, { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import "./App.css";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import RagDemoPage from "./pages/RagDemoPage.jsx";

function App() {
  
  const [activeTab, setActiveTab] = useState("chatbot");

  
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaRobot className="icon" />
          <span>Chatbot</span>
        </div>
        <nav className="nav">
          <button
            onClick={() => setActiveTab("chatbot")}
            style={{
              backgroundColor:
                activeTab === "chatbot" ? "#2a2a2a" : "transparent",
              color: activeTab === "chatbot" ? "#fff" : "#aaa",
            }}
          >
            💬 Chatbot
          </button>
          <button
            onClick={() => setActiveTab("rag")}
            style={{
              backgroundColor: activeTab === "rag" ? "#2a2a2a" : "transparent",
              color: activeTab === "rag" ? "#fff" : "#aaa",
            }}
          >
            📘 RAG Demo
          </button>
        </nav>
      </aside>

      {/* Chat area */}
      {activeTab === "chatbot" ? <ChatbotPage /> : <RagDemoPage />}
    </div>
  );
}

export default App;
