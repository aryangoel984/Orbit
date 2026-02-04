import React from 'react';
import { motion } from 'framer-motion';
import type { PlanEvent } from '../../data/mocks';

interface IsometricMapProps {
    events: PlanEvent[];
    currentDay: number;
}

export const IsometricMap: React.FC<IsometricMapProps> = ({ events, currentDay }) => {
    const nodes = events.filter(e => e.coordinates);

    return (
        <div className="w-full h-[400px] relative overflow-hidden rounded-xl border border-orbit-700/50 bg-orbit-900/40 backdrop-blur-sm group perspective-[1000px]">

            {/* 3D Container - Tilted Plane */}
            <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-[60deg] rotate-z-[45deg] scale-[0.6]">

                {/* Grid Floor */}
                <div className="w-[1000px] h-[1000px] absolute bg-orbit-950/50 border border-orbit-700/30 shadow-2xl"
                    style={{
                        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), 
                                     linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                >
                    {/* Pulse Ring in Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent-500/20 rounded-full animate-[ping_4s_linear_infinite]" />
                </div>

                {/* Pylons (Nodes) */}
                {nodes.map((node, index) => {
                    // Convert % coordinates to approximate grid positions (0-1000)
                    const top = (node.coordinates!.y / 100) * 800 + 100;
                    const left = (node.coordinates!.x / 100) * 800 + 100;

                    return (
                        <motion.div
                            key={`${currentDay}-${node.id}`}
                            initial={{ scaleZ: 0, opacity: 0 }}
                            animate={{ scaleZ: 1, opacity: 1 }}
                            transition={{ delay: index * 0.15, type: 'spring' }}
                            className="absolute w-8 h-8 transform-style-3d"
                            style={{ top, left }}
                        >
                            {/* Base */}
                            <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-md" />

                            {/* The Pillar (Vertical Line) */}
                            <div
                                className={`absolute bottom-0 left-1/2 w-1 h-[60px] origin-bottom -translate-x-1/2 rotate-x-[-90deg]
                        ${node.type === 'hotel' ? 'bg-gradient-to-t from-purple-500 to-transparent' : 'bg-gradient-to-t from-accent-500 to-transparent'}
                        `}
                            />

                            {/* The Floating Icon/Badge at Top */}
                            <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-16 h-8 flex items-center justify-center rotate-x-[-90deg] rotate-z-[-45deg]">
                                <div className={`px-2 py-1 rounded bg-orbit-900/90 border text-[10px] font-bold whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.5)]
                            ${node.type === 'hotel' ? 'border-purple-500 text-purple-200' : 'border-accent-500 text-accent-100'}
                        `}>
                                    {node.title}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}

                {/* Connected Path (Simple Line on Floor) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-50">
                    <motion.path
                        d={`M ${nodes.map(n => {
                            const top = (n.coordinates!.y / 100) * 800 + 100;
                            const left = (n.coordinates!.x / 100) * 800 + 100;
                            return `${left},${top}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="url(#iso-gradient)"
                        strokeWidth="4"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                    />
                    <defs>
                        <linearGradient id="iso-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Map Controls UI Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end pointer-events-none">
                <div className="bg-orbit-950/80 backdrop-blur px-3 py-1.5 rounded-lg border border-orbit-700 text-xs text-text-muted flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                    ISO VIEW // DAY {currentDay}
                </div>
            </div>
        </div>
    );
};
