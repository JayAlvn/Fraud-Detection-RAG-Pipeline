import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

function levelColor(level: string): string {
  if (level === 'high') return '#ef4444';    // red
  if (level === 'medium') return '#f59e0b';  // amber
  return '#22c55e';                          // green (low / default)
}

export function RiskGauge({ score, level }: { score: number; level: string }) {
  const data = [{ value: score }];
  const color = levelColor(level);

  return (
    <div style={{ position: 'relative', width: 140, height: 140 }}>
      <RadialBarChart
        width={140}
        height={140}
        cx="50%"
        cy="50%"
        innerRadius="72%"
        outerRadius="100%"
        barSize={12}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        {/* This axis maps score 0–100 onto the circle so the bar fills proportionally */}
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          background={{ fill: 'var(--card-bg)' }}
          dataKey="value"
          cornerRadius={6}
          fill={color}
          angleAxisId={0}
        />
      </RadialBarChart>

      {/* Number + label centered over the ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 700, color }}>{score}</span>
        <span
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
          }}
        >
          {level}
        </span>
      </div>
    </div>
  );
}