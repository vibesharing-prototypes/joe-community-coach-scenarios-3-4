import { useState } from 'react'
import { c } from '../../lib/tokens.js'

export default function CoachLauncher({ coachingOn, onToggle }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      {/* Expanded panel — sits above the row */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, right: 0,
          background: c.bgPage, border: `0.5px solid ${c.borderMid}`, borderRadius: c.r10,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 14px 12px' }}>
            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: c.text }}>Diligent Guide</p>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: c.textSub, lineHeight: 1.4 }}>
              Turn on Diligent Guide to see helpful tips while building your agenda — section types, member notes, attachments, and more.
            </p>
            {/* Single toggle row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bgSubtle, borderRadius: c.r8, padding: '10px 12px' }}>
              <div>
                <p style={{ margin: '0 0 1px', fontSize: 12, fontWeight: 500, color: c.text }}>Building an Agenda</p>
                <p style={{ margin: 0, fontSize: 11, color: c.textSub }}>{coachingOn ? 'Guide is active' : 'Guide is off'}</p>
              </div>
              <button
                onClick={onToggle}
                style={{
                  width: 36, height: 20, borderRadius: 10, flexShrink: 0,
                  background: coachingOn ? c.blue : c.borderMid,
                  border: 'none', cursor: 'pointer', position: 'relative',
                  transition: 'background .2s',
                }}
              >
                <div style={{
                  position: 'absolute', top: 2,
                  left: coachingOn ? 18 : 2,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'white', transition: 'left .2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav row — always visible at bottom of sidebar */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 10px', borderRadius: c.r8,
          background: open ? c.blueLight : 'transparent',
          cursor: 'pointer', transition: 'background .1s',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', color: open ? c.blue : c.textSub }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 11.5v-.5M8 10c0-2 2.5-2 2.5-3.5a2.5 2.5 0 00-5 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </span>
        <span style={{ fontSize: 13, color: open ? c.blue : c.textMid, fontWeight: open ? 500 : 400, flex: 1 }}>Diligent Guide</span>
        {/* On/off pill indicator */}
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 8,
          background: coachingOn ? c.greenLight : c.bgSubtle,
          color: coachingOn ? c.green : c.textMuted,
        }}>{coachingOn ? 'On' : 'Off'}</span>
      </div>
    </div>
  )
}
