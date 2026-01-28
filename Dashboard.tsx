
import React, { useState, useEffect } from 'react';
import { User, Partner, PatternAlert, Conversation } from '../types';
import { Terminal } from './Terminal';
import { generateTerminalLogs, analyzeBehaviorPatterns } from '../services/gemini';
import MutualConversationErase from './MutualConversationErase';
import PatternEngine from './PatternEngine';

interface DashboardProps {
  user: User;
  partner: Partner;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, partner, onLogout }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'MCE' | 'PATTERNS'>('DASHBOARD');

  useEffect(() => {
    const fetchLogs = async () => {
      const initialLogs = await generateTerminalLogs();
      setLogs(initialLogs);
    };
    fetchLogs();
  }, []);

  const toggleSystem = () => {
    setIsSystemActive(!isSystemActive);
    setLogs(prev => [...prev, isSystemActive ? "SYSTEM_IDLE" : "SYSTEM_INITIALIZED: 100% — COMPLETED", "ALL_SYSTEMS_GO // ENCRYPTION_LAYER_01_ACTIVE"]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white uppercase">
            Welcome, {user.username}!
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">
              SYSTEM_INITIALIZED: 100% — COMPLETED
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('DASHBOARD')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded border transition-all ${activeTab === 'DASHBOARD' ? 'bg-green-600 border-green-500 text-white' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
          >
            Core
          </button>
          <button 
             onClick={() => setActiveTab('MCE')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded border transition-all ${activeTab === 'MCE' ? 'bg-red-600 border-red-500 text-white' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
          >
            MCE Engine
          </button>
          <button 
             onClick={() => setActiveTab('PATTERNS')}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded border transition-all ${activeTab === 'PATTERNS' ? 'bg-blue-600 border-blue-500 text-white' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
          >
            Patterns
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {activeTab === 'DASHBOARD' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Status Cards */}
          <div className="space-y-4">
            <div className="bg-zinc-900/40 p-5 rounded-lg border border-zinc-800 flex justify-between items-center group hover:border-zinc-600 transition-all">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Identity</p>
                <p className="text-white font-bold tracking-tight">AUTH_OK</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border border-green-500/50">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="bg-zinc-900/40 p-5 rounded-lg border border-zinc-800 flex justify-between items-center group hover:border-zinc-600 transition-all">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Partner</p>
                <p className="text-white font-bold tracking-tight">LINKED ({partner.username})</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border border-green-500/50">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="bg-zinc-900/40 p-5 rounded-lg border border-zinc-800 flex justify-between items-center group hover:border-zinc-600 transition-all">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Metadata</p>
                <p className="text-white font-bold tracking-tight">SYNCED</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border border-green-500/50">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
            </div>

            <Terminal logs={logs} />
          </div>

          {/* Center Panel: Trust Core */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
              {/* Background pulses */}
              <div className={`absolute w-[300px] h-[300px] rounded-full border border-green-500/10 ${isSystemActive ? 'animate-ping' : ''}`}></div>
              <div className={`absolute w-[200px] h-[200px] rounded-full border border-green-500/20 ${isSystemActive ? 'animate-pulse' : ''}`}></div>
              
              <div className={`relative w-48 h-48 rounded-full bg-black border-4 flex items-center justify-center flex-col transition-all duration-700 ${isSystemActive ? 'border-green-500 shadow-[0_0_50px_rgba(0,255,65,0.2)]' : 'border-zinc-800'}`}>
                {isSystemActive ? (
                  <>
                    <div className="text-green-500 animate-pulse font-mono text-xs tracking-widest mb-2">ACTIVE</div>
                    <div className="text-white font-bold text-3xl font-mono tracking-tighter">100%</div>
                    <div className="text-[10px] text-zinc-500 mt-2 font-mono uppercase tracking-[0.2em]">Trust Core</div>
                  </>
                ) : (
                  <>
                    <div className="text-zinc-700 font-mono text-xs tracking-widest mb-2">IDLE</div>
                    <div className="text-zinc-800 font-bold text-3xl font-mono tracking-tighter">--%</div>
                  </>
                )}
              </div>

              <div className="mt-12 text-center">
                <p className={`font-mono text-xs tracking-[0.3em] uppercase transition-colors ${isSystemActive ? 'text-green-400' : 'text-zinc-600'}`}>
                   {isSystemActive ? 'DATA_STREAM_ACTIVE' : 'SYSTEM_OFFLINE'}
                </p>
                <button 
                  onClick={toggleSystem}
                  className={`mt-6 px-10 py-4 font-bold rounded uppercase tracking-widest text-xs transition-all ${isSystemActive ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20'}`}
                >
                  {isSystemActive ? 'Deactivate System' : 'Activate System ⚡'}
                </button>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-900/30 p-4 rounded text-center">
               <p className="text-[10px] text-red-500 font-mono uppercase tracking-widest">
                 Abuse Safeguard: Any pattern manipulation will result in immediate privilege revocation.
               </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'MCE' && <MutualConversationErase user={user} />}
      {activeTab === 'PATTERNS' && <PatternEngine isSystemActive={isSystemActive} />}
    </div>
  );
};

export default Dashboard;
