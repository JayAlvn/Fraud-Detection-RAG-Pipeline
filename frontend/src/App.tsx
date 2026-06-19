import React, { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { THEMES, ThemeColors } from './lib/themes';
import { MessageSquareIcon, RefreshIcon } from './components/Icons';
import { ChatPane } from './components/ChatPane';
import { ContextPane } from './components/ContextPane';
import { EmptyPane } from './components/EmptyPane';
import './App.css';

const DEFAULT_LAYOUT = { left: 55, chat: 25, files: 20 } as const;

function App() {
  const [visible, setVisible] = useState({ chat: true });
  const [theme, setTheme] = useState<ThemeColors>(THEMES[0].colors);

  // Citations live here so ChatPane (writes) and ContextPane (reads) can share them.
  const [citations, setCitations] = useState<string[]>([]);
  
  // Bumping this key remounts the panel Group, which snaps all panes back to default sizes.
  const [layoutKey, setLayoutKey] = useState(0);

  const togglePanel = (key: keyof typeof visible) => {
    setVisible(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetLayout = () => {
    setVisible({ chat: true });
    setLayoutKey(k => k + 1);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--app-bg)',
        '--app-bg': theme.bg,
        '--panel-bg': theme.panelBg,
        '--card-bg': theme.cardBg,
        '--text-main': theme.text,
        '--text-muted': theme.textMuted,
        '--border-color': theme.border,
        '--accent-color': theme.accent,
        '--accent-text': theme.accentText,
      } as React.CSSProperties}
    >
      {/* Toolbar Row */}
      <div className="absolute top-1.5 right-4 z-50">
        <div
          className="flex items-center gap-1 p-1 rounded-lg border shadow-sm backdrop-blur-md"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          <button
            onClick={() => togglePanel('chat')}
            className="p-1.5 rounded transition-all"
            style={visible.chat ? { backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)' } : { color: 'var(--text-muted)' }}
            title="Toggle Chat"
          >
            <MessageSquareIcon />
          </button>
          <button
            onClick={resetLayout}
            className="p-1.5 rounded transition-all"
            style={{ color: 'var(--text-muted)' }}
            title="Reset Layout"
          >
            <RefreshIcon />
          </button>
          <div className="w-px h-4 self-center mx-1.5" style={{ backgroundColor: 'var(--border-color)' }} />
          
          {/* Theme Switcher */}
          <div className="flex items-center gap-1.5 px-1.5">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.colors)}
                className="w-3.5 h-3.5 rounded-full border transition-transform hover:scale-125 focus:outline-none"
                style={{
                  background: `linear-gradient(135deg, ${t.colors.bg} 50%, ${t.colors.panelBg} 50%)`,
                  borderColor: theme.bg === t.colors.bg ? 'var(--text-main)' : 'rgba(0,0,0,0.15)'
                }}
                title={t.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Panels Area */}
      <Group
        key={layoutKey}
        orientation="horizontal"
        defaultLayout={DEFAULT_LAYOUT}
        className="h-full w-full"
      >
        <Panel id="left" defaultSize={DEFAULT_LAYOUT.left} minSize={15} className="min-w-0">
          <EmptyPane />
        </Panel>
        
        {visible.chat && (
          <Separator className="panel-separator" />
        )}
        
        {visible.chat && (
          <Panel id="chat" defaultSize={DEFAULT_LAYOUT.chat} minSize={20} className="min-w-0" style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
            <ChatPane onCitations={setCitations} />
          </Panel>
        )}
        
        <Separator className="panel-separator" />
        
        <Panel id="files" defaultSize={DEFAULT_LAYOUT.files} minSize={15} className="min-w-0">
          <ContextPane citations={citations} />
        </Panel>
      </Group>
    </div>
  );
}

export default App;