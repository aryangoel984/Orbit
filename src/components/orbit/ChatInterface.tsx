import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Plane, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { ChatMessage, FlightOption, HotelOption } from '../../data/mocks';
import { cn } from '../../lib/utils';

interface ChatInterfaceProps {
    messages: ChatMessage[];
    isThinking: boolean;
    thinkingText?: string;
    onSendMessage: (text: string) => void;
    onSelectOption: (optionId: string, type: 'flight' | 'hotel') => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    isThinking,
    thinkingText,
    onSendMessage,
    onSelectOption
}) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" ref={scrollRef}>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex flex-col gap-2 max-w-[90%]",
                            msg.sender === 'user' ? "self-end items-end" : "self-start items-start"
                        )}
                    >
                        <div className={cn(
                            "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                            msg.sender === 'user'
                                ? "bg-accent-600 text-white rounded-tr-none"
                                : "bg-orbit-800 text-text-primary border border-orbit-700 rounded-tl-none"
                        )}>
                            {msg.text}
                        </div>

                        {/* Embedded Options (Flight & Hotel Cards) */}
                        {msg.options && (
                            <div className="flex flex-col gap-3 mt-2 w-full min-w-[300px]">
                                {msg.options.map((opt, idx) => {
                                    const isFlight = msg.optionType === 'flight' || (!msg.optionType && (opt as any).airline);

                                    return (
                                        <motion.button
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={opt.id}
                                            onClick={() => onSelectOption(opt.id, isFlight ? 'flight' : 'hotel')}
                                            className="flex items-center justify-between p-3 rounded-xl bg-orbit-800/50 border border-orbit-700 hover:border-accent-500 hover:bg-orbit-800 transition-all group text-left w-full"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg text-text-secondary group-hover:text-accent-400 group-hover:bg-accent-500/10 transition-colors ${!isFlight ? 'bg-purple-500/10 text-purple-400 group-hover:text-purple-300' : 'bg-orbit-700/50'}`}>
                                                    {isFlight ? <Plane size={18} /> : <Building2 size={18} />}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-text-primary text-sm">
                                                        {isFlight ? (opt as FlightOption).airline : (opt as HotelOption).name}
                                                    </div>
                                                    <div className="text-xs text-text-muted">
                                                        {isFlight ? (opt as FlightOption).time : (opt as HotelOption).location}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="font-bold text-accent-400 text-sm">{(opt as any).price}</span>
                                                {(opt as any).tag && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orbit-700 text-text-secondary uppercase tracking-wider">
                                                        {(opt as any).tag}
                                                    </span>
                                                )}
                                                {(opt as any).scarcityMsg && (
                                                    <span className="text-[10px] font-bold text-orange-400 mt-1 animate-pulse">
                                                        {(opt as any).scarcityMsg}
                                                    </span>
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}

                        <span className="text-[10px] text-text-muted opacity-50 px-1">{msg.timestamp}</span>
                    </motion.div>
                ))}

                {/* AI Thinking Indicator */}
                {isThinking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="self-start flex items-center gap-2 p-4 rounded-2xl rounded-tl-none bg-orbit-800/50 border border-orbit-700/50"
                    >
                        <Sparkles size={16} className="text-accent-400 animate-pulse" />
                        <span className="text-xs font-medium text-text-secondary font-mono">
                            {thinkingText || "Synthesizing travel path..."}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-orbit-900 border-t border-orbit-700 z-10">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Orbit anything..."
                        className="w-full bg-orbit-950 border border-orbit-700 text-text-primary rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/50 transition-all placeholder:text-text-muted text-sm shadow-inner"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-2 top-2 w-9 h-9 bg-accent-600 hover:bg-accent-500 text-white rounded-lg shadow-lg shadow-accent-600/20"
                    >
                        <Send size={16} />
                    </Button>
                </form>
            </div>
        </div>
    );
};
