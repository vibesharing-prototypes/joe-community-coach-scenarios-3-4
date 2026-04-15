import { theme } from '../../lib/theme.js'
import { IconInfo, IconClose, IconCheck } from '../ui/Icons.jsx'

const t = theme

export function CoachNudge({ onCopyLink, onReEnableNotifs, onDismiss }) {
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
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: t.color.selection.primaryOnSelected,
        borderRadius: `${t.radius.md} ${t.radius.md} 0 0`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: t.spacing['1_5'] }}>
        {/* Icon badge */}
        <div style={{
          width: 30,
          height: 30,
          borderRadius: t.radius.md,
          background: t.color.selection.primaryDefault,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}>
          <IconInfo size={16} color={t.color.selection.primaryOnSelected} />
        </div>

        {/* Copy */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, marginBottom: t.spacing['0_5'] }}>
            Make this one-click for your directors
          </p>
          <p style={{ ...t.typography.body, color: t.color.type.muted, lineHeight: '20px' }}>
            You turned off Diligent notifications for this book. Send directors a direct link so they land on the right book after login.
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onDismiss}
          style={{
            width: 24,
            height: 24,
            borderRadius: t.radius.md,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconClose size={12} color={t.color.type.muted} />
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[1], marginTop: t.spacing['2_5'], paddingLeft: 46 }}>
        <button
          onClick={onCopyLink}
          style={{
            ...t.typography.buttonSm,
            padding: `7px ${t.spacing['1_5']}`,
            borderRadius: t.radius.md,
            background: t.color.selection.primaryOnSelected,
            color: t.color.status.newContentDefault,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Copy book link
        </button>
        <button
          onClick={onReEnableNotifs}
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
          Use Diligent notifications instead
        </button>
      </div>
    </div>
  )
}

export function CoachNudgeConfirm() {
  return (
    <div style={{ padding: `${t.spacing['1_5']} 0`, display: 'flex', alignItems: 'center' }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: t.spacing['0_5'],
        background: t.color.extended.successConfirmBg,
        color: t.color.extended.successText,
        borderRadius: 20,
        padding: `5px ${t.spacing['1_5']}`,
        ...t.typography.body,
        fontWeight: 600,
      }}>
        <IconCheck size={14} color={t.color.extended.successText} />
        Link copied — paste it into your email or calendar invite
      </span>
    </div>
  )
}
