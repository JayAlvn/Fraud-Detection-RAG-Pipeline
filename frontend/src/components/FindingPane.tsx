import { RiskGauge } from './RiskGauge';
import { FactorsChart } from './FactorsChart';

type Risk = { level: string; score: number; factors: { name: string; weight: number }[] };

type FindingPaneProps = {
  finding: string;
  loading: boolean;
  mode: 'naive' | 'basic';
  risk: Risk;
  accent: string;
};

function levelColor(level: string): string {
  if (level === 'high') return '#ef4444';
  if (level === 'medium') return '#f59e0b';
  return '#22c55e';
}

export function FindingPane({ finding, loading, mode, risk, accent }: FindingPaneProps) {
  const showRisk = mode === 'basic' && !loading && !!finding;

  return (
    <div
      className="flex h-full flex-col overflow-hidden p-5"
      style={{ backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)' }}
    >
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3
          className="text-[11px] font-semibold tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Finding
        </h3>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: 'var(--card-bg)',
            color: accent,
            border: '1px solid var(--border-color)',
          }}
        >
          {mode}
        </span>
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        {loading ? (
          <div className="text-sm animate-pulse" style={{ color: 'var(--text-muted)' }}>
            Searching…
          </div>
        ) : finding ? (
          <>
            <div
              key={finding}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-xl p-4 text-[15px] leading-relaxed"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                overflowWrap: 'anywhere',
              }}
            >
              {finding}
            </div>

            {showRisk && (
              <div className="mt-4 grid grid-cols-[auto_1fr] gap-4 items-center">
                <RiskGauge score={risk.score} level={risk.level} />
                <FactorsChart data={risk.factors} color={levelColor(risk.level)} />
              </div>
            )}
          </>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Ask a question to see the result here.
          </p>
        )}
      </div>
    </div>
  );
}