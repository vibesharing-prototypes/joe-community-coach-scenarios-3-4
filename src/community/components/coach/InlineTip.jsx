import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'

export default function InlineTip({ message, onDismiss, variant = 'info' }) {
  const colors = { info: c.blue, compliance: c.compliance }
  const bgs    = { info: c.blueLight, compliance: c.compLight }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: bgs[variant], borderLeft: `3px solid ${colors[variant]}`, borderRadius: '0 6px 6px 0', padding: '9px 12px', marginTop: 10 }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}>{variant === 'compliance' ? <I.shield /> : <I.info color={colors[variant]} />}</div>
      <p style={{ margin: 0, fontSize: 12, color: c.textMid, lineHeight: 1.5, flex: 1 }}>{message}</p>
      {onDismiss && <button onClick={onDismiss} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, padding: 0, flexShrink: 0, marginTop: 1 }}><I.close /></button>}
    </div>
  )
}
