import { c } from '../../lib/tokens.js'

export default function ComplianceModal({ icon, title, body, consequences, primaryLabel, escapeLabel, onPrimary, onEscape }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
      onClick={e => e.target === e.currentTarget && onEscape()}
    >
      <div style={{ background: c.bgPage, borderRadius: c.r12, padding: '22px 24px', width: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <div style={{ width: 38, height: 38, borderRadius: c.r10, background: c.compLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{icon}</div>
        <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: c.text, lineHeight: 1.3 }}>{title}</p>
        <p style={{ margin: '0 0 10px', fontSize: 13, color: c.textMid, lineHeight: 1.55 }}>{body}</p>
        {consequences?.length > 0 && (
          <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
            {consequences.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: c.textMid, padding: '3px 0' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.compliance, marginTop: 6, flexShrink: 0 }} />{item}
              </li>
            ))}
          </ul>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={onPrimary} style={{ padding: '10px 16px', borderRadius: c.r8, background: c.blue, color: 'white', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer' }}>{primaryLabel}</button>
          <button onClick={onEscape}  style={{ padding: '10px 16px', borderRadius: c.r8, background: 'transparent', color: c.danger, fontSize: 13, fontWeight: 500, border: `0.5px solid ${c.borderMid}`, cursor: 'pointer' }}>{escapeLabel}</button>
        </div>
      </div>
    </div>
  )
}
