import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'

export default function CoachPanel({ icon, title, body, primaryLabel, secondaryLabel, onPrimary, onSecondary, onDismiss, variant = 'info' }) {
  const variants = {
    info:       { accent: c.blue,       bg: c.blueLight,  iconBg: c.blueLight  },
    compliance: { accent: c.compliance, bg: c.compLight,  iconBg: c.compLight  },
    warning:    { accent: c.warn,       bg: c.amberLight, iconBg: c.amberLight },
  }
  const v = variants[variant]
  return (
    <div style={{ position: 'relative', background: c.bgPage, border: `0.5px solid ${c.borderMid}`, borderRadius: c.r10, padding: '14px 18px 13px', marginTop: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: v.accent, borderRadius: '10px 10px 0 0' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: c.r8, background: v.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 600, color: c.text, lineHeight: 1.3 }}>{title}</p>
          <p style={{ margin: 0, fontSize: 13, color: c.textMid, lineHeight: 1.55 }}>{body}</p>
        </div>
        {onDismiss && <button onClick={onDismiss} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, padding: '2px 4px', borderRadius: c.r4, flexShrink: 0 }}><I.close /></button>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 42 }}>
        {primaryLabel   && <button onClick={onPrimary}   style={{ padding: '6px 14px', borderRadius: c.r8, background: v.accent, color: 'white',        fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{primaryLabel}</button>}
        {secondaryLabel && <button onClick={onSecondary} style={{ padding: '6px 14px', borderRadius: c.r8, background: 'transparent', color: c.textSub, fontSize: 13,                border: 'none', cursor: 'pointer' }}>{secondaryLabel}</button>}
      </div>
    </div>
  )
}
