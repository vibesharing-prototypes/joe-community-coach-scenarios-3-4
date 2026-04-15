import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'
import CoachLauncher from './CoachLauncher.jsx'

export default function CommunitySidebar({ activePage, onNavigate, coachingOn, onCoachToggle }) {
  const navItems = [
    { id: 'home',     label: 'Home',         icon: <I.home /> },
    { id: 'meetings', label: 'Meetings',     icon: <I.meetings /> },
    { id: 'agenda',   label: 'Agenda items', icon: <I.items /> },
    { id: 'policies', label: 'Policies',     icon: <I.policy /> },
    { id: 'library',  label: 'Library',      icon: <I.library /> },
  ]
  const bottomItems = [
    { id: 'settings', label: 'Settings',    icon: <I.settings /> },
    { id: 'public',   label: 'Public site', icon: <I.globe />, external: true },
  ]
  return (
    <div style={{ width: 220, background: c.bgPage, borderRight: `0.5px solid ${c.border}`, display: 'flex', flexDirection: 'column', height: '100%', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `0.5px solid ${c.border}` }}>
        <div style={{ width: 28, height: 28, background: c.red, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>D</span>
        </div>
        <span style={{ fontWeight: 600, fontSize: 13, color: c.text }}>Community</span>
      </div>
      {/* Nav */}
      <div style={{ flex: 1, padding: '8px 8px 0' }}>
        {navItems.map(item => {
          const isActive = activePage === item.id
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: c.r8, marginBottom: 2, background: isActive ? c.blueLight : 'transparent', cursor: 'pointer', transition: 'background .1s' }}
            >
              <span style={{ color: isActive ? c.blue : c.textSub, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: isActive ? c.blue : c.textMid, fontWeight: isActive ? 500 : 400 }}>{item.label}</span>
            </div>
          )
        })}
      </div>
      {/* Bottom nav — Settings, Public site, then Coaching always last */}
      <div style={{ padding: '8px 8px 12px', borderTop: `0.5px solid ${c.border}` }}>
        {bottomItems.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: c.r8, marginBottom: 2, cursor: 'pointer' }}>
            <span style={{ color: c.textSub, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: c.textMid }}>{item.label}</span>
            {item.external && <span style={{ marginLeft: 'auto', color: c.textMuted }}><I.external /></span>}
          </div>
        ))}
        {/* Diligent Guide — always present, persists across all pages */}
        <div style={{ marginTop: 4 }}>
          <CoachLauncher coachingOn={coachingOn} onToggle={onCoachToggle} />
        </div>
      </div>
    </div>
  )
}
