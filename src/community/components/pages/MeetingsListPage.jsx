import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'
import { MEETINGS } from '../../lib/data.js'

export default function MeetingsListPage({ onSelectMeeting }) {
  const upcoming = MEETINGS.filter(m => m.status === 'upcoming')
  const recent   = MEETINGS.filter(m => m.status === 'recent')

  const MeetingCard = ({ meeting, compact }) => (
    <div
      onClick={() => onSelectMeeting(meeting)}
      style={{ background: compact ? 'transparent' : c.bgPage, border: compact ? 'none' : `0.5px solid ${c.border}`, borderRadius: compact ? 0 : c.r10, padding: compact ? '12px 0' : '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', borderBottom: compact ? `0.5px solid ${c.border}` : 'none' }}
    >
      <div style={{ width: 44, height: 44, background: c.blueLight, borderRadius: c.r8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: c.blue, textTransform: 'uppercase', lineHeight: 1 }}>{meeting.date.split(' ')[0]}</span>
        <span style={{ fontSize: 17, fontWeight: 700, color: c.blue, lineHeight: 1.1 }}>{meeting.date.split(' ')[1]?.replace(',', '')}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 500, color: c.text }}>{meeting.title}</p>
        <p style={{ margin: 0, fontSize: 12, color: c.textSub }}>{meeting.date} · {meeting.type}</p>
      </div>
      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, padding: '4px' }}><I.dots /></button>
    </div>
  )

  return (
    <div style={{ flex: 1, overflow: 'auto', background: c.bgApp }}>
      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: c.text }}>Meetings</h1>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: c.blue, color: 'white', border: 'none', borderRadius: c.r8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <I.plus color="white" /> New meeting
          </button>
        </div>

        {/* Upcoming */}
        <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, color: c.textMuted, letterSpacing: '.06em', textTransform: 'uppercase' }}>Upcoming</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {upcoming.map(m => <MeetingCard key={m.id} meeting={m} />)}
        </div>

        {/* Recent */}
        <p style={{ margin: '0 0 0', fontSize: 11, fontWeight: 600, color: c.textMuted, letterSpacing: '.06em', textTransform: 'uppercase' }}>Recent</p>
        <div style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r10, overflow: 'hidden', marginTop: 10 }}>
          {recent.map(m => <MeetingCard key={m.id} meeting={m} compact />)}
        </div>
      </div>
    </div>
  )
}
