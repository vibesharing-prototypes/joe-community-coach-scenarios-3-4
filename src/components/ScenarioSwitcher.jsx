import { theme } from '../lib/theme.js'

const t = theme

export default function ScenarioSwitcher({ scenario, onSwitch }) {
  const scenarios = [
    { id: 'scenario1', label: 'Scenario 1' },
    { id: 'scenario2', label: 'Scenario 2' },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing['0_5'], flexShrink: 0 }}>
      {scenarios.map(({ id, label }) => {
        const active = scenario === id
        return (
          <button
            key={id}
            onClick={() => onSwitch(id)}
            style={{
              ...t.typography.mdEmphasis,
              padding: `3px ${t.spacing['1_5']}`,
              borderRadius: t.radius.md,
              border: `1px solid ${active ? '#92400e' : '#d97706'}`,
              background: active ? '#92400e' : 'transparent',
              color: active ? '#fffbeb' : '#92400e',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
