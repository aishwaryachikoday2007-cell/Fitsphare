'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Dumbbell, Utensils, Zap, Minimize2 } from 'lucide-react';

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your **FitSphere AI Fitness & Nutrition Assistant**. Ask me about gym equipment setups, vegetarian protein sources, workout splits, or supplement comparisons!"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'How do I use the Lat Pulldown machine?',
    'High-protein Indian vegetarian diet plan',
    'Whey Isolate vs Whey Concentrate difference',
    'Best Push-Pull-Legs workout schedule'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Sorry, I couldn't reach the server. Please try asking again in a moment."
          }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Network connection issue. Please verify your connection and try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-black font-extrabold shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-200 group"
          title="Open FitSphere AI Fitness Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-lime-300 animate-ping" />
          </div>
          <span className="text-xs font-black tracking-wide">AI Fitness Coach</span>
          <Sparkles className="w-3.5 h-3.5 text-zinc-950 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                  FitSphere AI Assistant
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-zinc-400">Trained on sports science & biomechanics</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-zinc-900/60 border-b border-zinc-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 border border-zinc-700/60 transition-colors flex items-center gap-1"
              >
                {idx === 0 && <Dumbbell className="w-2.5 h-2.5 text-emerald-400" />}
                {idx === 1 && <Utensils className="w-2.5 h-2.5 text-emerald-400" />}
                {idx === 2 && <Zap className="w-2.5 h-2.5 text-emerald-400" />}
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((m, index) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-600/20'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs font-normal">
                      {m.content}
                    </div>
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs text-zinc-400 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-100" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-200" />
                  <span className="text-[11px] text-zinc-400">Analyzing biomechanics & nutrition...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about exercises, Indian diet, or equipment..."
                className="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 text-[9px] text-zinc-400 text-center">
              FitSphere AI provides educational fitness & nutrition insights, not medical advice.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
