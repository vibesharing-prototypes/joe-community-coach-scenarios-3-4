import { useState } from 'react'
import { c } from './lib/tokens.js'
import CommunitySidebar from './components/layout/CommunitySidebar.jsx'
import CommunityTopBar from './components/layout/CommunityTopBar.jsx'
import AgendaItemsPage from './components/pages/AgendaItemsPage.jsx'
import MeetingsListPage from './components/pages/MeetingsListPage.jsx'
import MeetingDetailPage from './components/pages/MeetingDetailPage.jsx'
import AgendaBuilder from './components/pages/AgendaBuilder.jsx'

// ─── SCENARIO SWITCHER ────────────────────────────────────────────────────────
function ScenarioSwitcher({ scenario, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 3, background: 'rgba(0,0,0,0.06)', borderRadius: c.r8, padding: '3px' }}>
      {[{ id: 3, label: 'Scenario 3 — First-time clerk' }, { id: 4, label: 'Scenario 4 — Returning clerk' }].map(s => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          style={{ padding: '5px 12px', borderRadius: c.r6, background: scenario === s.id ? c.bgPage : 'transparent', border: 'none', fontSize: 12, fontWeight: scenario === s.id ? 500 : 400, color: scenario === s.id ? c.text : c.textSub, cursor: 'pointer', boxShadow: scenario === s.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', transition: 'all .15s' }}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}

// ─── SCENARIO 3 — FIRST-TIME CLERK ───────────────────────────────────────────
function Scenario3() {
  const [page, setPage] = useState('agenda-items')
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [activeSidebarPage, setActiveSidebarPage] = useState('agenda')
  const [publishedMeetingId, setPublishedMeetingId] = useState(null)
  const [coachingOn, setCoachingOn] = useState(true)

  const handleSidebarNav = (id) => {
    setActiveSidebarPage(id)
    if (id === 'meetings') setPage('meetings')
    if (id === 'agenda')   setPage('agenda-items')
    if (id === 'home')     setPage('meetings')
  }

  const handleSelectMeeting = (meeting) => {
    setSelectedMeeting(meeting)
    setPage('meeting-detail')
    setActiveSidebarPage('meetings')
  }

  const handlePublished = () => {
    setPublishedMeetingId(selectedMeeting?.id)
    setPage('meeting-detail')
  }

  const renderPage = () => {
    if (page === 'agenda-items') return (
      <AgendaItemsPage
        isFirstTime
        onNavigateToMeetings={() => { setPage('meetings'); setActiveSidebarPage('meetings') }}
      />
    )
    if (page === 'meetings') return <MeetingsListPage onSelectMeeting={handleSelectMeeting} />
    if (page === 'meeting-detail' && selectedMeeting) return (
      <MeetingDetailPage
        meeting={selectedMeeting}
        isFirstTime
        onBack={() => setPage('meetings')}
        onEditAgenda={() => setPage('agenda-builder')}
        justPublished={publishedMeetingId === selectedMeeting.id}
      />
    )
    if (page === 'agenda-builder' && selectedMeeting) return (
      <AgendaBuilder
        meeting={selectedMeeting}
        isFirstTime
        coachingOn={coachingOn}
        onBack={() => setPage('meeting-detail')}
        onPublish={handlePublished}
        onCoachState={() => {}}
      />
    )
    return null
  }

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <CommunitySidebar
        activePage={activeSidebarPage}
        onNavigate={handleSidebarNav}
        coachingOn={coachingOn}
        onCoachToggle={() => setCoachingOn(v => !v)}
      />
      {renderPage()}
    </div>
  )
}

// ─── SCENARIO 4 — RETURNING CLERK ────────────────────────────────────────────
function Scenario4() {
  const [page, setPage] = useState('meetings')
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [activeSidebarPage, setActiveSidebarPage] = useState('meetings')
  const [coachingOn, setCoachingOn] = useState(false)

  const handleSidebarNav = (id) => {
    setActiveSidebarPage(id)
    if (id === 'meetings') setPage('meetings')
    if (id === 'agenda')   setPage('meetings')
    if (id === 'home')     setPage('meetings')
  }

  const handleSelectMeeting = (meeting) => {
    setSelectedMeeting(meeting)
    setPage('meeting-detail')
  }

  const renderPage = () => {
    if (page === 'meetings') return <MeetingsListPage onSelectMeeting={handleSelectMeeting} />
    if (page === 'meeting-detail' && selectedMeeting) return (
      <MeetingDetailPage
        meeting={selectedMeeting}
        isFirstTime={false}
        onBack={() => setPage('meetings')}
        onEditAgenda={() => setPage('agenda-builder')}
      />
    )
    if (page === 'agenda-builder' && selectedMeeting) return (
      <AgendaBuilder
        meeting={selectedMeeting}
        isFirstTime={false}
        coachingOn={coachingOn}
        onBack={() => setPage('meeting-detail')}
        onPublish={() => setPage('meeting-detail')}
        onCoachState={() => {}}
      />
    )
    return null
  }

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <CommunitySidebar
        activePage={activeSidebarPage}
        onNavigate={handleSidebarNav}
        coachingOn={coachingOn}
        onCoachToggle={() => setCoachingOn(v => !v)}
      />
      {renderPage()}
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function CommunityCoachPrototype() {
  const [scenario, setScenario] = useState(3)

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: c.font, background: c.bgApp, flexDirection: 'column' }}>
      {/* Prototype bar */}
      <div style={{ background: '#1E293B', padding: '0 16px', height: 40, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '.07em', textTransform: 'uppercase' }}>Prototype</span>
        <div style={{ width: 1, height: 16, background: '#334155' }} />
        <ScenarioSwitcher scenario={scenario} onChange={setScenario} />
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#64748b' }}>
          {scenario === 3 ? '0 agendas published — full coaching active' : '2+ agendas published — intercepts & nudges only'}
        </span>
      </div>

      {/* Top bar */}
      <CommunityTopBar />

      {/* Main */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {scenario === 3 ? <Scenario3 key="s3" /> : <Scenario4 key="s4" />}
      </div>
    </div>
  )
}
