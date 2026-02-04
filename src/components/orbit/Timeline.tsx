import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlanEvent } from '../../data/mocks';
import { PlanCard } from './PlanCard';
import { cn } from '../../lib/utils';

interface TimelineProps {
    events: PlanEvent[];
    currentDay: number;
    totalDays: number;
    onSelectDay: (day: number) => void;
    onSwap?: (id: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
    events,
    onSwap,
    currentDay,
    totalDays,
    onSelectDay
}) => {
    return (
        <div className="relative pl-0 md:pl-0 flex flex-col gap-6">

            {/* Day Selector - Sticky Header */}
            <div className="sticky top-0 z-20 bg-orbit-950/90 backdrop-blur-lg border-b border-white/5 py-4 -mx-4 px-4 flex gap-2 overflow-x-auto scrollbar-hide">
                {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1;
                    const isActive = day === currentDay;
                    return (
                        <button
                            key={day}
                            onClick={() => onSelectDay(day)}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                isActive
                                    ? "bg-accent-600 text-white shadow-lg shadow-accent-600/20"
                                    : "bg-orbit-800 text-text-secondary hover:bg-orbit-700 hover:text-text-primary border border-orbit-700"
                            )}
                        >
                            Day {day}
                            {isActive && (
                                <motion.div
                                    layoutId="activeDay"
                                    className="absolute inset-0 border border-white/20 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            <div className="relative pl-8 md:pl-0 min-h-[400px]">
                {/* Vertical Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 border-l-2 border-dotted border-orbit-700/50 hidden md:block" />

                <div className="space-y-8">
                    <AnimatePresence mode='popLayout'>
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id} // Ensure IDs are unique across days or prefix them
                                initial={{ opacity: 0, x: 20, y: 10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                className="relative md:flex gap-6 group"
                            >
                                {/* Timeline Dot */}
                                <div className={`
                absolute left-[-25px] top-6 w-4 h-4 rounded-full border-[3px] z-10 hidden md:block bg-orbit-900 shadow-[0_0_10px_black]
                ${event.type === 'flight' ? 'border-accent-500' :
                                        event.type === 'hotel' ? 'border-purple-500' :
                                            event.type === 'transfer' ? 'border-orbit-600' : 'border-blue-400'}
                `} />

                                <div className="flex-1">
                                    <PlanCard event={event} onSwap={onSwap} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {events.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 text-text-muted opacity-50">
                            <p>No activities scheduled for Day {currentDay}.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
