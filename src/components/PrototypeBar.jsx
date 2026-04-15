import { theme } from '../lib/theme.js'

const t = theme

const SCENARIOS = [
  { id: 'scenario1', label: 'Scenario 1 — First-time admin' },
  { id: 'scenario2', label: 'Scenario 2 — Returning admin' },
]

export default function PrototypeBar({ scenario, onSwitch }) {
  return (
    <div style={{
      height: 40,
      background: '#1a1c1e',
      display: 'flex',
      alignItems: 'center',
      gap: t.spacing[2],
      padding: `0 ${t.spacing[2]}`,
      flexShrink: 0,
      zIndex: 200,
    }}>
      <span style={{
        ...t.typography.labelXsEmphasis,
        color: '#76777a',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>
        Prototype
      </span>
      <div style={{ width: 1, height: 16, background: '#3a3b3d', flexShrink: 0 }} />
      <div style={{ display: 'flex', gap: t.spacing['0_5'] }}>
        {SCENARIOS.map(({ id, label }) => {
          const active = scenario === id
          return (
            <button
              key={id}
              onClick={() => onSwitch(id)}
              style={{
                ...t.typography.md,
                fontWeight: active ? 600 : 400,
                padding: `4px ${t.spacing['1_5']}`,
                borderRadius: t.radius.md,
                border: 'none',
                background: active ? '#ffffff' : 'transparent',
                color: active ? '#1a1c1e' : '#8f9193',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
