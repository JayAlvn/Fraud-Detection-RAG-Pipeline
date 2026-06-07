import React, { useState, useRef } from 'react';
import { MoreHorizontalIcon, FileIcon, XIcon, UploadIcon } from './Icons';

export function ContextPane() {
  const [documents, setDocuments] = useState<{ id: string; name: string; chunks: number; tokens: number }[]>([
    { id: '1', name: 'attention_paper.pdf', chunks: 42, tokens: 1820 },
    { id: '2', name: 'notes.txt', chunks: 8, tokens: 310 },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const newDoc = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      chunks: Math.floor(Math.random() * 20) + 1,
      tokens: Math.floor(Math.random() * 1000) + 100,
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (e.target) e.target.value = '';
  };

  const removeDoc = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div
      className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto p-5"
      style={{ backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Context Window Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Context Window</h3>
          <button className="p-1 rounded-md transition-colors" style={{ color: 'var(--text-muted)' }}>
            <MoreHorizontalIcon />
          </button>
        </div>
        <div className="h-1.5 w-full rounded-full overflow-hidden mb-2 flex" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="bg-[#22c55e] h-full" style={{ width: '34%' }}></div>
        </div>
        <div className="flex justify-between text-sm mb-5">
          <span>4,312 / 128k tokens</span>
          <span className="text-[#22c55e] font-medium">34%</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]"></div>
            <span style={{ color: 'var(--text-muted)' }}>Retrieved chunks</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#3b82f6]"></div>
            <span style={{ color: 'var(--text-muted)' }}>Conversation history</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <span style={{ color: 'var(--text-muted)' }}>Available</span>
          </div>
        </div>
      </div>
      <hr style={{ borderColor: 'var(--border-color)' }} className="mb-5" />

      {/* Loaded Documents Section */}
      <div>
        <h3 className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Loaded Documents</h3>
        <div className="space-y-2">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-xl transition-colors" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-center gap-3">
                <div className="p-1.5 border rounded-lg shadow-sm" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }}>
                  <FileIcon />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">{doc.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{doc.chunks} chunks · {doc.tokens.toLocaleString()} tokens</p>
                </div>
              </div>
              <button onClick={() => removeDoc(doc.id)} style={{ color: 'var(--text-muted)' }} className="p-1 hover:text-white transition-colors">
                <XIcon />
              </button>
            </div>
          ))}
          
          {/* Upload Dropzone */}
          <div
            className="mt-2 cursor-pointer rounded-xl border border-dashed py-6 px-4 text-center transition flex flex-col items-center gap-2 hover:bg-[var(--border-color)]"
            style={{ borderColor: 'var(--border-color)' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ color: 'var(--text-muted)' }} className="mb-1">
              <UploadIcon />
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Drop file or click to add</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}