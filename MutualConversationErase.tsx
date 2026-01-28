
import React, { useState } from 'react';
import { User, Conversation } from '../types';

interface MCEProps {
  user: User;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', app: 'WhatsApp', contact: '+63 917 555 1234', age: '3 months', lastActivity: '2 hours ago' },
  { id: '2', app: 'Telegram', contact: '@atlas_secret', age: '1 year', lastActivity: 'Yesterday' },
  { id: '3', app: 'Instagram', contact: 'atlaskazuma', age: '2 days', lastActivity: 'Just now' },
];

const MutualConversationErase: React.FC<MCEProps> = ({ user }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [showPinDialog, setShowPinDialog] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTrigger = (id: string) => {
    setShowPinDialog(id);
  };

  const handleConfirmDelete = () => {
    if (pin === user.pin) {
      setIsDeleting(true);
      setTimeout(() => {
        setConversations(prev => prev.filter(c => c.id !== showPinDialog));
        setIsDeleting(false);
        setShowPinDialog(null);
        setPin('');
      }, 2000);
    } else {
      alert("INVALID_PIN: ACCESS_DENIED");
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8">
      <div className="mb-8 border-b border-zinc-800 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-red-500 tracking-tighter uppercase">Mutual Conversation Erase (MCE)</h2>
          <p className="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-widest">Permanent Cryptographic Removal • No Recovery Possible</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-600 font-bold uppercase">MCE_STATUS</p>
          <p className="text-green-500 font-bold">READY</p>
        </div>
      </div>

      <div className="space-y-4">
        {conversations.length > 0 ? conversations.map((convo) => (
          <div key={convo.id} className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-red-900/50 transition-all">
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 group-hover:text-red-400 transition-colors">
                {convo.app[0]}
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{convo.app}</p>
                <p className="text-white font-bold">{convo.contact}</p>
                <div className="flex gap-4 mt-1">
                  <span className="text-[10px] text-zinc-600 font-mono">AGE: {convo.age}</span>
                  <span className="text-[10px] text-zinc-600 font-mono">LAST: {convo.lastActivity}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDeleteTrigger(convo.id)}
              className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-red-600 hover:border-red-500 hover:text-white rounded text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              🗑 Delete Conversation
            </button>
          </div>
        )) : (
          <div className="py-20 text-center border-2 border-dashed border-zinc-800 rounded-lg">
             <p className="text-zinc-600 font-mono uppercase tracking-[0.5em]">No Conversations Indexed</p>
          </div>
        )}
      </div>

      {showPinDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="w-full max-w-sm bg-zinc-900 border border-red-900/50 rounded-lg p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest text-center mb-6">Authorize Deletion</h3>
            <p className="text-zinc-500 text-xs text-center mb-6 leading-relaxed">
              This action requires your Security PIN and will permanently erase all data from both inboxes. <br/>
              <span className="text-red-500 font-bold mt-2 block">NO RECOVERY POSSIBLE.</span>
            </p>
            
            <input 
              type="password" 
              maxLength={6}
              value={pin}
              placeholder="******"
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-4xl tracking-[0.5rem] bg-zinc-950 border border-red-900/30 p-4 rounded w-full font-mono text-red-500 outline-none mb-6"
            />

            <div className="flex gap-4">
              <button 
                onClick={handleConfirmDelete}
                disabled={pin.length < 6 || isDeleting}
                className="flex-1 bg-red-600 text-white font-bold py-3 rounded hover:bg-red-500 disabled:opacity-50 uppercase text-xs tracking-widest"
              >
                {isDeleting ? 'ERASING...' : 'CONFIRM'}
              </button>
              <button 
                onClick={() => { setShowPinDialog(null); setPin(''); }}
                className="flex-1 bg-zinc-800 text-zinc-400 font-bold py-3 rounded hover:bg-zinc-700 uppercase text-xs tracking-widest"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutualConversationErase;
