import { useState, useRef, useEffect } from 'react';
import { OrbitLayout } from './OrbitLayout';
import { ChatInterface } from './ChatInterface';
import { CityMap } from './CityMap';
import { Timeline } from './Timeline';
import { INITIAL_CHAT, FLIGHT_OPTIONS, HOTEL_OPTIONS, FULL_ITINERARY, ALTERNATE_PLAN } from '../../data/mocks';
import type { ChatMessage, FlightOption, HotelOption } from '../../data/mocks';
import { motion, AnimatePresence } from 'framer-motion';

export const OrbitDashboard = () => {
    // Chat & Conversation State
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingActivity, setThinkingActivity] = useState<string | undefined>(undefined);

    // Conversation Flow State (0: Dest, 1: Origin, 2: Dates, 3: Travelers, 4: Vibe, 5: Flights)
    const [conversationStep, setConversationStep] = useState(0);

    // App State
    const [currentDay, setCurrentDay] = useState(1);
    const [showDashboard, setShowDashboard] = useState(false);
    const [isReplanning, setIsReplanning] = useState(false);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

    // Selection State
    const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<HotelOption | null>(null);

    // Computed Plan
    const activePlanData = isReplanning ? ALTERNATE_PLAN : FULL_ITINERARY;
    const activePlan = showDashboard ? (activePlanData[currentDay] || []) : [];

    // Auto-advance logic for conversation
    const advanceConversation = (userText: string) => {
        // Add User Message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: userText,
            timestamp: 'Now'
        };
        setMessages(prev => [...prev, userMsg]);
        setIsThinking(true);

        // Determine Next Step
        const nextStep = conversationStep + 1;
        setConversationStep(nextStep);

        // AI Response Logic
        setTimeout(() => {
            setIsThinking(false);
            let aiText = "";
            let options: any = undefined;
            let type: any = undefined;

            switch (nextStep) {
                case 1: // After Destination -> Ask Origin
                    aiText = "Great choice. Where will you be flying from?";
                    break;
                case 2: // After Origin -> Ask Dates
                    aiText = "Noted. What are your preferred travel dates?";
                    break;
                case 3: // After Dates -> Ask Travelers
                    aiText = "Got it. How many people are travelling?";
                    break;
                case 4: // After Travelers -> Ask Vibe
                    aiText = "And finally, what's the vibe for this trip? (e.g., Relaxed, Adventure, Party)";
                    break;
                case 5: // After Vibe -> Show Flights
                    setThinkingActivity("Scanning global flight databases...");
                    setIsThinking(true);

                    setTimeout(() => {
                        setIsThinking(false);
                        setThinkingActivity(undefined);
                        const flightMsg: ChatMessage = {
                            id: Date.now().toString(),
                            sender: 'ai',
                            text: "Based on your preferences, I've found these best-value flights.",
                            timestamp: 'Just now',
                            options: FLIGHT_OPTIONS,
                            optionType: 'flight'
                        };
                        setMessages(prev => [...prev, flightMsg]);
                    }, 2000); // Extra delay for "Scanning"
                    return; // Return early as we handled the message push asynchronously
                default:
                    aiText = "I'm listening...";
            }

            if (aiText) {
                const aiMsg: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    text: aiText,
                    timestamp: 'Just now'
                };
                setMessages(prev => [...prev, aiMsg]);
            }

        }, 1000); // Standard response latency
    };

    const handleSendMessage = (text: string) => {
        advanceConversation(text);
    };

    const handleSelectOption = (optionId: string, type: 'flight' | 'hotel') => {
        setIsThinking(true);

        if (type === 'flight') {
            const flight = FLIGHT_OPTIONS.find(f => f.id === optionId);

            // Check if this is a "Change" from an existing plan (Simulated Replanning)
            if (selectedFlight && flight?.id !== selectedFlight.id) {
                setThinkingActivity("Re-calculating travel vectors...");
                setTimeout(() => {
                    setIsThinking(false);
                    setThinkingActivity(undefined);
                    const impactMsg: ChatMessage = {
                        id: Date.now().toString(),
                        sender: 'ai',
                        text: `Switching to ${flight?.airline}... NOTE: This flight arrives later. I've updated your transfer to a private taxi to ensure you reach the hotel comfortably, though traffic might be higher.`,
                        timestamp: 'Just now'
                    };
                    setMessages(prev => [...prev, impactMsg]);
                    setSelectedFlight(flight || null);
                    setIsReplanning(true); // Trigger Alternate Plan
                }, 2000);
                return;
            }

            setSelectedFlight(flight || null);
            setThinkingActivity("Curating sustainable hotel options...");

            setTimeout(() => {
                setIsThinking(false);
                setThinkingActivity(undefined);
                // Confirm Flight & Ask for Hotel
                const confirmMsg: ChatMessage = {
                    id: Date.now().toString(),
                    sender: 'ai',
                    text: `Flight confirmed. Now, for your stay – here are options matching your verified vibe.`,
                    timestamp: 'Just now',
                    options: HOTEL_OPTIONS as unknown as FlightOption[],
                    optionType: 'hotel'
                };
                setMessages(prev => [...prev, confirmMsg]);
            }, 2000);

        } else {
            const hotel = HOTEL_OPTIONS.find(h => h.id === optionId);
            setSelectedHotel(hotel || null);
            setThinkingActivity("Finalizing reservation details...");

            setTimeout(() => {
                setIsThinking(false);
                setThinkingActivity(undefined);
                // Final Confirmation
                const finalMsg: ChatMessage = {
                    id: Date.now().toString(),
                    sender: 'ai',
                    text: `Excellent. Access to ${hotel?.name} confirmed. Generating your full 4-day itinerary now...`,
                    timestamp: 'Just now'
                };
                setMessages(prev => [...prev, finalMsg]);

                // Show Loader before Dashboard
                setTimeout(() => {
                    setIsGeneratingPlan(true);
                    setTimeout(() => {
                        setIsGeneratingPlan(false);
                        setShowDashboard(true);
                    }, 3500); // 3.5s Loader Duration
                }, 800);
            }, 1500);
        }
    };

    const handleSwapTrigger = (_id: string) => {
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: "I want to see other flight options.",
            timestamp: 'Now'
        };
        setMessages(prev => [...prev, userMsg]);
        setIsThinking(true);
        setThinkingActivity("Retrieving alternative flights...");

        setTimeout(() => {
            setIsThinking(false);
            setThinkingActivity(undefined);
            const aiReply: ChatMessage = {
                id: Date.now().toString(),
                sender: 'ai',
                text: "Certainly. Analyzing alternative flights based on your schedule...",
                timestamp: 'Just now',
                options: FLIGHT_OPTIONS,
                optionType: 'flight'
            };
            setMessages(prev => [...prev, aiReply]);
        }, 1500);
    };

    return (
        <OrbitLayout
            chatPanel={
                <ChatInterface
                    messages={messages}
                    isThinking={isThinking}
                    thinkingText={thinkingActivity}
                    onSendMessage={handleSendMessage}
                    onSelectOption={handleSelectOption}
                />
            }
            dashboardPanel={
                <div className="h-full p-6 md:p-10 overflow-y-auto relative">
                    <AnimatePresence mode="wait">
                        {isGeneratingPlan ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-orbit-950/80 backdrop-blur-sm z-50 text-center"
                            >
                                <div className="relative w-24 h-24 mb-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-orbit-700 opacity-20" />
                                    <div className="absolute inset-0 rounded-full border-t-2 border-accent-500 animate-spin" />
                                    <div className="absolute inset-4 rounded-full border-2 border-orbit-600 opacity-20" />
                                    <div className="absolute inset-4 rounded-full border-r-2 border-accent-400 animate-spin-reverse-slow" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white tracking-widest uppercase animate-pulse">
                                    Constructing Itinerary
                                </h3>
                                <div className="mt-4 flex flex-col gap-1 text-xs font-mono text-text-muted">
                                    <span className="text-accent-400">&gt;&gt; Analyzing flight vectors...</span>
                                    <span className="opacity-0 animate-fadeIn delay-700" style={{ animationDelay: '1s' }}>&gt;&gt; Locking hotel coordinates...</span>
                                    <span className="opacity-0 animate-fadeIn delay-1000" style={{ animationDelay: '2s' }}>&gt;&gt; Synchronizing transit paths...</span>
                                </div>
                            </motion.div>
                        ) : showDashboard ? (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="max-w-4xl mx-auto space-y-8"
                            >
                                {/* Dashboard Header */}
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-display font-bold text-white mb-2">Trip to Goa</h2>
                                        <p className="text-text-secondary">4 Days • {selectedFlight?.airline} + {selectedHotel?.name}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/50 text-sm font-medium">
                                            {isReplanning ? 'Updated Plan' : 'Smart Plan Active'}
                                        </div>
                                    </div>
                                </div>

                                {/* City Navigation Map */}
                                <CityMap events={activePlan} currentDay={currentDay} />

                                {/* Detailed Timeline */}
                                <div>
                                    <h3 className="text-xl font-display font-semibold text-white mb-6">Itinerary Details</h3>
                                    <Timeline
                                        events={activePlan}
                                        currentDay={currentDay}
                                        totalDays={4}
                                        onSelectDay={setCurrentDay}
                                        onSwap={handleSwapTrigger}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center opacity-30"
                            >
                                <div className="w-24 h-24 rounded-full border-2 border-dashed border-orbit-700 mb-6 animate-spin-slow" />
                                <h3 className="text-2xl font-display font-bold text-white">Awaiting Mission Parameters</h3>
                                <p className="max-w-md mt-2 text-text-muted">
                                    Your live dashboard will activate once we finalize your travel vector.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            }
        />
    );
};
