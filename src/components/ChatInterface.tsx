import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulating AI response
    setTimeout(() => {
      setMessages([...newMessages, { text: "I will find a service for you!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between p-4 pt-16"> {/* Added pt-16 to prevent obstruction by navbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`max-w-[75%] p-3 rounded-lg text-white ${msg.sender === "user" ? "bg-blue-400 ml-auto" : "bg-purple-400"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-3 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 outline-none border-none rounded-lg"
          placeholder="Request a service..."
        />
        <button onClick={handleSendMessage} className="ml-3 p-3 bg-blue-500 rounded-full text-white flex items-center justify-center">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
