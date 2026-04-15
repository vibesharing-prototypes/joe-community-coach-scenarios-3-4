import { theme } from '../../lib/theme.js'
import {
  IconOrgGrid,
  IconChevronDown,
  IconExternalLink,
  IconKeyboard,
  IconHelpCircle,
  IconUserCircle,
} from '../ui/Icons.jsx'

const t = theme

export default function TopNav({ extraCrumb, onBooksClick }) {
  return (
    <div style={{
      height: t.layout.topNavHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${t.layout.contentMarginH}`,
      background: t.color.surface.default,
      borderBottom: `1px solid ${t.color.ui.dividerDefault}`,
      flexShrink: 0,
    }}>

      {/* Left side — breadcrumb in create mode, org name otherwise */}
      {extraCrumb ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[1] }}>
          <span style={{ ...t.typography.body, color: t.color.type.muted }}>Boards</span>
          <span style={{ ...t.typography.body, color: t.color.ui.dividerDefault }}>/</span>
          <button
            onClick={onBooksClick}
            style={{ ...t.typography.body, color: t.color.type.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Books
          </button>
          <span style={{ ...t.typography.body, color: t.color.ui.dividerDefault }}>/</span>
          <span style={{ ...t.typography.bodyEmphasis, color: t.color.type.default }}>{extraCrumb}</span>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing['1_5'], cursor: 'pointer' }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: t.radius.md,
            background: '#fce8e8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <IconOrgGrid size={18} color="#e8363d" />
          </div>
          <span style={{ ...t.typography.bodyEmphasis, color: t.color.type.default }}>
            {'{Organization name}'}
          </span>
          <IconChevronDown size={14} color={t.color.type.muted} />
        </div>
      )}

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[2] }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: t.spacing['0_5'],
          background: 'transparent', border: 'none', cursor: 'pointer',
          ...t.typography.body, color: t.color.type.default,
          padding: 0,
        }}>
          Open administrator view
          <IconExternalLink size={12} color={t.color.type.default} />
        </button>

        <button style={iconBtn}>
          <IconKeyboard size={18} color={t.color.type.muted} />
        </button>

        <button style={iconBtn}>
          <IconHelpCircle size={18} color={t.color.type.muted} />
        </button>

        {/* User avatar with notification badge */}
        <div style={{ position: 'relative' }}>
          <button style={iconBtn}>
            <IconUserCircle size={22} color={t.color.type.muted} />
          </button>
          <div style={{
            position: 'absolute',
            top: -3, right: -3,
            width: 16, height: 16,
            borderRadius: '50%',
            background: t.color.status.newDefault,
            border: `2px solid ${t.color.surface.default}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ ...t.typography.numberSmEmphasis, color: '#ffffff', lineHeight: 1 }}>5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const iconBtn = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.radius.md,
}
