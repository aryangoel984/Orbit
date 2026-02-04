import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Terminal, Command } from 'lucide-react';

interface LandingPageProps {
    onSearch: (query: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

    // Generate Starfield
    useEffect(() => {
        const newStars = Array.from({ length: 150 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            duration: Math.random() * 3 + 2,
        }));
        setStars(newStars);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="h-screen w-full bg-[#00050A] relative flex flex-col items-center justify-center overflow-hidden font-sans">

            {/* Cinematic Starfield Background */}
            <div className="absolute inset-0 z-0">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full opacity-0"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.2, 0.5]
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
                {/* Nebula / Haze Layers */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#0A0F1C]/50 to-[#00050A] mix-blend-multiply z-10" />
                <div className="absolute -top-[50%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-40 blur-3xl animate-pulse-slow" />
            </div>

            {/* Scanlines Overlay for "HUD" feel */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}
            />

            {/* Main Content Content */}
            <div className="relative z-20 w-full max-w-5xl px-6 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.1em' }}
                    animate={{ opacity: 1, scale: 1, letterSpacing: '0.25em' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-3 text-accent-400 mb-6 opacity-80">
                        <Terminal size={14} />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">System Online</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-medium text-white tracking-[0.05em] uppercase mix-blend-screen drop-shadow-glow">
                        Orbit
                    </h1>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent-500 to-transparent mx-auto mt-6" />
                    <p className="text-text-secondary text-sm md:text-base font-mono mt-6 tracking-widest uppercase opacity-70">
                        The Intent-First Travel Orchestrator
                    </p>
                </motion.div>

                {/* Command Bar Search */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl relative group"
                >
                    {/* Glow Effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 via-purple-600 to-accent-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                    <div className="relative bg-[#050A14] border border-orbit-700/50 rounded-lg p-1.5 flex items-center shadow-2xl overflow-hidden ring-1 ring-white/5">

                        {/* Command Prompt Icon */}
                        <div className="pl-4 pr-3 text-accent-500 animate-pulse">
                            <Command size={20} />
                        </div>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="INITIATE TRAVEL SEQUENCE..."
                            className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white text-lg font-mono px-2 py-4 placeholder:text-orbit-600/70 tracking-wider uppercase"
                            autoFocus
                            spellCheck={false}
                        />

                        <button
                            type="submit"
                            className="bg-accent-600/20 hover:bg-accent-500 text-accent-400 hover:text-white p-3 rounded-md transition-all border border-accent-500/30 hover:border-accent-400"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Corner decorative elements */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
                    </div>

                    <div className="flex justify-between mt-3 px-1">
                        <span className="text-[10px] font-mono text-orbit-600 uppercase">Input: Natural Language</span>
                        <span className="text-[10px] font-mono text-orbit-600 uppercase">v2.6.0 [Stable]</span>
                    </div>

                </motion.form>

            </div>
        </div>
    );
};
