import { c } from '../../lib/tokens.js'

export default function CommunityTopBar() {
  return (
    <div style={{ height: 52, background: c.bgPage, borderBottom: `0.5px solid ${c.border}`, display: 'flex', alignItems: 'center', paddingLeft: 20, paddingRight: 20, gap: 12, flexShrink: 0 }}>
      <div style={{ width: 28, height: 28, background: c.red, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 12 }}>D</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.blueLight, border: `1.5px solid ${c.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: c.blue }}>OS</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: c.text }}>Oceanside School District</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <path d="M3 5l4 4 4-4" stroke={c.textSub} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textSub, display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M9 6v3.5M9 11v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: c.bgSubtle, border: `0.5px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.textMid }}>JR</span>
        </div>
      </div>
    </div>
  )
}
