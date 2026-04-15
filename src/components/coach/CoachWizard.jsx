import { useState } from 'react'
import { theme } from '../../lib/theme.js'
import { IconClose } from '../ui/Icons.jsx'
import { WIZARD_STEPS, INTENT_OPTIONS } from '../../lib/data.js'

const t = theme

function StepIndicator({ step, currentStep }) {
  const completed = step < currentStep
  const active = step === currentStep

  return (
    <div style={{
      width: 24,
      height: 24,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: completed
        ? t.color.selection.primaryOnSelected
        : active
          ? t.color.selection.primaryDefault
          : t.color.status.neutralBackgroundVariant,
      color: completed
        ? '#ffffff'
        : active
          ? t.color.selection.primaryOnSelected
          : t.color.type.muted,
      border: active ? `2px solid ${t.color.selection.primaryIndicator}` : 'none',
      ...t.typography.labelXsEmphasis,
    }}>
      {completed ? '✓' : step + 1}
    </div>
  )
}

// Step 1: Intent
function StepIntent({ selectedIntent, onSelect }) {
  return (
    <div>
      <p style={{ ...t.typography.bodyEmphasis, fontSize: '15px', color: t.color.type.default, marginBottom: t.spacing['0_5'] }}>
        What do you want this workflow to do?
      </p>
      <p style={{ ...t.typography.body, color: t.color.type.muted, marginBottom: t.spacing['2_5'] }}>
        We'll set up a working starting point you can adjust.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing[1] }}>
        {INTENT_OPTIONS.map((opt, i) => {
          const active = i === selectedIntent
          return (
            <div
              key={i}
              onClick={() => onSelect(i)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: t.spacing['1_5'],
                padding: `11px ${t.spacing['1_5']}`,
                border: active
                  ? `2px solid ${t.color.selection.primaryIndicator}`
                  : `1px solid ${t.color.ui.dividerDefault}`,
                borderRadius: t.radius.md,
                cursor: 'pointer',
                background: active ? t.color.selection.primaryDefault : t.color.surface.default,
              }}
            >
              {/* Radio */}
              <div style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: `2px solid ${active ? t.color.selection.primaryIndicator : t.color.ui.outlineDefault}`,
                background: active ? t.color.selection.primaryOnSelected : t.color.surface.default,
                marginTop: 2,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff' }} />}
              </div>
              <span style={{ ...t.typography.body, color: t.color.type.default, lineHeight: '20px' }}>{opt}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Step 2: Review
function StepReview() {
  const items = [
    'Request papers from Finance Committee',
    'Default deadline: 14 days before the meeting',
    'Folder naming: [Meeting name] – [Date] – Papers',
    'Notify participants when request is sent',
  ]
  return (
    <div>
      <p style={{ ...t.typography.bodyEmphasis, fontSize: '15px', color: t.color.type.default, marginBottom: t.spacing['0_5'] }}>
        Here's how we'll set this up
      </p>
      <p style={{ ...t.typography.body, color: t.color.type.muted, marginBottom: t.spacing['2_5'] }}>
        Based on your goal — you can adjust any of these.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing['1_5'], marginBottom: t.spacing[2] }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: t.spacing['1_5'] }}>
            <div style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: t.color.selection.primaryOnSelected,
              flexShrink: 0,
              marginTop: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ ...t.typography.body, color: t.color.type.default, lineHeight: '20px' }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{
        background: t.color.surface.variant,
        borderLeft: `3px solid ${t.color.selection.primaryOnSelected}`,
        borderRadius: `0 ${t.radius.md} ${t.radius.md} 0`,
        padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
      }}>
        <p style={{ ...t.typography.body, color: t.color.type.muted, margin: 0 }}>
          You can adjust these details after setup. This gets you to a working starting point.
        </p>
      </div>
    </div>
  )
}

