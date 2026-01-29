
import React, { useState } from 'react';

interface LoginProps {
  onComplete: () => void;
}

const Login: React.FC<LoginProps> = ({ onComplete }) => {
  const [form, setForm] = useState({ username: 'atlaskazuma', password: 'atlasthegreat' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-white">WELCOME BACK</h1>
        <p className="text-zinc-500 text-sm mt-1 font-mono uppercase tracking-widest">Identify to Access PatterWatch</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Username</label>
          <input 
            type="text" 
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-green-500 outline-none rounded transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Password</label>
          <input 
            type="password" 
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-green-500 outline-none rounded transition-colors"
          />
        </div>

        <button 
          className="w-full bg-green-600 text-white font-bold py-4 rounded hover:bg-green-500 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : 'ACCESS SYSTEM'}
        </button>

        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
          <span className="text-zinc-600 cursor-pointer hover:text-zinc-400">Forgot Password</span>
          <span className="text-zinc-800">FP_CHECK_SILENT_OK</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
