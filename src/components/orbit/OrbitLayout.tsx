import React from 'react';


interface OrbitLayoutProps {
    chatPanel: React.ReactNode;
    dashboardPanel: React.ReactNode;
}

export const OrbitLayout: React.FC<OrbitLayoutProps> = ({ chatPanel, dashboardPanel }) => {
    return (
        <div className="h-screen w-screen bg-orbit-950 text-text-primary overflow-hidden flex flex-col md:flex-row font-sans">
            {/* Left Panel: Chat / Agent Interface */}
            <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-orbit-700 bg-orbit-900/50 backdrop-blur-sm z-20 relative shadow-2xl">
                <div className="h-16 flex items-center px-6 border-b border-orbit-700/50 bg-orbit-950/80">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center border border-accent-500/50">
                            <div className="w-4 h-4 bg-accent-500 rounded-full animate-pulse-slow shadow-[0_0_10px_theme('colors.accent.500')]" />
                        </div>
                        <h1 className="font-display font-bold text-xl tracking-wide">Orbit <span className="text-accent-500">AI</span></h1>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    {chatPanel}
                </div>
            </div>

            {/* Right Panel: Visualization Dashboard */}
            <div className="flex-1 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orbit-800/40 via-orbit-950 to-orbit-950">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                {dashboardPanel}
            </div>
        </div>
    );
};
