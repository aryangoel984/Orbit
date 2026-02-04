import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
    onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    // CLEAN STATE: No default values to ensure professional feel
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onLogin();
        }, 1500);
    };

    return (
        <div className="h-screen w-full bg-[#00050A] flex items-center justify-center relative overflow-hidden font-sans">

            {/* Cinematic Background (Consistent with Landing) */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orbit-900/40 to-[#00050A]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* High-Tech Card */}
                <div className="bg-[#0A0F1C]/80 backdrop-blur-xl rounded-none border border-white/10 p-8 shadow-2xl relative overflow-hidden">

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-50" />

                    <div className="flex flex-col items-center mb-10">
                        <div className="p-3 bg-white/5 rounded-full mb-4 border border-white/5">
                            <ShieldCheck size={24} className="text-white/80" />
                        </div>
                        <h2 className="text-xl font-display font-medium text-white tracking-widest uppercase">Identity Verification</h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold text-orbit-500 uppercase tracking-widest ml-1">Official Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-orbit-500 group-focus-within:text-white transition-colors" size={16} />
                                {/* NO DEFAULT VALUE - Clean Input */}
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@orbit.travel"
                                    className="w-full bg-[#050A10] border border-white/10 rounded-sm px-12 py-3 text-white text-sm focus:outline-none focus:border-accent-500/50 focus:bg-[#0A0F1C] transition-all font-mono placeholder:text-orbit-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono font-bold text-orbit-500 uppercase tracking-widest ml-1">Access Token</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-orbit-500 group-focus-within:text-white transition-colors" size={16} />
                                {/* NO DEFAULT VALUE - Clean Input */}
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#050A10] border border-white/10 rounded-sm px-12 py-3 text-white text-sm focus:outline-none focus:border-accent-500/50 focus:bg-[#0A0F1C] transition-all font-mono placeholder:text-orbit-700"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black hover:bg-orbit-200 font-bold py-3.5 rounded-sm transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Authorize</span>
                                    <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <span className="text-[10px] text-orbit-600 font-mono">SECURE CONNECTION ESTABLISHED</span>
                    </div>

                </div>
            </motion.div>

        </div>
    );
};
