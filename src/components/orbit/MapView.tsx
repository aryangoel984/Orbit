import React from 'react';
import { motion } from 'framer-motion';
import type { PlanEvent } from '../../data/mocks';
import { Navigation } from 'lucide-react';

interface MapViewProps {
    events: PlanEvent[];
    currentDay: number;
}

export const MapView: React.FC<MapViewProps> = ({ events, currentDay }) => {
    // Filter nodes that have coordinates
    const nodes = events.filter(e => e.coordinates).map(e => ({
        ...e,
        coordinates: e.coordinates!
    }));

    return (
        <div className="w-full h-[400px] relative overflow-hidden rounded-xl border border-orbit-700/50 bg-orbit-900/40 backdrop-blur-sm group">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* World Map Silhouette (SVG) - Abstract */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 800 400">
                <path d="M150,150 Q180,100 250,120 T400,150 T550,200 T700,100" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Nodes & Connections */}
            <div className="absolute inset-0 p-8">
                {nodes.map((node, index) => (
                    <motion.div
                        key={`${currentDay}-${node.id}`} // Force re-mount on day change for pop animation
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2, type: "spring" }}
                        className="absolute flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    >
                        {/* Node Dot */}
                        <div className="relative group/node cursor-pointer">
                            <div className="absolute -inset-4 bg-accent-500/10 rounded-full blur-md opacity-0 group-hover/node:opacity-100 transition-opacity" />
                            <div className={`
                   w-4 h-4 rounded-full border-2 shadow-[0_0_15px_theme('colors.accent.500')]
                   ${node.type === 'flight' ? 'bg-accent-500 border-white' :
                                    node.type === 'hotel' ? 'bg-purple-500 border-white' : 'bg-orbit-700 border-white'}
                `}>
                                {/* Pulse Effect for Hotel (Destination) */}
                                {node.type === 'hotel' && (
                                    <div className="absolute inset-0 rounded-full animate-ping bg-purple-500 opacity-50" />
                                )}
                            </div>

                            {/* Tooltip Label */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-orbit-800/90 border border-orbit-600 px-3 py-1.5 rounded-lg text-xs font-medium text-text-primary backdrop-blur-md opacity-0 group-hover/node:opacity-100 transition-opacity z-20">
                                {node.title}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Animated Flight Path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <motion.path
                        d={`M ${nodes.map(n => `${n.coordinates.x * 10},${n.coordinates.y * 4}`).join(' L ')}`} // Simple scaler for SVG space
                        fill="none"
                        stroke="url(#gradient-line)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                            <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="bg-orbit-900/80 backdrop-blur-md border border-orbit-700 px-3 py-1 rounded-full text-[10px] text-text-muted flex items-center gap-2">
                    <Navigation size={12} className="text-accent-500" />
                    Live Tracking
                </div>
                <div className="bg-orbit-900/80 backdrop-blur-md border border-orbit-700 px-3 py-1 rounded-full text-[10px] text-text-muted flex items-center gap-2">
                    Day {currentDay} Focus
                </div>
            </div>
        </div>
    );
};
