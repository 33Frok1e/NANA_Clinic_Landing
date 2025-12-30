
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import femaleBot from '/images/bot_female_image.jpg';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to NANA Clinic. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false); // Hide tooltip when chat opens
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(newUserMessage.text);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return "Hi there! I'm here to help with any questions about our clinic services.";
    }
    if (lowerText.includes('appointment') || lowerText.includes('book')) {
      return "You can book an appointment by clicking the 'Book Appointment' button on our homepage or by calling our reception.";
    }
    if (lowerText.includes('price') || lowerText.includes('cost')) {
      return "Our pricing varies depending on the service. Please visit our services page or contact us directly for a detailed quote.";
    }
    if (lowerText.includes('location') || lowerText.includes('address') || lowerText.includes('where')) {
      return "We are located at 1st floor, Kathagola Rd, Near UCO Bank ATM, Mangalabag, Cuttack, Odisha,753001.";
    }
    if (lowerText.includes('service')) {
      return "We offer a wide range of services including hearing tests, hearing aid fittings, and consultations.";
    }
    
    return "I'm not sure specifically about that, but our team would be happy to help! Please call us directly on +91 7205454269.";
  };

  return (
    <>
      {!isOpen && showTooltip && (
        <div className="fixed bottom-24 right-4 z-50 animate-fade-in sm:right-6">
          <div className="relative rounded-xl bg-white p-3 shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
              👋 May I help you?
            </p>
            {/* Arrow/Triangle */}
            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800"></div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 overflow-hidden",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-clinic-primary hover:bg-clinic-accent"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <img src={femaleBot} className='h-full w-full object-cover' alt="Female Bot Image" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl bg-white shadow-2xl animate-fade-in border border-gray-100 flex flex-col h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-clinic-primary p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 overflow-hidden">
              {/* <Bot className="h-6 w-6 text-white" /> */}
              <img src={femaleBot} className='h-full w-full object-cover' alt="Female Bot Image" />
            </div>
            <div>
              <h3 className="font-semibold text-white">NANA Assistant</h3>
              <p className="text-xs text-white/80">Always here to help</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-max max-w-[80%] flex-col gap-1 rounded-2xl px-4 py-2 text-sm",
                  msg.sender === 'user'
                    ? "ml-auto bg-clinic-primary text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm"
                )}
              >
                <span>{msg.text}</span>
                <span className={cn(
                  "text-[10px]",
                  msg.sender === 'user' ? "text-white/70" : "text-gray-400"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex w-max max-w-[80%] items-center gap-1 rounded-2xl bg-white px-4 py-3 border border-gray-100 shadow-sm rounded-bl-none">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-clinic-primary focus:outline-none focus:ring-1 focus:ring-clinic-primary"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-clinic-primary text-white transition-colors hover:bg-clinic-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
