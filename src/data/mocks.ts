export type EventType = 'flight' | 'transfer' | 'hotel' | 'activity';

export interface PlanEvent {
    id: string;
    type: EventType;
    title: string;
    subtitle: string;
    time: string;
    duration?: string;
    badges?: { text: string; color: 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'orange' | 'white' }[];
    aiReasoning?: string;
    price?: string;
    coordinates?: { x: number; y: number }; // For Map View
}

export interface FlightOption {
    id: string;
    airline: string;
    path: string;
    time: string;
    price: string;
    tag: string;
    scarcityMsg?: string;
}

export interface HotelOption {
    id: string;
    name: string;
    location: string;
    rating: string;
    price: string;
    image: string; // Placeholder for now, or use a solid color/icon
    tag: string;
    scarcityMsg?: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
    options?: FlightOption[] | HotelOption[]; // Generic options payload
    optionType?: 'flight' | 'hotel';
}

export const INITIAL_CHAT: ChatMessage[] = [
    {
        id: '1',
        sender: 'ai',
        text: "Hello! I'm Orbit. Where are we flying today?",
        timestamp: 'Now'
    }
];

export const FLIGHT_OPTIONS: FlightOption[] = [
    { id: 'opt1', airline: 'Indigo 6E-23', path: 'DEL → GOI', time: '10:00 AM - 12:30 PM', price: '₹5,400', tag: 'Recommended', scarcityMsg: 'Only 3 seats left at this price' },
    { id: 'opt2', airline: 'Vistara UK-88', path: 'DEL → GOI', time: '11:15 AM - 01:45 PM', price: '₹7,200', tag: 'Premium Economy', scarcityMsg: 'Filling fast' },
    { id: 'opt3', airline: 'SpiceJet SG-102', path: 'DEL → GOI', time: '06:00 AM - 08:30 AM', price: '₹4,900', tag: 'Cheapest' },
];

export const HOTEL_OPTIONS: HotelOption[] = [
    { id: 'h1', name: 'The St. Regis Goa', location: 'Mobor Beach', rating: '5.0', price: '₹22,500', image: 'bg-purple-900', tag: 'Luxury Match', scarcityMsg: 'Last room available' },
    { id: 'h2', name: 'Alila Diwa', location: 'Majorda', rating: '4.8', price: '₹18,500', image: 'bg-orbit-800', tag: 'Vibe Match', scarcityMsg: 'High demand dates' },
    { id: 'h3', name: 'W Goa', location: 'Vagator', rating: '4.9', price: '₹25,000', image: 'bg-indigo-900', tag: 'Trending' },
];

// 4-Day Itinerary Data (Updated with City Map Coordinates)
export const FULL_ITINERARY: Record<number, PlanEvent[]> = {
    1: [
        {
            id: '1-1', type: 'flight', title: 'IndiGo 6E-554', subtitle: 'DEL → GOI', time: '10:00 AM', duration: '2h 15m',
            badges: [{ text: 'On Time', color: 'green' }], price: '₹5,400', coordinates: { x: 80, y: 15 } // Airport (Top Right)
        },
        {
            id: '1-2', type: 'transfer', title: 'Private Cab', subtitle: 'Airport Pickup', time: '12:30 PM', duration: '45m',
            price: '₹1,200', coordinates: { x: 50, y: 30 } // Highway
        },
        {
            id: '1-3', type: 'hotel', title: 'The St. Regis Goa', subtitle: 'Check-in & Relax', time: '01:15 PM',
            badges: [{ text: 'Confirmed', color: 'purple' }], aiReasoning: 'Selected for its beach access and spa facilities.',
            price: '₹22,500/night', coordinates: { x: 25, y: 40 } // Coast (Left)
        },
        {
            id: '1-4', type: 'activity', title: 'Sunset Beach Walk', subtitle: 'Mobor Beach', time: '05:30 PM',
            badges: [{ text: 'Relaxing', color: 'blue' }], coordinates: { x: 20, y: 45 } // Coast (Left)
        },
        {
            id: '1-5', type: 'activity', title: 'Beachside Dinner', subtitle: 'Fisherman’s Wharf', time: '08:00 PM',
            badges: [{ text: 'Seafood', color: 'orange' }], coordinates: { x: 25, y: 55 } // Coast (Left)
        }
    ],
    2: [
        {
            id: '2-1', type: 'activity', title: 'Old Goa Churches', subtitle: 'Heritage Walk', time: '09:00 AM',
            badges: [{ text: 'Culture', color: 'blue' }], coordinates: { x: 60, y: 40 } // City (Inland)
        },
        {
            id: '2-2', type: 'activity', title: 'Local Lunch', subtitle: 'Vinayak Family Restaurant', time: '01:00 PM',
            badges: [{ text: 'Local', color: 'orange' }], coordinates: { x: 65, y: 50 } // City
        },
        {
            id: '2-3', type: 'activity', title: 'Latin Quarter Walk', subtitle: 'Fontainhas', time: '04:00 PM',
            badges: [{ text: 'Photo Op', color: 'purple' }], coordinates: { x: 70, y: 60 } // City
        }
    ],
    3: [
        { id: '3-1', type: 'activity', title: 'Dudhsagar Waterfalls', subtitle: 'Jungle Trek', time: '07:00 AM', coordinates: { x: 90, y: 80 } }, // Deep Inland
        { id: '3-2', type: 'activity', title: 'Spice Plantation', subtitle: 'Tour & Lunch', time: '02:00 PM', coordinates: { x: 80, y: 70 } } // Inland
    ],
    4: [
        { id: '4-1', type: 'activity', title: 'Panjim Market', subtitle: 'Souvenir Shopping', time: '10:00 AM', coordinates: { x: 65, y: 20 } }, // City
        { id: '4-2', type: 'flight', title: 'IndiGo 6E-559', subtitle: 'GOI → DEL', time: '04:00 PM', coordinates: { x: 80, y: 15 } } // Airport
    ]
};

// Alternate Plan for Dynamic Replanning (e.g. Flight Swap)
export const ALTERNATE_PLAN: Record<number, PlanEvent[]> = {
    ...FULL_ITINERARY,
    1: [
        {
            id: '1-1-alt', type: 'flight', title: 'Vistara UK-88', subtitle: 'DEL → GOI', time: '11:15 AM', duration: '2h 30m',
            badges: [{ text: 'Premium Economy', color: 'purple' }], price: '₹7,200', coordinates: { x: 80, y: 15 } // Airport
        },
        {
            id: '1-2-alt', type: 'transfer', title: 'Private Taxi', subtitle: 'Late Airport Pickup', time: '02:00 PM', duration: '45m',
            price: '₹1,500', coordinates: { x: 60, y: 25 }, // Highway
            aiReasoning: 'Traffic Expected due to later arrival time.'
        },
        {
            id: '1-3', type: 'hotel', title: 'The St. Regis Goa', subtitle: 'Check-in & Relax', time: '03:15 PM',
            badges: [{ text: 'Confirmed', color: 'purple' }], aiReasoning: 'Room upgrade requested based on your loyalty status.',
            price: '₹22,500/night', coordinates: { x: 25, y: 40 } // Coast
        },
        {
            id: '1-4', type: 'activity', title: 'Sunset Beach Walk', subtitle: 'Mobor Beach', time: '06:00 PM',
            badges: [{ text: 'Relaxing', color: 'blue' }], coordinates: { x: 20, y: 45 } // Coast
        }
    ]
};

export const GENERATED_PLAN = FULL_ITINERARY[1]; 
