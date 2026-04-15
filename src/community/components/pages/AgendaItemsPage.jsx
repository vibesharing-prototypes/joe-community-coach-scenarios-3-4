import { useState } from 'react'
import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'

export default function AgendaItemsPage({ isFirstTime, onNavigateToMeetings }) {
  const [redirectCoachDismissed, setRedirectCoachDismissed] = useState(false)

  return (
    <div style={{ flex: 1, overflow: 'auto', background: c.bgApp }}>
      <div style={{ padding: '28px 32px' }}>
        <h1 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 600, color: c.text }}>Agenda items</h1>

        {/* First-time redirect coach — only Scenario 3 */}
        {isFirstTime && !redirectCoachDismissed && (
          <div style={{ background: c.bgPage, border: `0.5px solid ${c.borderMid}`, borderRadius: c.r10, padding: '16px 18px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c.blue, borderRadius: '10px 10px 0 0' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: c.r8, background: c.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <I.info color={c.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 600, color: c.text }}>Agenda items are saved, reusable building blocks</p>
                <p style={{ margin: '0 0 12px', fontSize: 13, color: c.textMid, lineHeight: 1.55 }}>
                  Items here are standing content you can use across many meetings — like recurring reports or standard motions. To build or edit a specific meeting's agenda, go to <strong>Meetings</strong>, open the meeting you're preparing for, and click Edit on the Agenda tile.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={onNavigateToMeetings} style={{ padding: '6px 14px', borderRadius: c.r8, background: c.blue, color: 'white', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer' }}>Go to Meetings</button>
                  <button onClick={() => setRedirectCoachDismissed(true)} style={{ padding: '6px 12px', borderRadius: c.r8, background: 'transparent', color: c.textSub, fontSize: 13, border: 'none', cursor: 'pointer' }}>I'm in the right place</button>
                </div>
              </div>
              <button onClick={() => setRedirectCoachDismissed(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, padding: '2px 4px' }}><I.close /></button>
            </div>
          </div>
        )}

        {/* Empty state */}
        <div style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r12, padding: '56px 24px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, background: c.bgSubtle, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <span style={{ color: c.textMuted, display: 'flex' }}><I.items /></span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: c.text, margin: '0 0 6px' }}>No agenda items yet</p>
          <p style={{ fontSize: 13, color: c.textSub, margin: '0 0 20px', maxWidth: 340, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>This section is ready for content when you are.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <button style={{ padding: '8px 18px', background: c.blue, color: 'white', border: 'none', borderRadius: c.r8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Add agenda items</button>
            <button style={{ padding: '8px 18px', background: 'transparent', color: c.text, border: `0.5px solid ${c.borderMid}`, borderRadius: c.r8, fontSize: 13, cursor: 'pointer' }}>Learn more</button>
          </div>
        </div>
      </div>
    </div>
  )
}
