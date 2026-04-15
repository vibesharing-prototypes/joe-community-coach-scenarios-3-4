import { useState } from 'react'
import { theme } from '../lib/theme.js'
import { IconClose } from './ui/Icons.jsx'

const t = theme

const STEPS = [
  {
    title: 'A Book is your digital board pack',
    body: 'A Book holds the documents, reports, and materials your directors review before a meeting. Once published, directors access it directly from their device.',
  },
  {
    title: 'A Book has three layers',
    body: 'Start with tabs (Agenda, Reports, Minutes). Add subtabs inside each for finer sections. Then load documents into each tab. You control who sees what at every level.',
  },
  {
    title: 'Approve before you publish',
    body: 'Once documents are loaded, use Review Book to approve each one. Directors only see approved content — it prevents incomplete books going out.',
  },
  {
    title: 'Publish and notify directors',
    body: 'Choose how to notify them: email, push notification, or Messenger. You can customize the message and recipient list before sending.',
  },
]

export default function OrientationPanel({ onDismiss, onCreateBook }) {
  const [step, setStep] = useState(0)
  const isLast = step === STEPS.length - 1
  const current = STEPS[step]

  return (
    <div style={{
      position: 'relative',
      background: t.color.surface.default,
      border: `1px solid ${t.color.ui.dividerDefault}`,
      borderRadius: t.radius.md,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      {/* Blue accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: t.color.selection.primaryOnSelected,
      }} />

      {/* Progress segments */}
      <div style={{
        display: 'flex',
        gap: 4,
        padding: `calc(${t.spacing['2_5']} + 3px) ${t.spacing['2_5']} 0`,
      }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i <= step ? t.color.selection.primaryOnSelected : t.color.ui.dividerDefault,
            transition: 'background 0.2s',
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: `${t.spacing[2]} ${t.spacing['2_5']}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: t.spacing[1] }}>
          <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, margin: 0 }}>
            {current.title}
          </p>
          <button
            onClick={onDismiss}
            style={{
              width: 24, height: 24,
              borderRadius: t.radius.md,
              background: 'transparent', border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginLeft: t.spacing[1],
            }}
          >
            <IconClose size={12} color={t.color.type.muted} />
          </button>
        </div>
        <p style={{ ...t.typography.body, color: t.color.type.muted, margin: 0, lineHeight: '20px' }}>
          {current.body}
        </p>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${t.spacing['1_5']} ${t.spacing['2_5']} ${t.spacing[2]}`,
        borderTop: `1px solid ${t.color.ui.dividerDefault}`,
      }}>
        <span style={{ ...t.typography.md, color: t.color.type.muted }}>
          {step + 1} of {STEPS.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[1] }}>
          {!isLast && (
            <button
              onClick={onDismiss}
              style={{
                ...t.typography.buttonSm,
                padding: `7px ${t.spacing['1_5']}`,
                background: 'transparent',
                color: t.color.type.muted,
                border: 'none',
                cursor: 'pointer',
                borderRadius: t.radius.md,
              }}
            >
              Skip
            </button>
          )}
          <button
            onClick={isLast ? onCreateBook : () => setStep(s => s + 1)}
            style={{
              ...t.typography.buttonSm,
              padding: `7px ${t.spacing['1_5']}`,
              background: t.color.selection.primaryOnSelected,
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: t.radius.md,
            }}
          >
            {isLast ? 'Create my first book →' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
