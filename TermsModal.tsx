
import React from 'react';

interface TermsModalProps {
  onAgree: () => void;
  onCancel: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ onAgree, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-zinc-800 p-4 border-b border-zinc-700">
          <h2 className="text-lg font-bold text-white tracking-widest uppercase">System Protocol & Consent</h2>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh] text-zinc-300 text-sm font-mono leading-relaxed">
          <p className="text-green-500">[SYSTEM_INFO] Terms hash generation: sha256_9a2b...</p>
          <p>This system utilizes behavioral analysis to monitor interaction patterns between linked accounts.</p>
          <ul className="list-disc list-inside space-y-2 text-zinc-400">
            <li>You acknowledge that all data sharing is consensual.</li>
            <li>Mutual Conversation Erase (MCE) events require dual authorization.</li>
            <li>Metadata spikes and timing anomalies will trigger alerts.</li>
            <li>Abuse of the MCE feature results in immediate Trust Score devaluation.</li>
            <li>Access privileges can be revoked for pattern manipulation.</li>
          </ul>
          <div className="bg-zinc-950 p-3 rounded border border-zinc-800 mt-4 italic opacity-80">
            "PatterWatch exposes behavior, not secrets. Built on the foundation of radical transparency."
          </div>
        </div>

        <div className="p-6 border-t border-zinc-800 flex gap-4">
          <button 
            onClick={onAgree}
            className="flex-1 bg-green-600 text-white font-bold py-3 rounded hover:bg-green-500 transition-all uppercase text-xs tracking-widest"
          >
            I Agree & Proceed
          </button>
          <button 
            onClick={onCancel}
            className="flex-1 bg-zinc-800 text-zinc-400 font-bold py-3 rounded hover:bg-zinc-700 transition-all uppercase text-xs tracking-widest"
          >
            Cancel / Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
