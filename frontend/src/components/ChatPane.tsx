import React, { useState } from 'react';

export function ChatPane() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: `Echo: ${input}` }]);
    }, 500);
    setInput('');
  };

  return (
    <div
      className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
      style={{ backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)' }}
    >
      {/* Messages Feed */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm" style={{ color: 'var(--text-muted)' }}>
            Send a message to start interacting.
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span
              className="inline-block px-4 py-2.5 rounded-2xl max-w-[80%] text-sm"
              style={msg.role === 'user' ? {
                backgroundColor: 'var(--accent-color)',
                color: 'var(--accent-text)'
              } : {
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)'
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="p-4 flex shrink-0 gap-3 items-center" style={{ borderTop: '1px solid var(--border-color)' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="min-w-0 flex-1 rounded-full px-5 py-2 text-sm outline-none transition-colors"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)'
          }}
        />
        <button
          type="button"
          onClick={sendMessage}
          className="shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)' }}
        >
          Send
        </button>
      </div>
    </div>
  );
}