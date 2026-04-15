import { useState } from 'react'
import { theme } from '../lib/theme.js'

const t = theme

const IconQuestion = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
    <path d="M6.5 6.5C6.5 5.67 7.17 5 8 5s1.5.67 1.5 1.5c0 .83-.5 1.3-1 1.7-.3.23-.5.53-.5.8V10"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.8" fill={color} />
  </svg>
)

const IconChevron = ({ color, rotated }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
  >
    <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function CoachLauncher({ coachingOn, onToggle }) {
  const [open, setOpen] = useState(false)

  const iconColor = t.color.type.default
  const mutedColor = t.color.type.muted

  return (
    <div style={{ position: 'relative', padding: `0 ${t.layout.navItemLR}` }}>
      {/* Nav row */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: t.spacing[3],
          padding: t.spacing['1_5'],
          borderRadius: t.radius.lg,
          background: open ? t.color.surface.variant : 'transparent',
          cursor: 'pointer',
        }}
      >
        {/* Icon */}
        <div style={{ width: t.icon.lg, height: t.icon.lg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconQuestion color={iconColor} />
        </div>

        {/* Label */}
        <span style={{ ...t.typography.body, color: t.color.type.default, flex: 1 }}>
          Diligent Guide
        </span>

        {/* Pill + chevron group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing['0_5'], flexShrink: 0 }}>
          <span style={{
            ...t.typography.labelXsEmphasis,
            padding: '2px 6px',
            borderRadius: 20,
            background: coachingOn ? t.color.extended.successBg : t.color.status.neutralBackgroundVariant,
            color: coachingOn ? t.color.extended.successText : mutedColor,
          }}>
            {coachingOn ? 'On' : 'Off'}
          </span>
          <IconChevron color={mutedColor} rotated={open} />
        </div>
      </div>

      {/* Panel — expands upward */}
      {open && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: t.color.surface.default,
          border: `1px solid ${t.color.ui.dividerDefault}`,
          borderRadius: t.radius.lg,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          zIndex: 50,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
            borderBottom: `1px solid ${t.color.ui.dividerDefault}`,
          }}>
            <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, margin: 0, marginBottom: 2 }}>
              Diligent Guide
            </p>
            <p style={{ ...t.typography.md, color: mutedColor, margin: 0 }}>
              Turn on to see helpful tips while building your book.
            </p>
          </div>

          {/* Toggle card */}
          <div style={{ padding: `${t.spacing['1_5']} ${t.spacing[2]}` }}>
            <div style={{
              background: t.color.surface.variant,
              borderRadius: t.radius.md,
              padding: t.spacing['1_5'],
              display: 'flex',
              alignItems: 'center',
              gap: t.spacing[1],
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, margin: 0 }}>
                  Build a book
                </p>
                <p style={{ ...t.typography.md, color: mutedColor, margin: 0 }}>
                  {coachingOn ? 'Tips are active when on' : 'Tips are hidden when off'}
                </p>
              </div>

              {/* Toggle switch */}
              <div
                onClick={(e) => { e.stopPropagation(); onToggle() }}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: coachingOn ? t.color.selection.primaryOnSelected : 'transparent',
                  border: coachingOn ? 'none' : `1.5px solid ${t.color.ui.outlineDefault}`,
                  cursor: 'pointer',
                  position: 'relative',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: coachingOn ? 2 : 1,
                  left: coachingOn ? 22 : 1,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: coachingOn ? '#ffffff' : t.color.ui.dividerDefault,
                  boxShadow: coachingOn ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
                  transition: 'left 0.2s',
                }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
