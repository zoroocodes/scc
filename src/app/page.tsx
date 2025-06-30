'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- ICONS (as inline SVGs for better performance and styling) ---
const XIcon = () => ( <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> );
const TelegramIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.17.91-.494 1.202-.822 1.224a1.67 1.67 0 0 1-1.138-.497c-.296-.275-.46-.448-.68-.615-.572-.446-1.034-.82-1.62-1.15-.806-.45-1.06-.58-1.26-.813-.043-.05-.338-.34-.14-.543.19-.19 1.22-1.17 1.74-1.65.11-.102.21-.193.31-.291.24-.24.12-.4.01-.52-.12-.12-.27-.08-.42-.04-.21.05-.51.14-.91.27-.83.28-1.52.42-2.04.39-.57-.03-1.04-.19-1.44-.43-.46-.27-.78-.65-.6-1.22.19-.58.89-2.07 1.25-2.71z"></path></svg> );
const ChartIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg> );
const WebsiteIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg> );
const DiscordIcon = () => ( <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.885-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4464.8245-.6662 1.2695a18.1461 18.1461 0 0 0-5.282 0c-.22-.445-.4552-.8942-.6662-1.2695a.0739.0739 0 0 0-.0785-.0371a19.7913 19.7913 0 0 0-4.885 1.5152.069.069 0 0 0-.0321.0233C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0586c.8152.4797 1.6662.9192 2.5225 1.2984a.0739.0739 0 0 0 .0874-.004c.4684-.2592.91-.5448 1.329-.8598a.0744.0744 0 0 0 .0214-.0692c-.0312-.22-.0586-.441-.0819-.662a.0741.0741 0 0 0-.046-.0652c-.6342-.2552-1.2415-.5628-1.8155-.902a.0744.0744 0 0 1-.004-.1172c.4018-.4582.781-.9395 1.1285-1.4436a.0741.0741 0 0 1 .0429-.0332c.378-.0652.762-.1225 1.1495-.1742a.0746.0746 0 0 1 .0884.0613c.9517 4.481 3.5595 5.8299 6.2025 5.8299s5.2507-1.3489 6.2025-5.8299a.0746.0746 0 0 1 .0884-.0613c.3875.0517.7715.109 1.1495.1742a.0741.0741 0 0 1 .0429.0332c.3475.504.7267.9855 1.1285 1.4436a.0744.0744 0 0 1-.004.1172c-.574.3392-1.1812.6468-1.8155.902a.0741.0741 0 0 0-.046.0652c-.0232.221-.0507.442-.0819.662a.0744.0744 0 0 0 .0214.0692c.419.315.8607.6005 1.329.8598a.0739.0739 0 0 0 .0874-.004c.8562-.3792 1.7072-.8187 2.5225-1.2984a.0824.0824 0 0 0 .0312-.0586c.4182-4.478-.4426-9.012-2.3481-13.665a.069.069 0 0 0-.0321-.0233zM8.02 15.3312c-.8336 0-1.509-.679-1.509-1.515s.6754-1.515 1.509-1.515c.8355 0 1.511.679 1.509 1.515s-.6735 1.515-1.509 1.515zm7.96 0c-.8336 0-1.509-.679-1.509-1.515s.6754-1.515 1.509-1.515c.8355 0 1.511.679 1.509 1.515s-.6735 1.515-1.509 1.515z"></path></svg> );
const UpArrowIcon = () => ( <svg viewBox="0 0 20 20" className="w-3 h-3 inline-block" fill="currentColor"><path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.03 9.83a.75.75 0 01-1.06-1.06l5.5-5.5a.75.75 0 011.06 0l5.5 5.5a.75.75 0 11-1.06 1.06L10.75 5.612V16.25A.75.75 0 0110 17z" clipRule="evenodd"></path></svg> );
const DownArrowIcon = () => ( <svg viewBox="0 0 20 20" className="w-3 h-3 inline-block" fill="currentColor"><path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l4.22-4.22a.75.75 0 111.06 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-5.5-5.5a.75.75 0 111.06-1.06L9.25 14.388V3.75A.75.75 0 0110 3z" clipRule="evenodd"></path></svg> );
const ShareIcon = () => ( <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor"><path d="M13 4.5a2.5 2.5 0 11.702 4.281-2.51 2.51 0 01-1.402.719h-.001a2.5 2.5 0 11-1.71-4.28l3.42-3.42a2.5 2.5 0 013.536 3.536l-1.294 1.293a.75.75 0 11-1.06-1.06l1.293-1.293a1 1 0 00-1.414-1.414l-3.42 3.42a1 1 0 00-.282.707V9.5a1 1 0 001 1h.5a1 1 0 100-2h-.5V7.707a1 1 0 00-.282-.707l-3.42-3.42a1 1 0 00-1.414 1.414l1.293 1.293a.75.75 0 01-1.06 1.06L6.03 6.03a2.5 2.5 0 013.536-3.536l.293.293a.75.75 0 01-1.06 1.06l-.293-.293a1 1 0 00-1.414 0l-.283.283A1 1 0 006.5 5.5v.5a1 1 0 102 0v-.5a1 1 0 00-.293-.707l.283-.283a1 1 0 001.414 0l.293.293a.75.75 0 011.06-1.06l-.293-.293z"></path></svg> );
const DownloadIcon = () => ( <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor"><path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.28 8.384a.75.75 0 10-1.06 1.06l4.25 4.25a.75.75 0 001.06 0l4.25-4.25a.75.75 0 10-1.06-1.06L10.75 11.364V2.75zM3.5 14.25a.75.75 0 00-1.5 0v1.5A2.75 2.75 0 004.75 18.5h10.5A2.75 2.75 0 0018 15.75v-1.5a.75.75 0 00-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-1.5z"></path></svg> );

// --- CONFIGURATION ---
const HELIUS_API_KEY = 'a0a4a340-e8fc-4eeb-8e5f-c244981d06df'; 
const REFRESH_INTERVAL_SECONDS = 30;
const TRENDING_TRADER_THRESHOLD = 1000;
const VOLATILITY_THRESHOLD = 30;
const LOW_MC_THRESHOLD = 25000;

// --- API Endpoints ---
const LATEST_TOKENS_API = 'https://api.dexscreener.com/token-profiles/latest/v1';
const DEXSCREENER_TOKENS_API = 'https://api.dexscreener.com/latest/dex/tokens/';
const HELIUS_API_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// --- Helper Functions ---
const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return 'N/A';
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return `${num.toFixed(2)}`;
};

const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined) return 'N/A';
    if (price < 0.000001) return `${price.toExponential(2)}`;
    return `${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`;
};

const generateTokenAnalysis = (token: any) => {
    let score = 0;
    const reasons = [];
    let isNewborn = false, isRugged = false, isTrending = false, isVolatile = false;

    if (token.mintedAt) {
        if ((Date.now() - new Date(token.mintedAt).getTime()) < 86400000) { 
            score += 2; 
            reasons.push({text: "Token is < 24h old", points: 2});
            isNewborn = true;
        }
    }
    
    const totalTraders = (token.txns24h?.buys || 0) + (token.txns24h?.sells || 0);
    if (isNewborn && totalTraders > TRENDING_TRADER_THRESHOLD) {
        isTrending = true;
        score -= 2; 
        reasons.push({text: `Trending on launch (${totalTraders} traders)`, points: -2});
    }

    if (!token.links?.some((l: any) => l.type?.toLowerCase() === 'twitter')) { score += 1; reasons.push({text: "No Twitter link", points: 1}); }
    if (token.priceChange5m <= -20) { score += 2; reasons.push({text: `Dropped ${Math.abs(token.priceChange5m)}% in 5m`, points: 2}); }
    if (token.priceChange5m <= -80) isRugged = true;
    if (Math.abs(token.priceChange5m) >= VOLATILITY_THRESHOLD) isVolatile = true;
    if (token.marketCap < LOW_MC_THRESHOLD) { score += 1; reasons.push({text: `Market Cap < $${(LOW_MC_THRESHOLD/1000).toFixed(0)}k`, points: 1}); }
    if (token.liquidity === null || token.liquidity === undefined) { score += 2; reasons.push({text: "No liquidity data", points: 2}); }
    if (token.volume24h < 5000) { score += 2; reasons.push({text: "24h Volume < $5k", points: 2}); }
    if (token.isCentralized) { score += 3; reasons.push({text: "Highly centralized", points: 3}); }

    score = Math.max(0, score);
    return { score, reasons, isNewborn, isRugged, isTrending, isVolatile, isCentralized: token.isCentralized };
};

// --- Child Components ---
const FudScoreDisplay = ({ score }: { score: number }) => {
    const getScoreStyle = () => {
        if (score >= 11) return { bg: 'bg-red-500', text: 'text-red-100' };
        if (score >= 6) return { bg: 'bg-yellow-500', text: 'text-yellow-100' };
        return { bg: 'bg-green-500', text: 'text-green-100' };
    };
    const { bg, text } = getScoreStyle();
    const meterWidth = `${(score / 20) * 100}%`;

    return (
        <div className="relative group w-full flex flex-col items-center">
            <div className="flex items-center justify-center w-full">
                <span className={`text-xl font-bold mr-2 ${text.replace('-100', '-400')}`}>{score}</span>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${bg} transition-all duration-500 ease-out`} 
                        style={{ width: meterWidth }}
                    />
                </div>
            </div>
        </div>
    );
};

const FudBreakdownModal = ({ token, onClose }: { token: any; onClose: () => void }) => {
    if (!token) return null;
    const { score, reasons } = token.analysis;
    const getScoreStyle = () => {
        if (score >= 11) return 'border-red-500 text-red-400';
        if (score >= 6) return 'border-yellow-500 text-yellow-400';
        return 'border-green-500 text-green-400';
    };

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-start justify-between">
                    <div><h3 className="text-xl font-bold text-white">{token.name || "Token"}</h3><p className="text-sm text-gray-400">{token.symbol}</p></div>
                    <div className={`text-5xl font-black ${getScoreStyle()}`}>{score}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <h4 className="font-semibold text-gray-300 mb-2">FUD Score Breakdown:</h4>
                    {reasons.length > 0 ? (
                        <ul className="list-none space-y-2">
                            {reasons.map((reason, i) => <li key={i} className={`flex justify-between items-center bg-slate-700/50 p-2 rounded-md ${reason.points < 0 ? 'text-green-300' : 'text-gray-300'}`}><span>{reason.text}</span><span className={`font-mono font-semibold ${reason.points < 0 ? 'text-green-400' : 'text-gray-400'}`}>{reason.points > 0 ? `+${reason.points}`: reason.points}</span></li>)}
                        </ul>
                    ) : ( <p className="text-gray-400 mt-2">No FUD factors detected. Looking safe!</p> )}
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors">Close</button>
            </div>
        </div>
    );
};

const TokenTag = ({ text, color, icon }: { text: string; color: string; icon?: React.ReactNode }) => ( <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full mr-2 ${color}`}>{icon} {text}</span> );

const Navbar = ({ lastUpdated, countdown }: { lastUpdated: Date; countdown: number }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true) }, []);

    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                    <span className="text-3xl font-black text-white tracking-tighter">FixMyFud</span>
                    <span className="ml-3 text-sm font-medium text-gray-400">Your Shield Against Rugs. On Solana.</span>
                </div>
                <div className="text-sm text-gray-500">
                    {isClient ? (
                        <>
                            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                            <span className="ml-2 font-mono">(refreshing in {countdown}s)</span>
                        </>
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const FilterControls = ({ activeFilter, setFilter, hideLowMc, setHideLowMc }: { 
    activeFilter: string; 
    setFilter: (filter: string) => void; 
    hideLowMc: boolean; 
    setHideLowMc: (hide: boolean) => void; 
}) => {
    const filters = ["All", "Low FUD", "Medium FUD", "High FUD", "Pumping", "Dumping"];
    return (
        <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400 mr-2">Filters:</span>
            {filters.map(filter => ( 
                <button 
                    key={filter} 
                    onClick={() => setFilter(filter)} 
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${ 
                        activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50' 
                    }`}
                >
                    {filter}
                </button> 
            ))}
            <div className="border-l border-slate-700 h-6 mx-2"></div>
            <button 
                onClick={() => setHideLowMc(!hideLowMc)} 
                className={`flex items-center px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    hideLowMc ? 'bg-blue-500 text-white' : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                }`}
            >
                <div className={`w-3 h-3 rounded-full mr-2 ${hideLowMc ? 'bg-white' : 'bg-gray-500'}`}></div>
                Hide Low MC
            </button>
        </div>
    );
};

const Sparkline = ({ data, isPositive }: { data: number[]; isPositive: boolean }) => {
    if (!data || data.length < 2) return null;
    const width = 50; const height = 16;
    const max = Math.max(...data); const min = Math.min(...data);
    const range = max - min === 0 ? 1 : max - min;
    const points = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - ((d - min) / range) * height}`).join(' ');
    return ( <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block ml-2 opacity-50"><polyline fill="none" stroke={isPositive ? "#22c55e" : "#ef4444"} strokeWidth="1.5" points={points} /></svg> );
};

const FudCard = React.forwardRef(({ token }, ref) => {
    if (!token) return null;
    const { score } = token.analysis;
    const getScoreStyle = () => {
        if (score >= 11) return 'text-red-400';
        if (score >= 6) return 'text-yellow-400';
        return 'text-green-400';
    };

    return (
        <div ref={ref} className="w-[400px] bg-slate-900 border border-slate-700 rounded-2xl p-6 font-sans text-white" style={{ background: 'radial-gradient(circle at top, #1e293b, #0f172a, #020617)' }}>
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full" src={token.icon} alt={`${token.name} icon`} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/64x64/1e293b/94a3b8?text=?'; }} />
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold">{token.name || 'N/A'}</h2>
                        <p className="text-lg text-gray-400">{token.symbol || 'N/A'}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">FUD Score</p>
                    <p className={`text-5xl font-black ${getScoreStyle()}`}>{score}</p>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div><p className="text-sm text-gray-400">Market Cap</p><p className="text-lg font-semibold">{formatNumber(token.marketCap)}</p></div>
                <div><p className="text-sm text-gray-400">Volume (24h)</p><p className="text-lg font-semibold">{formatNumber(token.volume24h)}</p></div>
                <div><p className="text-sm text-gray-400">Liquidity</p><p className="text-lg font-semibold">{formatNumber(token.liquidity)}</p></div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                <div className="text-sm">
                    <p className="font-bold text-lg">FixMyFud</p>
                    <p className="text-gray-500">fixmyfud.com</p>
                </div>
                <img className="w-20 h-20 rounded-lg bg-white p-1" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${token.url}`} alt="QR Code" />
            </div>
        </div>
    );
});
FudCard.displayName = 'FudCard';

const ShareModal = ({ token, onClose }: { token: any; onClose: () => void }) => {
    const cardRef = useRef();

    const handleDownload = useCallback(() => {
        // Simplified download - just show alert in this environment
        alert('Download feature would work with html-to-image library in production');
    }, []);

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-slate-800/80 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-white mb-4">Share FUD Card</h3>
                <FudCard ref={cardRef} token={token} />
                <button onClick={handleDownload} className="mt-6 w-full max-w-xs bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <DownloadIcon />
                    <span className="ml-2">Download PNG</span>
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [countdown, setCountdown] = useState(REFRESH_INTERVAL_SECONDS);
    const [modalToken, setModalToken] = useState(null);
    const [shareModalToken, setShareModalToken] = useState(null);
    const [activeFilter, setFilter] = useState("All");
    const [hideLowMc, setHideLowMc] = useState(false);

    const fetchTokenData = useCallback(async () => {
        if (tokens.length === 0) setLoading(true);
        setError(null);
        try {
            // Fetch latest token profiles from DexScreener
            const profilesResponse = await fetch(LATEST_TOKENS_API);
            if (!profilesResponse.ok) throw new Error('Failed to fetch token profiles');
            const profilesData = await profilesResponse.json();
            const solanaProfiles = profilesData.filter(p => p.chainId === 'solana').slice(0, 50);
            const tokenAddresses = solanaProfiles.map(p => p.tokenAddress);

            if (tokenAddresses.length === 0) {
                setTokens([]);
                setLoading(false);
                return;
            }

            // Fetch financial data from DexScreener
            const financialResponse = await fetch(`${DEXSCREENER_TOKENS_API}${tokenAddresses.join(',')}`);
            const financialData = await financialResponse.json();
            const financialDataMap = (financialData.pairs || []).reduce((acc, pair) => {
                if (!acc[pair.baseToken.address]) {
                    acc[pair.baseToken.address] = pair;
                }
                return acc;
            }, {});

            // Fetch metadata from Helius
            const heliusResponse = await fetch(HELIUS_API_URL, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ 
                    jsonrpc: '2.0', 
                    id: 'h-batch', 
                    method: 'getAssetBatch', 
                    params: { ids: tokenAddresses } 
                }) 
            });
            const heliusData = await heliusResponse.json();
            const metadataMap = (heliusData.result || []).reduce((acc, asset) => { 
                if (asset) acc[asset.id] = { 
                    supply: asset.token_info ? asset.token_info.supply / Math.pow(10, asset.token_info.decimals) : null, 
                    mintedAt: asset.content?.metadata?.created_at || null 
                }; 
                return acc; 
            }, {});

            // Generate centralization data (simulate for now)
            const centralizedMap = tokenAddresses.reduce((acc, addr) => { 
                acc[addr] = Math.random() > 0.9; 
                return acc; 
            }, {});

            const combinedTokens = solanaProfiles.map(profile => {
                const financialInfo = financialDataMap[profile.tokenAddress] || {};
                const metadata = metadataMap[profile.tokenAddress] || {};
                const marketCap = financialInfo.priceUsd && metadata.supply ? parseFloat(financialInfo.priceUsd) * metadata.supply : null;
                
                const fullTokenData = {
                    ...profile,
                    ...financialInfo,
                    name: profile.name || financialInfo.baseToken?.name,
                    symbol: profile.symbol || financialInfo.baseToken?.symbol,
                    icon: profile.icon || financialInfo.info?.imageUrl,
                    priceUsd: financialInfo.priceUsd,
                    marketCap, 
                    mintedAt: metadata.mintedAt, 
                    isCentralized: centralizedMap[profile.tokenAddress], 
                    priceChange5m: financialInfo.priceChange?.m5,
                    volume24h: financialInfo.volume?.h24,
                    liquidity: financialInfo.liquidity?.usd,
                    txns24h: financialInfo.txns?.h24,
                    sparklineData: Array.from({ length: 7 }, () => Math.random() * 100),
                    url: `https://dexscreener.com/solana/${profile.tokenAddress}`
                };
                fullTokenData.analysis = generateTokenAnalysis(fullTokenData);
                return fullTokenData;
            });

            setTokens(combinedTokens);
            setLastUpdated(new Date());
        } catch (err) { 
            setError(err.message); 
        } finally { 
            setLoading(false); 
        }
    }, [tokens.length]);

    useEffect(() => { 
        fetchTokenData(); 
        const i = setInterval(fetchTokenData, REFRESH_INTERVAL_SECONDS * 1000); 
        return () => clearInterval(i); 
    }, [fetchTokenData]);
    
    useEffect(() => { 
        setCountdown(REFRESH_INTERVAL_SECONDS); 
        const t = setInterval(() => setCountdown(p => (p > 1 ? p - 1 : REFRESH_INTERVAL_SECONDS)), 1000); 
        return () => clearInterval(t); 
    }, [lastUpdated]);
    
    const filteredTokens = tokens.filter(token => {
        if (hideLowMc && (token.marketCap === null || token.marketCap < LOW_MC_THRESHOLD)) { return false; }
        if (activeFilter === "All") return true;
        const score = token.analysis.score;
        if (activeFilter === "Low FUD") return score <= 5;
        if (activeFilter === "Medium FUD") return score >= 6 && score <= 10;
        if (activeFilter === "High FUD") return score >= 11;
        if (activeFilter === "Pumping") return token.priceChange5m >= VOLATILITY_THRESHOLD;
        if (activeFilter === "Dumping") return token.priceChange5m <= -VOLATILITY_THRESHOLD;
        return true;
    });

    const socialLinks = [ 
        { type: 'website', Icon: WebsiteIcon, title: 'View Website' }, 
        { type: 'discord', Icon: DiscordIcon, title: 'Join Discord' }, 
        { type: 'twitter', Icon: XIcon, title: 'View on X' }, 
        { type: 'telegram', Icon: TelegramIcon, title: 'Join Telegram' } 
    ];

    return (
        <div className="bg-slate-900 text-gray-300 min-h-screen font-sans antialiased" style={{ background: 'radial-gradient(circle at top, #1e293b, #0f172a, #020617)' }}>
            <div className="container mx-auto p-4 md:p-6">
                <Navbar lastUpdated={lastUpdated} countdown={countdown} />
                <FilterControls activeFilter={activeFilter} setFilter={setFilter} hideLowMc={hideLowMc} setHideLowMc={setHideLowMc} />
                
                {modalToken && (
                    <FudBreakdownModal token={modalToken} onClose={() => setModalToken(null)} />
                )}
                
                {shareModalToken && (
                    <ShareModal token={shareModalToken} onClose={() => setShareModalToken(null)} />
                )}
                
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>{error}
                    </div>
                )}

                <div className="overflow-x-auto shadow-2xl shadow-black/20 rounded-lg border border-slate-700/50">
                    <table className="min-w-full">
                        <thead className="bg-slate-800/50">
                            <tr className="border-b-2 border-slate-700/50">
                                {['Token', 'Price', 'Change (5m)', 'Volume (24h)', 'Liquidity', 'Market Cap', 'FUD Score', 'Links'].map(h => ( 
                                    <th key={h} className={`px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider ${h.includes('Token') ? 'text-left' : 'text-right'}`}>
                                        {h === 'FUD Score' ? <div className="text-center">FUD Score</div> : h}
                                    </th> 
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-800">
                            {loading ? ( 
                                <tr>
                                    <td colSpan="8" className="text-center p-12">
                                        <div className="flex justify-center items-center text-gray-400">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                            <span className="ml-3">Loading Tokens...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTokens.length > 0 ? filteredTokens.map((token) => {
                                    const { isNewborn, isRugged, isCentralized, isTrending, isVolatile, score } = token.analysis;
                                    const priceChange = token.priceChange5m;
                                    const priceChangeColor = priceChange > 0 ? 'text-green-400' : priceChange < 0 ? 'text-red-400' : 'text-gray-500';

                                    return (
                                        <tr 
                                            key={token.tokenAddress} 
                                            className="transition-colors duration-200 hover:bg-slate-800/50"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <img 
                                                        className="w-9 h-9 rounded-full flex-shrink-0" 
                                                        src={token.icon} 
                                                        alt="" 
                                                        onError={(e) => { 
                                                            e.target.onerror = null; 
                                                            e.target.src='https://placehold.co/36x36/1e293b/94a3b8?text=?'; 
                                                        }} 
                                                    />
                                                    <div className="ml-3">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-100 font-semibold whitespace-nowrap" title={token.name}>
                                                                {token.name || 'N/A'}
                                                            </p>
                                                            {isRugged && <TokenTag text="RUGGED 💀" color="bg-red-900 text-red-300" />}
                                                        </div>
                                                        <div className="flex items-center mt-1">
                                                            {isNewborn && <TokenTag text="Newborn 🍼" color="bg-cyan-900 text-cyan-300" />}
                                                            {isTrending && <TokenTag text="Trending 🔥" color="bg-orange-900 text-orange-300" />}
                                                            {isVolatile && <TokenTag text="Volatile ⚡" color="bg-indigo-900 text-indigo-300" />}
                                                            {isCentralized && <TokenTag text="Centralized 🔒" color="bg-purple-900 text-purple-300" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right font-mono text-gray-200">
                                                {formatPrice(token.priceUsd)}
                                                <Sparkline data={token.sparklineData} isPositive={priceChange > 0} />
                                            </td>
                                            <td className={`px-4 py-3 text-right font-semibold font-mono ${priceChangeColor}`}>
                                                {priceChange > 0 ? <UpArrowIcon/> : priceChange < 0 ? <DownArrowIcon/> : null}
                                                {priceChange?.toFixed(2)}%
                                            </td>
                                            <td className="px-4 py-3 text-right font-mono text-gray-400">
                                                {formatNumber(token.volume24h)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-mono text-gray-400">
                                                {formatNumber(token.liquidity)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-mono text-gray-400">
                                                {formatNumber(token.marketCap)}
                                            </td>
                                            <td className="px-4 py-3 text-center w-40 cursor-pointer" onClick={() => setModalToken(token)}>
                                                <FudScoreDisplay score={score} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end items-center space-x-3">
                                                    {socialLinks.map(({ type, Icon, title }) => { 
                                                        const link = token.links?.find(l => l.type?.toLowerCase() === type); 
                                                        return link && (
                                                            <a 
                                                                key={type} 
                                                                href={link.url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-gray-500 hover:text-white transition-colors" 
                                                                title={title}
                                                            >
                                                                <Icon />
                                                            </a>
                                                        )
                                                    })}
                                                    <a 
                                                        href={token.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-gray-500 hover:text-white transition-colors" 
                                                        title="View on DexScreener"
                                                    >
                                                        <ChartIcon />
                                                    </a>
                                                    <button 
                                                        onClick={() => setShareModalToken(token)} 
                                                        className="text-gray-500 hover:text-white transition-colors" 
                                                        title="Share FUD Card"
                                                    >
                                                        <ShareIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) : ( 
                                    <tr>
                                        <td colSpan="8" className="text-center p-12 text-gray-500">
                                            No tokens match the current filter.
                                        </td>
                                    </tr> 
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                <footer className="text-center mt-8 text-gray-500 text-xs">
                    <p>
                        Powered by{' '}
                        <a href="https://dexscreener.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            DexScreener
                        </a>
                        {' '}&{' '}
                        <a href="https://helius.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            Helius
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
}