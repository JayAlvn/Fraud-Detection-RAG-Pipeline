import { useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

type ChatPaneProps = {
  messages: Message[];
  onSend: (prompt: string) => void;
  loading: boolean;
  mode: 'naive' | 'basic';
  setMode: (mode: 'naive' | 'basic') => void;
};

export function ChatPane({ messages, onSend, loading, mode, setMode }: ChatPaneProps) {
  const [text, setText] = useState('');

  const submit = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText('');
  };

  const modeButton = (value: 'naive' | 'basic') => (
    <button
      type="button"
      onClick={() => setMode(value)}
      className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
      style={
        mode === value
          ? { backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)' }
          : { backgroundColor: 'var(--card-bg)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }
      }
    >
      {value}
    </button>
  );

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col" style={{ backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)' }}>
      {/* Messages */}
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm" style={{ color: 'var(--text-muted)' }}>
            Ask something to begin.
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <span
                className="animate-in fade-in slide-in-from-bottom-1 duration-200 inline-block max-w-[85%] break-words rounded-2xl px-3.5 py-2 text-sm"
                style={
                  msg.role === 'user'
                    ? { backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)' }
                    : { backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }
                }
              >
                {msg.content}
              </span>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <span className="inline-block rounded-2xl px-3.5 py-2 text-sm" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              Generating…
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Paste your prompt…  (Enter to send, Shift+Enter for newline)"
          rows={3}
          className="w-full resize-none rounded-xl p-3 text-sm outline-none"
          style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
        />
        <div className="mt-2 flex items-center gap-2">
          {modeButton('naive')}
          {modeButton('basic')}
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="ml-auto rounded-full px-5 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)' }}
          >
            {loading ? '…' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}