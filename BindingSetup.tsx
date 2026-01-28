
import React, { useState } from 'react';
import { User, Partner } from '../types';

interface BindingSetupProps {
  user: User;
  onComplete: (partner: Partner, pin: string) => void;
}

const BindingSetup: React.FC<BindingSetupProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState('');
  const [partnerUsername, setPartnerUsername] = useState('Partner_One');
  const [partnerStatus, setPartnerStatus] = useState<'PENDING' | 'LINKED'>('PENDING');

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete({ username: partnerUsername, status: partnerStatus }, pin);
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-lg p-10 shadow-2xl backdrop-blur-md">
      <div className="flex justify-between mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 z-10 ${step >= s ? 'bg-green-600 border-green-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
              {s}
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-tighter ${step >= s ? 'text-white' : 'text-zinc-600'}`}>
              {s === 1 ? 'PIN Set' : s === 2 ? 'Partner Bind' : 'Social Link'}
            </span>
            {s < 3 && <div className={`absolute top-5 left-1/2 w-full h-[2px] -z-0 ${step > s ? 'bg-green-600' : 'bg-zinc-800'}`}></div>}
          </div>
        ))}
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Identity Binding</h2>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto">Set a 6-digit Security PIN for critical actions like MCE and Pattern Overrides.</p>
            <input 
              type="password" 
              maxLength={6}
              value={pin}
              placeholder="******"
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-4xl tracking-[1rem] bg-zinc-950 border border-zinc-800 p-4 rounded w-full font-mono text-green-500 outline-none focus:border-green-500"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Partner Binding</h2>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg inline-block w-full">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-left flex-1">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Your Status</p>
                  <p className="text-green-500 font-bold">READY</p>
                </div>
                <div className="text-zinc-700 text-xl">{'<--->'}</div>
                <div className="text-right flex-1">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Partner Status</p>
                  <p className={`${partnerStatus === 'LINKED' ? 'text-green-500' : 'text-yellow-500'} font-bold`}>{partnerStatus}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mb-6 font-mono">Invite Code: PW-B821-X99</p>
              <button 
                onClick={() => setPartnerStatus('LINKED')}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold py-2 px-4 rounded uppercase tracking-widest transition-colors"
              >
                Mock Link Acceptance
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Social Metadata Connection</h2>
            <div className="grid grid-cols-2 gap-4">
              {['WhatsApp', 'Telegram', 'Instagram', 'Messenger'].map((app) => (
                <div key={app} className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg flex items-center justify-between group hover:border-zinc-600 cursor-pointer">
                  <span className="font-bold text-zinc-400 group-hover:text-white transition-colors">{app}</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase">Activity Metadata: ✅ | Structure: ✅ | Content: ❌</p>
          </div>
        )}
      </div>

      <button 
        disabled={step === 1 && pin.length < 6}
        onClick={handleNextStep}
        className="w-full mt-10 bg-white text-black font-bold py-4 rounded hover:bg-zinc-200 transition-all uppercase tracking-widest text-sm disabled:opacity-30"
      >
        {step === 3 ? 'Initialize Dashboard' : 'Continue'}
      </button>
    </div>
  );
};

export default BindingSetup;
