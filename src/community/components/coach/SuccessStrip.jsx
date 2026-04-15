import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'

export default function SuccessStrip({ message, onDismiss }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.greenLight, border: `0.5px solid ${c.greenBorder}`, borderRadius: c.r8, padding: '9px 14px', marginTop: 10 }}>
      <I.check color={c.green} size={15} />
      <span style={{ fontSize: 13, color: c.green, flex: 1 }}>{message}</span>
      {onDismiss && <button onClick={onDismiss} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.green, padding: 2 }}><I.close /></button>}
    </div>
  )
}
