import { useState } from 'react'
import { theme } from '../lib/theme.js'
import { IconClose, IconInfo } from './ui/Icons.jsx'

const t = theme

const COMMITTEES = [
  { id: 'audit',   label: 'Audit Committee' },
  { id: 'finance', label: 'Finance Committee' },
  { id: 'full',    label: 'Full Board' },
]

export default function CreateBookPage({ scenario, coachingOn, onCancel, onCreate }) {
  const [title, setTitle]         = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]     = useState('')
  const [canPrint, setCanPrint]   = useState(true)
  const [includeConf, setIncludeConf] = useState(false)
  const [agendaType, setAgendaType]   = useState('auto')
  const [committees, setCommittees]   = useState({ audit: true, finance: false, full: false })
  const [accessLevels, setAccessLevels] = useState({ audit: 'Admin can edit' })
  const [titleError, setTitleError] = useState(false)
  const [tipTitleDismissed, setTipTitleDismissed]         = useState(false)
  const [tipCommitteeDismissed, setTipCommitteeDismissed] = useState(false)

  const isScenario1 = scenario === 'scenario1' && coachingOn !== false

  const handleContinue = () => {
    if (!title.trim()) { setTitleError(true); return }
    onCreate({ title: title.trim() })
  }

  const toggleCommittee = (id) => {
    setCommittees(prev => {
      const next = { ...prev, [id]: !prev[id] }
      if (!next[id]) {
        setAccessLevels(al => { const n = { ...al }; delete n[id]; return n })
      } else {
        setAccessLevels(al => ({ ...al, [id]: 'View only' }))
      }
      return next
    })
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      borderTopLeftRadius: t.radius.mainTopLeft,
      background: `radial-gradient(circle at top left, ${t.color.background.gradientStart}, ${t.color.background.gradientEnd})`,
    }}>
      {/* Scrollable area */}
      <div style={{ flex: 1, overflow: 'auto', padding: `${t.spacing['1_5']} ${t.layout.contentMarginH} 100px` }}>

        {/* Page header */}
        <div style={{ paddingTop: t.spacing['1_5'], marginBottom: t.spacing[3] }}>
          <h1 style={{ ...t.typography.h1Billboard, color: t.color.type.default, marginBottom: t.spacing['0_5'] }}>
            Create book
          </h1>
          <p style={{ ...t.typography.body, color: t.color.type.muted, margin: 0 }}>
            Add book properties, including meeting dates and other important details.
          </p>
        </div>

        <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: t.spacing[2] }}>

          {/* ── Card 1: Book details ── */}
          <Card>
            <SectionLabel>Book details</SectionLabel>

            <Field label="Book title" required>
              <input
                value={title}
                onChange={e => { setTitle(e.target.value); setTitleError(false) }}
                placeholder="e.g. Q3 2026 Audit Pack"
                style={inputStyle(titleError)}
              />
              {titleError && (
                <span style={{ ...t.typography.md, color: t.color.extended.destructiveText, marginTop: 2 }}>
                  Book title is required
                </span>
              )}
              {isScenario1 && !tipTitleDismissed && (
                <CoachTip onDismiss={() => setTipTitleDismissed(true)}>
                  <strong>Tip:</strong> Use a specific title like "Q3 2026 Audit Pack" rather than "Board Meeting" — directors often have access to multiple books and need to find the right one quickly.
                </CoachTip>
              )}
            </Field>

            <div style={{ display: 'flex', gap: t.spacing[2] }}>
              <Field label="Start date of meeting" required style={{ flex: 1 }}>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle()} />
              </Field>
              <Field label="End date of meeting" required style={{ flex: 1 }}>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle()} />
              </Field>
            </div>

            <ToggleRow label="Allow book to be printed or exported" checked={canPrint} onChange={() => setCanPrint(v => !v)} />
            <ToggleRow label="Include remote conference details" checked={includeConf} onChange={() => setIncludeConf(v => !v)} />

            <div style={{ marginTop: t.spacing[1] }}>
              <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, marginBottom: t.spacing[1] }}>
                Agenda type
              </p>
              <RadioOption
                label="Auto agenda"
                description="Agenda is generated automatically based on your tabs and documents."
                checked={agendaType === 'auto'}
                onChange={() => setAgendaType('auto')}
              />
              <RadioOption
                label="Upload agenda manually"
                description="Upload a PDF or document as the agenda. You manage all updates."
                checked={agendaType === 'manual'}
                onChange={() => setAgendaType('manual')}
              />
            </div>
          </Card>

          {/* ── Card 2: Committee access ── */}
          <Card>
            <SectionLabel>Committee access</SectionLabel>

            {isScenario1 && !tipCommitteeDismissed && (
              <CoachTip onDismiss={() => setTipCommitteeDismissed(true)}>
                <strong>Required:</strong> At least one committee must be set to "Admin can edit" so you can make changes after the book is created.
              </CoachTip>
            )}

            {COMMITTEES.map(({ id, label }) => (
              <div key={id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${t.spacing['1_5']} 0`,
                borderBottom: `1px solid ${t.color.ui.dividerDefault}`,
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: t.spacing['1_5'], cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!!committees[id]}
                    onChange={() => toggleCommittee(id)}
                    style={{ width: 16, height: 16, accentColor: t.color.selection.primaryOnSelected, cursor: 'pointer' }}
                  />
                  <span style={{ ...t.typography.body, color: t.color.type.default }}>{label}</span>
                </label>
                {committees[id] && (
                  <select
                    value={accessLevels[id] || 'View only'}
                    onChange={e => setAccessLevels(al => ({ ...al, [id]: e.target.value }))}
                    style={{
                      ...t.typography.md,
                      padding: `4px ${t.spacing[1]}`,
                      border: `1px solid ${t.color.ui.dividerDefault}`,
                      borderRadius: t.radius.md,
                      background: t.color.surface.default,
                      color: t.color.type.default,
                      cursor: 'pointer',
                    }}
                  >
                    <option>Admin can edit</option>
                    <option>View only</option>
                    <option>No access</option>
                  </select>
                )}
              </div>
            ))}
          </Card>

          {/* ── Card 3: User access ── */}
          <Card>
            <SectionLabel>User access</SectionLabel>
            <p style={{ ...t.typography.body, color: t.color.type.muted, margin: 0 }}>
              Add specific users to grant or restrict access beyond committee settings.
            </p>
            <div>
              <button style={{
                ...t.typography.buttonSm,
                padding: `7px ${t.spacing['1_5']}`,
                background: 'transparent',
                color: t.color.selection.primaryOnSelected,
                border: `1px solid ${t.color.selection.primaryOnSelected}`,
                borderRadius: t.radius.md,
                cursor: 'pointer',
              }}>
                + Add specific users
              </button>
            </div>
          </Card>

        </div>
      </div>

      {/* Fixed footer */}
      <div style={{
        position: 'fixed',
        bottom: 0, right: 0,
        left: t.layout.sidebarWidth,
        background: t.color.surface.default,
        borderTop: `1px solid ${t.color.ui.dividerDefault}`,
        padding: `${t.spacing[2]} ${t.layout.contentMarginH}`,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: t.spacing[1],
        zIndex: 100,
      }}>
        <button
          onClick={onCancel}
          style={{
            ...t.typography.buttonSm,
            padding: `9px ${t.spacing[2]}`,
            background: 'transparent',
            color: t.color.type.muted,
            border: `1px solid ${t.color.ui.dividerDefault}`,
            borderRadius: t.radius.md,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          style={{
            ...t.typography.buttonSm,
            padding: `9px ${t.spacing[2]}`,
            background: t.color.selection.primaryOnSelected,
            color: '#ffffff',
            border: 'none',
            borderRadius: t.radius.md,
            cursor: 'pointer',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Card({ children }) {
  return (
    <div style={{
      background: t.color.surface.default,
      border: `1px solid ${t.color.ui.dividerDefault}`,
      borderRadius: t.radius.lg,
      padding: t.spacing[3],
      display: 'flex',
      flexDirection: 'column',
      gap: t.spacing['1_5'],
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, margin: 0 }}>{children}</p>
}

function Field({ label, required, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing['0_5'], ...style }}>
      <label style={{ ...t.typography.mdEmphasis, color: t.color.type.default }}>
        {label}
        {required && <span style={{ color: t.color.extended.destructiveText }}> *</span>}
      </label>
      {children}
    </div>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${t.spacing['1_5']} 0`,
      borderBottom: `1px solid ${t.color.ui.dividerDefault}`,
    }}>
      <span style={{ ...t.typography.body, color: t.color.type.default }}>{label}</span>
      <button
        onClick={onChange}
        style={{
          width: 36, height: 20,
          borderRadius: 10,
          border: 'none',
          cursor: 'pointer',
          background: checked ? t.color.selection.primaryOnSelected : t.color.ui.dividerDefault,
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: 16, height: 16,
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: 2,
          left: checked ? 18 : 2,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
    </div>
  )
}

function RadioOption({ label, description, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: t.spacing['1_5'],
        padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
        border: `1px solid ${checked ? t.color.selection.primaryOnSelected : t.color.ui.dividerDefault}`,
        borderRadius: t.radius.md,
        cursor: 'pointer',
        background: checked ? t.color.selection.primaryDefault : t.color.surface.default,
        marginBottom: t.spacing[1],
        transition: 'background 0.15s',
      }}
    >
      <div style={{
        width: 16, height: 16,
        borderRadius: '50%',
        border: `1.5px solid ${checked ? t.color.selection.primaryOnSelected : t.color.ui.outlineDefault}`,
        background: checked ? t.color.selection.primaryOnSelected : t.color.surface.default,
        marginTop: 2, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
      </div>
      <div>
        <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, margin: 0 }}>{label}</p>
        <p style={{ ...t.typography.md, color: t.color.type.muted, margin: `2px 0 0` }}>{description}</p>
      </div>
    </div>
  )
}

