import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  Trash2,
  ExternalLink,
  Cpu,
  CornerDownLeft
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { sendChatMessage, getStoredApiKey, getStoredModel } from '../../services/geminiService';
import { ActiveTab } from '../../context/EventContext';

export const AIChatDrawer: React.FC = () => {
  const {
    event,
    budgetItems,
    timelineItems,
    guests,
    chatMessages,
    addChatMessage,
    clearChatHistory,
    setActiveTab
  } = useEvent();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasApiKey = !!getStoredApiKey();
  const currentModel = getStoredModel();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    setInput('');
    addChatMessage({
      sender: 'user',
      content: query
    });

    setIsLoading(true);

    try {
      // Build conversation history for multi-turn context
      const history = chatMessages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: m.content }]
      }));

      const res = await sendChatMessage(query, event, budgetItems, timelineItems, guests, history);

      addChatMessage({
        sender: 'assistant',
        content: res.content,
        suggestedActions: res.suggestedActions
      });
    } catch (err) {
      console.error(err);
      addChatMessage({
        sender: 'assistant',
        content: 'I encountered an issue processing your request. Please try again or check your network connection.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Web Speech API: Voice dictation
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      handleSend(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-To-Speech for assistant responses
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#`_>-]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const samplePrompts = [
    'Audit our budget for hidden vendor fees & trade-offs',
    'Generate an emergency rain backup & contingency plan',
    'Draft a 2-minute heartwarming toast for the host',
    'Recommend signature craft cocktail & mocktail recipes',
    'How should we arrange tables to prevent server bottleneck?'
  ];

  const handleActionClick = (action: { label: string; actionType: string; payload?: any }) => {
    if (action.actionType === 'open_tab' && action.payload) {
      setActiveTab(action.payload as ActiveTab);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in">
      {/* Top Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Aura AI Co-Pilot</h2>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-indigo-400" />
                {hasApiKey ? currentModel : 'Autonomous Heuristic Engine'}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium truncate max-w-[160px] sm:max-w-xs">
                Context: {event.title}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChatHistory}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800/80 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-sm ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3.5 space-y-2 ${
                  isUser
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400 mb-1">
                  <span className="font-semibold text-slate-300">
                    {isUser ? 'You' : 'Aura AI Director'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="prose prose-invert prose-xs leading-relaxed space-y-2 whitespace-pre-line">
                  {msg.content}
                </div>

                {!isUser && (
                  <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800/60 mt-3">
                    <button
                      onClick={() => speakText(msg.content)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-purple-300 transition"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Stop voice' : 'Listen'}</span>
                    </button>

                    {msg.suggestedActions?.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/50 rounded-lg transition"
                      >
                        <span>{act.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 text-sm justify-start">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-slate-400 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>Aura is calculating event logistics &amp; synthesizing recommendations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Chips */}
      <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Ask Aura:</span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 rounded-lg whitespace-nowrap transition"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl transition ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={isListening ? 'Listening...' : 'Voice Dictation'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aura anything (e.g., 'Suggest a contingency plan for rain', 'Review budget balance')..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-2xl transition shadow-lg shadow-purple-900/30 disabled:pointer-events-none"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
