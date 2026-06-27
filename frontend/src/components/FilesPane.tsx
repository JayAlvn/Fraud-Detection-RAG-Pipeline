import { useState, useRef } from 'react';
import { FileIcon, UploadIcon } from './Icons';

type Doc = { name: string; chunks: number };

export function FilesPane() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('http://localhost:8000/upload', { method: 'POST', body: form });
      const data = await res.json();
      setDocs((prev) => [...prev, { name: data.filename, chunks: data.chunks_indexed }]);
    } catch {
      // ignore upload errors for now
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="flex h-full min-h-0 min-w-0 flex-col overflow-y-auto p-5"
      style={{ backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)' }}
    >
      {/* Context Window — hardcoded for now, logic comes later */}
      <div className="mb-5">
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          Context Window
        </h3>
        <div className="mb-2 flex h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}>
          <div className="h-full transition-all duration-500" style={{ width: '34%', backgroundColor: '#22c55e' }} />
        </div>
        <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>4,312 / 128k tokens</span>
          <span style={{ color: '#22c55e' }}>34%</span>
        </div>
      </div>

      <hr className="mb-5" style={{ borderColor: 'var(--border-color)' }} />

      {/* Files */}
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        Files
      </h3>

      <div className="space-y-2">
        {docs.map((doc, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-xl border p-3"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
          >
            <FileIcon />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{doc.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{doc.chunks} chunks</p>
            </div>
          </div>
        ))}

        <div
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed py-6 px-4 text-center"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div style={{ color: 'var(--text-muted)' }}>
            <UploadIcon />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {uploading ? 'Uploading…' : 'Click to add a file'}
          </p>
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>
    </div>
  );
}