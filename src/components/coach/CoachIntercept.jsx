import { theme } from '../../lib/theme.js'
import { IconWarn } from '../ui/Icons.jsx'

const t = theme

export default function CoachIntercept({ annotationCount, onUseReplace, onDeleteAnyway }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onDeleteAnyway()}
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
        padding: t.spacing[4],
        width: 400,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      }}>
        {/* Warning icon */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: t.radius.lg,
          background: t.color.extended.warningIconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: t.spacing[2],
        }}>
          <IconWarn size={20} />
        </div>

        <p style={{ ...t.typography.bodyEmphasis, fontSize: '15px', color: t.color.type.default, marginBottom: t.spacing[1] }}>
          Directors' notes will be lost if you delete this
        </p>

        <p style={{ ...t.typography.body, color: t.color.type.muted, marginBottom: t.spacing['0_5'], lineHeight: '20px' }}>
          This document already has director notes and history. Deleting it will remove:
        </p>

        <ul style={{ margin: `${t.spacing['0_5']} 0 ${t.spacing['2_5']}`, padding: 0, listStyle: 'none' }}>
          {[
            `All annotations (${annotationCount} across 3 directors)`,
            'Version history tied to this document',
          ].map((item, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: t.spacing[1],
              ...t.typography.body,
              color: t.color.type.muted,
              padding: '3px 0',
            }}>
              <span style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: t.color.extended.warningIconColor,
                marginTop: 7,
                flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>

        <p style={{ ...t.typography.body, color: t.color.type.muted, marginBottom: t.spacing['2_5'] }}>
          Use{' '}
          <strong style={{ fontWeight: 600, color: t.color.type.default }}>Replace</strong>
          {' '}instead to keep notes and tell directors what changed.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing[1] }}>
          <button
            onClick={onUseReplace}
            style={{
              ...t.typography.buttonSm,
              padding: `10px ${t.spacing[2]}`,
              borderRadius: t.radius.md,
              background: t.color.selection.primaryOnSelected,
              color: t.color.status.newContentDefault,
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Use Replace with options
          </button>
          <button
            onClick={onDeleteAnyway}
            style={{
              ...t.typography.buttonSm,
              padding: `10px ${t.spacing[2]}`,
              borderRadius: t.radius.md,
              background: 'transparent',
              color: t.color.extended.destructiveText,
              border: `1px solid ${t.color.ui.dividerDefault}`,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Delete anyway
          </button>
        </div>
      </div>
    </div>
  )
}