function CoachTip({ children, onDismiss }) {
  return (
    <div style={{
      background: t.color.selection.primaryDefault,
      border: `1px solid ${t.color.selection.primaryOnSelected}33`,
      borderRadius: t.radius.md,
      padding: `${t.spacing[1]} ${t.spacing['1_5']}`,
      display: 'flex',
      alignItems: 'flex-start',
      gap: t.spacing[1],
    }}>
      <IconInfo size={14} color={t.color.selection.primaryOnSelected} />
      <p style={{ ...t.typography.md, color: t.color.type.default, margin: 0, flex: 1, lineHeight: '18px' }}>
        {children}
      </p>
      <button
        onClick={onDismiss}
        style={{
          width: 20, height: 20,
          border: 'none', background: 'transparent',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <IconClose size={10} color={t.color.type.muted} />
      </button>
    </div>
  )
}

function inputStyle(error) {
  return {
    width: '100%',
    height: t.input.height,
    padding: `0 ${t.spacing['1_5']}`,
    border: `1px solid ${error ? t.color.extended.destructiveText : t.color.ui.dividerDefault}`,
    borderRadius: t.radius.md,
    ...t.typography.body,
    fontFamily: t.typography.fontFamily,
    color: t.color.type.default,
    background: t.color.surface.default,
    outline: 'none',
    boxSizing: 'border-box',
  }
}
