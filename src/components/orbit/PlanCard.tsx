import React from 'react';
import type { PlanEvent } from '../../data/mocks';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plane, Car, Bed, Sun, ArrowLeftRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlanCardProps {
    event: PlanEvent;
    onSwap?: (id: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ event, onSwap }) => {
    const Icon = {
        flight: Plane,
        transfer: Car,
        hotel: Bed,
        activity: Sun,
    }[event.type];

    return (
        <Card className={`
      relative overflow-hidden border border-orbit-700
      ${event.type === 'flight' ? 'bg-gradient-to-br from-orbit-800 to-orbit-900' : 'bg-orbit-800'}
    `}>
            <CardContent className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className={`
              p-3 rounded-xl h-fit border border-white/5
              ${event.type === 'flight' ? 'bg-accent-500/10 text-accent-400' :
                                event.type === 'hotel' ? 'bg-purple-500/10 text-purple-400' :
                                    event.type === 'transfer' ? 'bg-orbit-700/50 text-text-secondary' : 'bg-blue-500/10 text-blue-400'}
            `}>
                            <Icon size={24} />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-display font-semibold text-lg text-text-primary">{event.title}</h3>
                                {event.badges?.map((badge, i) => (
                                    <Badge key={i} variant={badge.color as any}>{badge.text}</Badge>
                                ))}
                            </div>
                            <p className="text-sm text-text-secondary font-medium">{event.subtitle}</p>
                            <div className="flex items-center gap-3 text-xs text-text-muted font-medium pt-1">
                                <span>{event.time}</span>
                                {event.duration && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-orbit-600" />
                                        <span>{event.duration}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="font-display font-bold text-text-primary">{event.price}</div>
                    </div>
                </div>

                {/* AI Context Box */}
                {event.aiReasoning && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-accent-500/10 border border-accent-500/20 rounded-lg flex gap-3 items-start"
                    >
                        <Sparkles size={16} className="text-accent-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-text-primary leading-relaxed font-medium">
                            {event.aiReasoning}
                        </p>
                    </motion.div>
                )}

                {/* Swap Action for Flight */}
                {event.type === 'flight' && onSwap && (
                    <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => onSwap(event.id)} className="gap-2 text-xs h-8 border-orbit-600 bg-orbit-700 text-text-primary hover:bg-orbit-600 hover:text-white">
                            <ArrowLeftRight size={14} />
                            Swap Flight
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
