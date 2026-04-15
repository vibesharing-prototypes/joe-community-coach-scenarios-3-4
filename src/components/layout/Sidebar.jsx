import { theme } from '../../lib/theme.js'
import {
  IconNavBoards,
  IconNavBooks,
  IconNavResourceCenter,
  IconNavSmartBuilder,
  IconNavDecisionHub,
  IconNavQuestionnaires,
  IconNavUser,
  IconNavSettings,
} from '../ui/Icons.jsx'
import CoachLauncher from '../CoachLauncher.jsx'

const t = theme
const NAV_ITEMS = [
  { label: 'Boards',                  Icon: IconNavBoards },
  { label: 'Books',                   Icon: IconNavBooks,         active: true },
  { label: 'Resource Center',         Icon: IconNavResourceCenter },
  { label: 'Smart Builder',           Icon: IconNavSmartBuilder },
  { label: 'Decision Hub',            Icon: IconNavDecisionHub },
  { label: 'Questionnaires',          Icon: IconNavQuestionnaires },
]
const BOTTOM_ITEMS = [
  { label: 'Boards account',          Icon: IconNavUser },
  { label: 'Application management',  Icon: IconNavSettings },
]

function NavItem({ label, Icon, active, highlighted, onClick }) {
  const iconColor = active ? t.color.selection.primaryOnSelected : t.color.type.default

  return (
    <div
      style={{ position: 'relative', padding: `0 ${t.layout.navItemLR}` }}
      onClick={onClick}
    >
      {active && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: '25%',
          height: '50%',
          width: '2px',
          background: t.color.selection.primaryIndicator,
          borderRadius: '0 2px 2px 0',
        }} />
      )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: t.spacing[3],
        padding: t.spacing['1_5'],
        borderRadius: t.radius.lg,
        background: active ? t.color.selection.primaryDefault : 'transparent',
        cursor: onClick ? 'pointer' : 'default',
      }}>
        <div style={{ width: t.icon.lg, height: t.icon.lg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={t.icon.lg} color={iconColor} />
        </div>
        <span style={{
          ...t.typography.body,
          color: active ? t.color.selection.primaryOnSelected : t.color.type.default,
          flex: 1,
        }}>
          {label}
        </span>
        {highlighted && (
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: t.color.status.newDefault,
            flexShrink: 0,
          }} />
        )}
      </div>
    </div>
  )
}

export default function Sidebar({ coachingOn, onCoachToggle }) {
  return (
    <div style={{
      width: t.layout.sidebarWidth,
      flexShrink: 0,
      background: t.color.surface.default,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRight: `1px solid ${t.color.ui.dividerDefault}`,
    }}>
      {/* Header */}
      <div style={{
        padding: t.spacing['1_5'],
        display: 'flex',
        alignItems: 'center',
        gap: t.spacing[1],
        height: t.layout.topNavHeight,
        borderBottom: `1px solid ${t.color.ui.dividerDefault}`,
        flexShrink: 0,
      }}>
        <div style={{
          width: 32,
          height: 32,
          background: '#e8363d',
          borderRadius: t.radius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '16px' }}>D</span>
        </div>
        <span style={{ ...t.typography.bodyEmphasis, color: t.color.type.default }}>Diligent</span>
      </div>

      {/* Primary nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: t.spacing['0_5'], paddingTop: t.spacing[1], overflow: 'auto' }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Divider */}
      <div style={{ height: '1px', background: t.color.ui.dividerDefault, margin: `0 ${t.spacing['1_5']}` }} />

      {/* Bottom nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: t.spacing['0_5'], paddingTop: t.spacing[1], paddingBottom: t.spacing[1] }}>
        {BOTTOM_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Coach launcher */}
      <div style={{
        paddingBottom: t.spacing[1],
      }}>
        <CoachLauncher coachingOn={coachingOn} onToggle={onCoachToggle} />
      </div>
    </div>
  )
}