// Step 3: Configure
function StepConfigure() {
  return (
    <div>
      <p style={{ ...t.typography.bodyEmphasis, fontSize: '15px', color: t.color.type.default, marginBottom: t.spacing['0_5'] }}>
        Configure your workflow
      </p>
      <p style={{ ...t.typography.body, color: t.color.type.muted, marginBottom: t.spacing['2_5'] }}>
        We've pre-filled the most common settings. Highlighted fields need your attention.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing['1_5'] }}>
        {/* Workflow name — pre-filled */}
        <div style={{
          padding: `11px ${t.spacing['1_5']}`,
          border: `1px solid ${t.color.ui.dividerDefault}`,
          borderRadius: t.radius.md,
        }}>
          <div style={{ ...t.typography.labelXsEmphasis, color: t.color.type.muted, textTransform: 'uppercase', marginBottom: t.spacing['0_5'] }}>
            Workflow name
          </div>
          <div style={{ ...t.typography.body, color: t.color.type.default }}>Q3 Board Meeting Papers</div>
        </div>

        {/* Participant group — required */}
        <div style={{
          padding: `11px ${t.spacing['1_5']}`,
          border: `2px solid ${t.color.selection.primaryIndicator}`,
          borderRadius: t.radius.md,
          background: t.color.selection.primaryDefault,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: t.spacing['0_5'],
            ...t.typography.labelXsEmphasis,
            color: t.color.selection.primaryOnSelected,
            textTransform: 'uppercase',
            marginBottom: t.spacing['0_5'],
          }}>
            Participant group
            <span style={{
              background: t.color.selection.primaryOnSelected,
              color: '#ffffff',
              padding: `1px ${t.spacing['0_5']}`,
              borderRadius: 10,
              ...t.typography.numberSmEmphasis,
            }}>
              Required
            </span>
          </div>
          <div style={{ ...t.typography.body, color: t.color.type.muted }}>Not set — add at least one group</div>
        </div>

        {/* Deadline offset — pre-filled */}
        <div style={{
          padding: `11px ${t.spacing['1_5']}`,
          border: `1px solid ${t.color.ui.dividerDefault}`,
          borderRadius: t.radius.md,
        }}>
          <div style={{ ...t.typography.labelXsEmphasis, color: t.color.type.muted, textTransform: 'uppercase', marginBottom: t.spacing['0_5'] }}>
            Deadline offset
          </div>
          <div style={{ ...t.typography.body, color: t.color.type.default }}>
            14 days before the meeting{' '}
            <span style={{ ...t.typography.md, color: t.color.type.muted }}>· Most teams use 14–21 days</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4: Confirm
function StepConfirm() {
  const rows = [
    ['Participants',    'Finance Committee'],
    ['Default deadline','14 days before meeting'],
    ['Notifications',  'On'],
    ['Workflow name',  'Q3 Board Meeting Papers'],
  ]
  return (
    <div>
      <p style={{ ...t.typography.bodyEmphasis, fontSize: '15px', color: t.color.type.default, marginBottom: t.spacing['2_5'] }}>
        Quick check before we turn this on
      </p>
      {rows.map(([k, v], i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: `${t.spacing['1_5']} 0`,
          borderBottom: `1px solid ${t.color.surface.variant}`,
          ...t.typography.body,
        }}>
          <span style={{ color: t.color.type.muted }}>{k}</span>
          <span style={{ color: t.color.type.default, fontWeight: 600 }}>{v}</span>
        </div>
      ))}
      <div style={{
        background: t.color.surface.variant,
        borderLeft: `3px solid ${t.color.selection.primaryOnSelected}`,
        borderRadius: `0 ${t.radius.md} ${t.radius.md} 0`,
        padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
        marginTop: t.spacing[2],
      }}>
        <p style={{ ...t.typography.body, color: t.color.type.muted, margin: 0 }}>
          Everything looks good. You can adjust these settings anytime after saving.
        </p>
      </div>
    </div>
  )
}

const STEP_CONTENT = [StepIntent, StepReview, StepConfigure, StepConfirm]

export default function CoachWizard({ onClose, onSave }) {
  const [step, setStep] = useState(0)
  const [selectedIntent, setSelectedIntent] = useState(0)

  const isLast = step === WIZARD_STEPS.length - 1
  const StepComponent = STEP_CONTENT[step]

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{
        background: t.color.surface.default,
        borderRadius: t.radius.lg,
        width: 480,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Step bar */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${t.color.ui.dividerDefault}` }}>
          {WIZARD_STEPS.map((label, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: t.spacing[1],
                padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
                borderRight: i < WIZARD_STEPS.length - 1 ? `1px solid ${t.color.ui.dividerDefault}` : 'none',
              }}
            >
              <StepIndicator step={i} currentStep={step} />
              <span style={{
                ...t.typography.md,
                color: i === step ? t.color.type.default : t.color.type.muted,
                fontWeight: i === step ? 600 : 400,
              }}>
                {label}
              </span>
            </div>
          ))}

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              background: 'transparent',
              border: 'none',
              borderLeft: `1px solid ${t.color.ui.dividerDefault}`,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <IconClose size={12} color={t.color.type.muted} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: t.spacing['2_5'] }}>
          {step === 0
            ? <StepComponent selectedIntent={selectedIntent} onSelect={setSelectedIntent} />
            : <StepComponent />
          }
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `${t.spacing['1_5']} ${t.spacing['2_5']}`,
          borderTop: `1px solid ${t.color.ui.dividerDefault}`,
        }}>
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{
              ...t.typography.buttonSm,
              padding: `8px ${t.spacing[2]}`,
              borderRadius: t.radius.md,
              background: 'transparent',
              color: t.color.type.muted,
              border: `1px solid ${t.color.ui.dividerDefault}`,
              cursor: 'pointer',
              visibility: step > 0 ? 'visible' : 'hidden',
            }}
          >
            Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing['1_5'] }}>
            <span style={{ ...t.typography.md, color: t.color.type.muted }}>
              Step {step + 1} of {WIZARD_STEPS.length}
            </span>
            <button
              onClick={() => isLast ? onSave() : setStep((s) => s + 1)}
              style={{
                ...t.typography.buttonSm,
                padding: `8px ${t.spacing[2]}`,
                borderRadius: t.radius.md,
                background: t.color.selection.primaryOnSelected,
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isLast ? 'Save workflow' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
