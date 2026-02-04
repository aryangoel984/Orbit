import React from 'react';
import { motion } from 'framer-motion';
import type { PlanEvent } from '../../data/mocks';
import { Plane, Building, MapPin, Utensils, Camera, Navigation, Waves } from 'lucide-react';


interface CityMapProps {
    events: PlanEvent[];
    currentDay: number;
}

export const CityMap: React.FC<CityMapProps> = ({ events, currentDay }) => {
    const nodes = events.filter(e => e.coordinates);

    const getIcon = (type: string, title: string) => {
        if (type === 'flight') return Plane;
        if (type === 'hotel') return Building;
        if (title.toLowerCase().includes('lunch') || title.toLowerCase().includes('dinner')) return Utensils;
        if (title.toLowerCase().includes('shopping')) return MapPin;
        return Camera;
    };

    const getNodeColor = (type: string) => {
        if (type === 'flight') return 'bg-accent-500 border-accent-300';
        if (type === 'hotel') return 'bg-purple-500 border-purple-300';
        if (type === 'transfer') return 'bg-slate-500 border-slate-300';
        return 'bg-emerald-500 border-emerald-300'; // Activity
    };

    return (
        <div className="w-full h-[400px] relative overflow-hidden rounded-xl border border-orbit-700/50 bg-orbit-950 group shadow-2xl">

            {/* Map Background Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                {/* Coastline (Left) */}
                <div className="absolute left-0 top-0 bottom-0 w-[30%] bg-[#0f172a] border-r border-[#1e293b]">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    {/* Waves Decoration */}
                    <div className="absolute top-20 right-4 text-sky-800"><Waves size={40} /></div>
                    <div className="absolute bottom-40 right-10 text-sky-900"><Waves size={60} /></div>
                </div>

                {/* City Grid (Right) */}
                <div className="absolute right-0 top-0 bottom-0 w-[70%] bg-[#020617]">
                    {/* Major Roads */}
                    <svg className="absolute inset-0 w-full h-full stroke-orbit-800" strokeWidth="2">
                        <path d="M 50 400 L 150 200 L 400 150" fill="none" />
                        <path d="M 0 100 L 500 120" fill="none" />
                        <path d="M 200 0 L 220 400" fill="none" />
                        <path d="M 350 0 L 300 400" fill="none" />
                    </svg>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                {/* Labels */}
                <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] font-bold text-orbit-700 uppercase">City Sector 01</div>
                <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] font-bold text-sky-900 uppercase">Arabian Sea</div>
            </div>

            {/* Interactive Layer */}
            <div className="absolute inset-0 p-8">

                {/* Connectors (Paths) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {nodes.map((node, i) => {
                        if (i === nodes.length - 1) return null;
                        const nextNode = nodes[i + 1];

                        // Calculate simple travel time based on distance (Mock)
                        const dist = Math.sqrt(Math.pow(nextNode.coordinates!.x - node.coordinates!.x, 2) + Math.pow(nextNode.coordinates!.y - node.coordinates!.y, 2));
                        const time = Math.round(dist * 1.5) + "m"; // Mock math

                        return (
                            <g key={`path-${i}`}>
                                <motion.line
                                    x1={`${node.coordinates!.x}%`} y1={`${node.coordinates!.y}%`}
                                    x2={`${nextNode.coordinates!.x}%`} y2={`${nextNode.coordinates!.y}%`}
                                    stroke="#475569" strokeWidth="2" strokeDasharray="4 4"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.2 }}
                                />
                                {/* Travel Time Pill */}
                                <motion.foreignObject
                                    x={`${(node.coordinates!.x + nextNode.coordinates!.x) / 2 - 3}%`}
                                    y={`${(node.coordinates!.y + nextNode.coordinates!.y) / 2 - 2}%`}
                                    width="60" height="24"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 + 0.5 }}
                                >
                                    <div className="bg-orbit-950 border border-orbit-700 text-[10px] text-text-secondary px-1.5 py-0.5 rounded-full flex items-center justify-center gap-1 shadow-sm w-fit mx-auto whitespace-nowrap">
                                        <span>{time}</span>
                                        <Navigation size={8} className="text-accent-500" />
                                    </div>
                                </motion.foreignObject>
                            </g>
                        )
                    })}
                </svg>

                {/* Pins */}
                {nodes.map((node, index) => {
                    const Icon = getIcon(node.type, node.title);

                    return (
                        <motion.div
                            key={`${currentDay}-${node.id}`}
                            initial={{ scale: 0, y: -20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.15, type: "spring" }}
                            className="absolute flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                            style={{ left: `${node.coordinates!.x}%`, top: `${node.coordinates!.y}%` }}
                        >
                            {/* Pin Body */}
                            <div className="relative">
                                {/* Pulse Ring */}
                                <div className={`absolute -inset-2 rounded-full opacity-0 group-hover/pin:opacity-30 animate-ping ${getNodeColor(node.type)}`} />

                                {/* Icon Circle */}
                                <div className={`
                         w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg z-10 relative
                         ${getNodeColor(node.type)} text-white
                      `}>
                                    <Icon size={14} />
                                </div>

                                {/* Pin Stick (Triangle) */}
                                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${node.type === 'hotel' ? 'border-t-purple-500' : 'border-t-accent-500'}`} />
                            </div>

                            {/* Label Card */}
                            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-max max-w-[150px] bg-orbit-900/90 backdrop-blur-md border border-orbit-700 rounded-lg px-3 py-1.5 text-xs text-center shadow-xl z-20 opacity-0 group-hover/pin:opacity-100 transition-opacity">
                                <div className="font-semibold text-text-primary">{node.title}</div>
                                <div className="text-[10px] text-text-muted">{node.subtitle}</div>
                            </div>
                        </motion.div>
                    );
                })}

            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 items-end pointer-events-none">
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 bg-orbit-950/80 px-2 py-1 rounded border border-orbit-800">
                        <div className="w-2 h-2 rounded-full bg-accent-500" /> <span className="text-[10px] text-text-secondary">Transit</span>
                    </div>
                    <div className="flex items-center gap-1 bg-orbit-950/80 px-2 py-1 rounded border border-orbit-800">
                        <div className="w-2 h-2 rounded-full bg-purple-500" /> <span className="text-[10px] text-text-secondary">Stay</span>
                    </div>
                    <div className="flex items-center gap-1 bg-orbit-950/80 px-2 py-1 rounded border border-orbit-800">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> <span className="text-[10px] text-text-secondary">Activity</span>
                    </div>
                </div>
            </div>

        </div>
    );
};
