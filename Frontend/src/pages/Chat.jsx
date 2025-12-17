import { useState, useRef, useEffect } from "react";
import { AiOutlineSend, AiOutlineUser, AiOutlineRobot, AiOutlineMenu, AiOutlinePlus, AiOutlineMessage } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'; // We might need to install this, but for now I'll use simple text rendering if package missing or use a simple pre-wrap

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Namaste! 🙏 I am Ayurved AI. How can I assist you on your journey to holistic wellness today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/chat", {
        message: input,
      });

      const data = response.data;
      let replyContent = "";

      if (data.type === 'ai_response') {
         replyContent = data.content;
      } else if (Array.isArray(data) && data.length > 0) {
        replyContent = data
          .map((remedy, index) => {
            return `### 🩺 Remedy ${index + 1}\n\n**🔹 Symptoms:** ${remedy.symptoms.join(", ")}\n\n**🌿 Remedies:** ${remedy.remedy.join(", ")}\n\n**📝 Description:** ${remedy.description}`;
          })
          .join("\n\n---\n\n");
      } else {
        replyContent = "I apologize, but I couldn't find specific Ayurvedic remedies for those exact symptoms in my database. However, generally in Ayurveda, it is recommended to consult a practitioner for persistent issues.";
      }

      const botMessage = {
        id: Date.now().toString(),
        content: replyContent,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = {
        id: Date.now().toString(),
        content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-green-900 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col
      `}>
        <div className="p-4 border-b border-green-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span>🌿</span> Ayurved AI
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/70 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-4">
          <button 
            onClick={() => {
              setMessages([{
                id: Date.now().toString(),
                content: "Namaste! 🙏 I am Ayurved AI. How can I assist you on your journey to holistic wellness today?",
                sender: "bot",
                timestamp: new Date(),
              }]);
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 bg-green-800 hover:bg-green-700 rounded-lg transition-colors border border-green-700 shadow-sm"
          >
            <AiOutlinePlus className="text-lg" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          <div className="px-4 py-2 text-xs font-semibold text-green-400 uppercase tracking-wider">
            Today
          </div>
          {/* Mock History Items */}
          <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-green-800/50 text-green-100 text-sm truncate flex items-center gap-2 transition-colors">
            <AiOutlineMessage className="flex-shrink-0" />
            Ayurvedic remedies for cold
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-green-800/50 text-green-100 text-sm truncate flex items-center gap-2 transition-colors">
            <AiOutlineMessage className="flex-shrink-0" />
            Pitta dosha diet tips
          </button>
        </div>

        <div className="p-4 border-t border-green-800">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-green-100 hover:bg-green-800 rounded-lg transition-colors mb-2"
          >
            <AiOutlineUser className="text-lg" />
            <span>Home</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FiLogOut className="text-lg" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full w-full relative">
        {/* Header - Mobile Only */}
        <header className="md:hidden h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <AiOutlineMenu className="text-xl" />
          </button>
          <span className="font-semibold text-gray-700">Ayurved AI</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Avatar */}
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <AiOutlineRobot className="text-white text-sm" />
                  </div>
                )}

                {/* Message Bubble */}
                <div 
                  className={`
                    relative max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
                    ${message.sender === 'user' 
                      ? 'bg-green-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}
                  `}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-[10px] mt-1.5 opacity-70 ${message.sender === 'user' ? 'text-green-100 text-right' : 'text-gray-400'}`}>
                    {format(new Date(message.timestamp), "HH:mm")}
                  </div>
                </div>

                {/* User Avatar */}
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <AiOutlineUser className="text-gray-600 text-sm" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <AiOutlineRobot className="text-white text-sm" />
                </div>
                <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 md:pb-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative flex items-end gap-2 bg-white border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all overflow-hidden p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Describe your symptoms or ask an Ayurvedic question..."
                className="w-full max-h-32 min-h-[44px] py-2.5 px-3 bg-transparent border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400 text-sm md:text-base scrollbar-thin scrollbar-thumb-gray-300"
                rows={1}
                style={{ height: 'auto', minHeight: '44px' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`
                  p-2.5 rounded-lg mb-0.5 transition-all duration-200 flex-shrink-0
                  ${!input.trim() || isTyping 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'}
                `}
              >
                <AiOutlineSend className="text-lg" />
              </button>
            </form>
            <p className="text-xs text-center text-gray-400 mt-3">
              Ayurved AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
