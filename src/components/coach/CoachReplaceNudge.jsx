import { theme } from '../../lib/theme.js'
import { IconWarn, IconClose } from '../ui/Icons.jsx'

const t = theme

export default function CoachReplaceNudge({ onUseReplaceWithOptions, onReplaceAnyway, onDismiss }) {
  return (
    <div style={{
      position: 'relative',
      background: t.color.surface.default,
      border: `1px solid ${t.color.ui.dividerDefault}`,
      borderRadius: t.radius.md,
      padding: `${t.spacing[2]} ${t.spacing['2_5']}`,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Blue accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: t.color.selection.primaryOnSelected,
        borderRadius: `${t.radius.md} ${t.radius.md} 0 0`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: t.spacing['1_5'] }}>
        <div style={{
          width: 30, height: 30,
          borderRadius: t.radius.md,
          background: t.color.extended.warningIconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: 2,
        }}>
          <IconWarn size={16} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, marginBottom: t.spacing['0_5'] }}>
            Use Replace with options to keep director notes
          </p>
          <p style={{ ...t.typography.body, color: t.color.type.muted, lineHeight: '20px' }}>
            This book has director annotations. Replace will swap the file and lose those notes. Replace with options preserves them and lets you notify directors what changed.
          </p>
        </div>

        <button
          onClick={onDismiss}
          style={{
            width: 24, height: 24,
            borderRadius: t.radius.md,
            background: 'transparent', border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconClose size={12} color={t.color.type.muted} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[1], marginTop: t.spacing['2_5'], paddingLeft: 46 }}>
        <button
          onClick={onUseReplaceWithOptions}
          style={{
            ...t.typography.buttonSm,
            padding: `7px ${t.spacing['1_5']}`,
            borderRadius: t.radius.md,
            background: t.color.selection.primaryOnSelected,
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Use Replace with options
        </button>
        <button
          onClick={onReplaceAnyway}
          style={{
            ...t.typography.buttonSm,
            padding: `7px ${t.spacing['1_5']}`,
            borderRadius: t.radius.md,
            background: 'transparent',
            color: t.color.type.muted,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Replace anyway
        </button>
      </div>
    </div>
  )
}
