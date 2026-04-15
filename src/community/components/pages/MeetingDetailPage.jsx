import { useState } from 'react'
import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'
import SuccessStrip from '../coach/SuccessStrip.jsx'
import InlineTip from '../coach/InlineTip.jsx'

export default function MeetingDetailPage({ meeting, isFirstTime, onBack, onEditAgenda, justPublished }) {
  const [meetingCoachDismissed, setMeetingCoachDismissed] = useState(false)
  const [successDismissed, setSuccessDismissed] = useState(false)

  return (
    <div style={{ flex: 1, overflow: 'auto', background: c.bgApp }}>
      <div style={{ padding: '20px 32px 40px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 13, color: c.textSub }}>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>Meetings</span>
          <span>›</span>
          <span style={{ color: c.textMuted }}>Upcoming</span>
          <span>›</span>
          <span style={{ color: c.text, fontWeight: 500 }}>{meeting.title}</span>
        </div>

        {/* Published success banner */}
        {justPublished && !successDismissed && (
          <div style={{ marginBottom: 18 }}>
            <SuccessStrip
              message="Agenda published — it's now visible on your public meeting page. You can still make edits and republish if needed."
              onDismiss={() => setSuccessDismissed(true)}
            />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 600, color: c.text }}>{meeting.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: c.bgSubtle, border: `0.5px solid ${c.border}`, borderRadius: 20, padding: '3px 10px', fontSize: 12, color: c.textMid }}>{meeting.type}</span>
              {justPublished
                ? <span style={{ background: c.greenLight, border: `0.5px solid ${c.greenBorder}`, borderRadius: 20, padding: '3px 10px', fontSize: 12, color: c.green }}>Published</span>
                : <span style={{ background: c.amberLight, border: `0.5px solid ${c.amberBorder}`, borderRadius: 20, padding: '3px 10px', fontSize: 12, color: c.amber }}>Draft</span>
              }
            </div>
          </div>
          <button style={{ padding: '8px 18px', background: justPublished ? c.bgSubtle : c.blue, color: justPublished ? c.textMid : 'white', border: justPublished ? `0.5px solid ${c.border}` : 'none', borderRadius: c.r8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            {justPublished ? 'Edit' : 'Publish'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          {/* Main info */}
          <div style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r12, padding: '22px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: <I.calendar />, label: 'Date and time', value: meeting.date },
                { icon: <I.location />, label: 'Location',      value: 'District office · Board room' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: c.textSub, marginTop: 1 }}>{row.icon}</span>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: 12, color: c.textSub }}>{row.label}</p>
                    <p style={{ margin: 0, fontSize: 14, color: c.text, fontWeight: 500 }}>{row.value}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: c.textSub, marginTop: 1 }}><I.agenda /></span>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: 12, color: c.textSub }}>Description</p>
                  <p style={{ margin: 0, fontSize: 13, color: c.textMid, lineHeight: 1.55 }}>The regular board meeting provides a public forum for the board of directors to conduct official business, review reports, and approve key resolutions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — Meeting content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r12, padding: '16px 18px' }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: c.text }}>Meeting visibility</p>
              <p style={{ margin: '0 0 14px', fontSize: 12, color: c.textSub }}>Publish this meeting to control its public visibility.</p>
              <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: c.text }}>Meeting content</p>

              {/* Agenda tile */}
              <div style={{ border: `0.5px solid ${c.border}`, borderRadius: c.r8, padding: '12px 14px', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, background: c.blueLight, borderRadius: c.r6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: c.blue }}><I.agenda /></span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>Agenda</span>
                  </div>
                  <button onClick={onEditAgenda} style={{ padding: '5px 14px', background: 'transparent', border: `0.5px solid ${c.borderMid}`, borderRadius: c.r6, fontSize: 12, color: c.text, cursor: 'pointer', fontWeight: 500 }}>
                    {meeting.agendaDone ? 'View' : 'Edit'}
                  </button>
                </div>

                {/* First-time coach on the agenda tile */}
                {isFirstTime && !meetingCoachDismissed && !justPublished && (
                  <div style={{ marginTop: 10 }}>
                    <InlineTip
                      message={<><strong style={{ color: c.blueDark }}>Start here.</strong> Click Edit to open the agenda builder. Your meeting template has pre-set some sections — you can add, rename, or reorder them from there.</>}
                      onDismiss={() => setMeetingCoachDismissed(true)}
                    />
                  </div>
                )}
              </div>

              {/* Minutes tile */}
              <div style={{ border: `0.5px solid ${c.border}`, borderRadius: c.r8, padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, background: c.bgSubtle, borderRadius: c.r6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: c.textSub }}><I.clock /></span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>Minutes</span>
                  </div>
                  <button style={{ padding: '5px 10px', background: 'transparent', border: `0.5px solid ${c.borderMid}`, borderRadius: c.r6, fontSize: 12, color: c.textSub, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <I.plus color={c.textSub} /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
