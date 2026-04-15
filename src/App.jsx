import { useState } from 'react'
import { theme } from './lib/theme.js'
import { BOOKS } from './lib/data.js'
import Sidebar from './components/layout/Sidebar.jsx'
import TopNav from './components/layout/TopNav.jsx'
import BookList from './components/books/BookList.jsx'
import CoachIntercept from './components/coach/CoachIntercept.jsx'
import CoachWizard from './components/coach/CoachWizard.jsx'
import PrototypeBar from './components/PrototypeBar.jsx'
import OrientationPanel from './components/OrientationPanel.jsx'
import CreateBookPage from './components/CreateBookPage.jsx'
import { IconPlus, IconSparkle, IconSearch, IconFilter, IconCheck } from './components/ui/Icons.jsx'

const t = theme

function freshState(scenario) {
  return {
    view:                   scenario === 'scenario1' ? 'orient' : 'list',
    books:                  scenario === 'scenario1' ? [] : [...BOOKS],
    orientDismissed:        false,
    nudgeBookId:            null,
    nudgeCopied:            false,
    nudgeDismissed:         new Set(),
    interceptBook:          null,
    interceptResult:        null,
    wizardOpen:             false,
    wizardSaved:            false,
    postCreateNudgeBookId:  null,
    postCreateNudgeDismissed: new Set(),
    replaceNudgeBookId:     null,
    replaceNudgeDismissed:  new Set(),
    userAccessClickCount:   0,
    bulkAccessNudgeBookId:  null,
    bulkAccessNudgeDismissed: false,
    coachingOn:             scenario !== 'scenario2',
  }
}

export default function App() {
  const [scenario, setScenario] = useState('scenario1')

  // All per-scenario state
  const [view,                    setView]                    = useState('orient')
  const [books,                   setBooks]                   = useState([])
  const [orientDismissed,         setOrientDismissed]         = useState(false)
  const [nudgeBookId,             setNudgeBookId]             = useState(null)
  const [nudgeCopied,             setNudgeCopied]             = useState(false)
  const [nudgeDismissed,          setNudgeDismissed]          = useState(new Set())
  const [interceptBook,           setInterceptBook]           = useState(null)
  const [interceptResult,         setInterceptResult]         = useState(null)
  const [wizardOpen,              setWizardOpen]              = useState(false)
  const [wizardSaved,             setWizardSaved]             = useState(false)
  const [postCreateNudgeBookId,   setPostCreateNudgeBookId]   = useState(null)
  const [postCreateNudgeDismissed,setPostCreateNudgeDismissed]= useState(new Set())
  const [replaceNudgeBookId,      setReplaceNudgeBookId]      = useState(null)
  const [replaceNudgeDismissed,   setReplaceNudgeDismissed]   = useState(new Set())
  const [userAccessClickCount,    setUserAccessClickCount]    = useState(0)
  const [bulkAccessNudgeBookId,   setBulkAccessNudgeBookId]   = useState(null)
  const [bulkAccessNudgeDismissed,setBulkAccessNudgeDismissed]= useState(false)
  const [coachingOn,              setCoachingOn]              = useState(true)

  // ── Scenario switch — resets everything ────────────────────────────────────
  const handleSwitchScenario = (s) => {
    const f = freshState(s)
    setScenario(s)
    setView(f.view)
    setBooks(f.books)
    setOrientDismissed(f.orientDismissed)
    setNudgeBookId(f.nudgeBookId)
    setNudgeCopied(f.nudgeCopied)
    setNudgeDismissed(f.nudgeDismissed)
    setInterceptBook(f.interceptBook)
    setInterceptResult(f.interceptResult)
    setWizardOpen(f.wizardOpen)
    setWizardSaved(f.wizardSaved)
    setPostCreateNudgeBookId(f.postCreateNudgeBookId)
    setPostCreateNudgeDismissed(f.postCreateNudgeDismissed)
    setReplaceNudgeBookId(f.replaceNudgeBookId)
    setReplaceNudgeDismissed(f.replaceNudgeDismissed)
    setUserAccessClickCount(f.userAccessClickCount)
    setBulkAccessNudgeBookId(f.bulkAccessNudgeBookId)
    setBulkAccessNudgeDismissed(f.bulkAccessNudgeDismissed)
    setCoachingOn(f.coachingOn)
  }

  // ── Scenario 1 — orientation & create ──────────────────────────────────────
  const handleOrientDismiss = () => {
    setOrientDismissed(true)
    setView('empty')
  }

  const handleGoToCreate = () => setView('create')

  const handleBookCreated = ({ title }) => {
    const newBook = {
      id: Date.now(),
      title,
      status: 'Draft',
      date: 'Sep 12–15, 2026',
      committee: 'Audit Committee',
      extra: null,
      updated: 'Today',
      hasNotes: false,
    }
    setBooks([newBook])
    setView('list')
    setPostCreateNudgeBookId(newBook.id)
  }

  const handleCancelCreate = () => {
    if (books.length > 0) { setView('list'); return }
    setView(orientDismissed ? 'empty' : 'orient')
  }

  const handleBooksBack = () => {
    if (books.length > 0) { setView('list'); return }
    setView(orientDismissed ? 'empty' : 'orient')
  }

  // ── Publish nudge ───────────────────────────────────────────────────────────
  const handlePublish = (book) => {
    if (!nudgeDismissed.has(book.id)) {
      setNudgeBookId(book.id)
      setNudgeCopied(false)
    }
  }

  const handleCopyLink    = ()       => setNudgeCopied(true)
  const handleReEnableNotifs = (id)  => { setNudgeBookId(null); setNudgeDismissed(p => new Set([...p, id])) }
  const handleNudgeDismiss   = (id)  => { setNudgeBookId(null); setNudgeDismissed(p => new Set([...p, id])) }

  // ── Post-create nudge ───────────────────────────────────────────────────────
  const handlePostCreateDismiss = (id) => {
    setPostCreateNudgeBookId(null)
    setPostCreateNudgeDismissed(p => new Set([...p, id]))
  }

  // ── Delete / intercept ──────────────────────────────────────────────────────
  const handleDelete = (book) => {
    if (!coachingOn) return
    setInterceptBook(book)
    setInterceptResult(null)
  }

  // ── Replace nudge (Scenario 2) ──────────────────────────────────────────────
  const handleReplace = (book) => {
    if (book.status === 'Published' && book.hasNotes && !replaceNudgeDismissed.has(book.id)) {
      setReplaceNudgeBookId(book.id)
    }
  }

  const handleReplaceAnyway = (id) => {
    setReplaceNudgeBookId(null)
    setReplaceNudgeDismissed(p => new Set([...p, id]))
  }

  const handleReplaceDismiss = (id) => {
    setReplaceNudgeBookId(null)
    setReplaceNudgeDismissed(p => new Set([...p, id]))
  }

  // ── User access / bulk nudge (Scenario 2) ───────────────────────────────────
  const handleUserAccess = (book) => {
    if (bulkAccessNudgeDismissed || bulkAccessNudgeBookId) return
    const newCount = userAccessClickCount + 1
    setUserAccessClickCount(newCount)
    if (newCount >= 3) {
      setBulkAccessNudgeBookId(book.id)
    }
  }

  const handleBulkAccessDismiss = () => {
    setBulkAccessNudgeBookId(null)
    setBulkAccessNudgeDismissed(true)
  }

  // ── Wizard ──────────────────────────────────────────────────────────────────
  const handleWizardOpen = () => { setWizardOpen(true); setWizardSaved(false) }
  const handleWizardSave = () => { setWizardOpen(false); setWizardSaved(true) }

  const isCreateView = view === 'create'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: t.color.surface.default,
      fontFamily: t.typography.fontFamily,
      color: t.color.type.default,
    }}>
      <PrototypeBar scenario={scenario} onSwitch={handleSwitchScenario} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
      <Sidebar
        coachingOn={coachingOn}
        onCoachToggle={() => setCoachingOn(v => !v)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopNav
          extraCrumb={isCreateView ? 'Create book' : null}
          onBooksClick={handleBooksBack}
        />

        {/* ── Create book page (full main area replacement) ── */}
        {isCreateView ? (
          <CreateBookPage
            scenario={scenario}
            coachingOn={coachingOn}
            onCancel={handleCancelCreate}
            onCreate={handleBookCreated}
          />
        ) : (
          <main style={{
            flex: 1,
            overflow: 'auto',
            borderTopLeftRadius: t.radius.mainTopLeft,
            padding: `${t.spacing['1_5']} ${t.layout.contentMarginH} 0`,
            background: `radial-gradient(circle at top left, ${t.color.background.gradientStart}, ${t.color.background.gradientEnd})`,
          }}>

            {/* Page header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: t.layout.pageHeaderContentGap,
              paddingTop: t.spacing['1_5'],
            }}>
              <h1 style={{ ...t.typography.h1Billboard, color: t.color.type.default }}>Books</h1>

              <div style={{ display: 'flex', gap: t.spacing[1] }}>
                <button
                  onClick={handleGoToCreate}
                  style={{
                    display: 'flex', alignItems: 'center', gap: t.spacing['0_5'],
                    ...t.typography.buttonSm,
                    padding: `9px ${t.spacing[2]}`,
                    background: t.color.selection.primaryOnSelected,
                    color: '#ffffff', border: 'none',
                    borderRadius: t.radius.md, cursor: 'pointer',
                  }}
                >
                  <IconPlus size={14} color="#ffffff" />
                  {view === 'empty' ? 'Create first book' : 'Create book'}
                </button>

                <button
                  onClick={handleWizardOpen}
                  style={{
                    display: 'flex', alignItems: 'center', gap: t.spacing['0_5'],
                    ...t.typography.buttonSm,
                    padding: `9px ${t.spacing[2]}`,
                    background: `linear-gradient(135deg, ${t.color.ai.gradientStart}, ${t.color.ai.gradientMiddle}, ${t.color.ai.gradientEnd})`,
                    color: '#ffffff', border: 'none',
                    borderRadius: t.radius.md, cursor: 'pointer',
                  }}
                >
                  <IconSparkle size={14} color="#ffffff" />
                  GovernAI
                </button>
              </div>
            </div>


            {/* Wizard saved confirmation */}
            {wizardSaved && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: t.spacing[1],
                background: t.color.extended.successConfirmBg,
                border: `1px solid #86efac`,
                borderRadius: t.radius.md,
                padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
                marginBottom: t.spacing[2],
                ...t.typography.body,
                color: t.color.extended.successText,
              }}>
                <IconCheck size={16} color={t.color.extended.successText} />
                Workflow "Q3 Board Meeting Papers" saved and active.
              </div>
            )}

            {/* Search + filter — only when there are books */}
            {(view === 'list' || scenario === 'scenario2') && (
              <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing['1_5'], marginBottom: t.spacing['2_5'] }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: t.spacing[1],
                  height: t.input.height,
                  border: `1px solid ${t.color.ui.dividerDefault}`,
                  borderRadius: t.radius.md,
                  padding: `0 ${t.spacing['1_5']}`,
                  background: t.color.surface.default,
                }}>
                  <IconSearch size={14} color={t.color.type.muted} />
                  <span style={{ ...t.typography.body, color: t.color.type.muted }}>Search</span>
                </div>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: t.spacing['0_5'],
                  height: t.input.height,
                  padding: `0 ${t.spacing[2]}`,
                  background: t.color.surface.default,
                  border: `1px solid ${t.color.ui.dividerDefault}`,
                  borderRadius: t.radius.md,
                  ...t.typography.body, color: t.color.type.muted,
                  cursor: 'pointer',
                }}>
                  <IconFilter size={14} color={t.color.type.muted} />
                  Filters
                </button>
              </div>
            )}

            {/* ── View: orient ── */}
            {scenario === 'scenario1' && view === 'orient' && coachingOn && (
              <OrientationPanel
                onDismiss={handleOrientDismiss}
                onCreateBook={handleGoToCreate}
              />
            )}

            {/* ── View: empty ── */}
            {scenario === 'scenario1' && view === 'empty' && (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '80px 0', gap: t.spacing[2],
              }}>
                <p style={{ ...t.typography.bodyEmphasis, color: t.color.type.default, margin: 0 }}>
                  No books yet
                </p>
                <p style={{ ...t.typography.body, color: t.color.type.muted, margin: 0, textAlign: 'center', maxWidth: 320 }}>
                  Create your first book to get started. Once published, directors can access it directly from their device.
                </p>
                <button
                  onClick={handleGoToCreate}
                  style={{
                    ...t.typography.buttonSm,
                    padding: `9px ${t.spacing[2]}`,
                    background: t.color.selection.primaryOnSelected,
                    color: '#ffffff', border: 'none',
                    borderRadius: t.radius.md, cursor: 'pointer',
                  }}
                >
                  Create first book
                </button>
              </div>
            )}

            {/* ── View: list (Scenario 1 after create, or all of Scenario 2) ── */}
            {(view === 'list' || scenario === 'scenario2') && (
              <BookList
                books={books}
                coachingOn={coachingOn}
                nudgeBookId={nudgeBookId}
                nudgeCopied={nudgeCopied}
                nudgeDismissed={nudgeDismissed}
                onPublish={handlePublish}
                onDelete={handleDelete}
                onCopyLink={handleCopyLink}
                onReEnableNotifs={handleReEnableNotifs}
                onNudgeDismiss={handleNudgeDismiss}
                postCreateNudgeBookId={postCreateNudgeBookId}
                postCreateNudgeDismissed={postCreateNudgeDismissed}
                onPostCreateDismiss={handlePostCreateDismiss}
                replaceNudgeBookId={replaceNudgeBookId}
                replaceNudgeDismissed={replaceNudgeDismissed}
                onReplace={handleReplace}
                onReplaceAnyway={handleReplaceAnyway}
                onReplaceDismiss={handleReplaceDismiss}
                bulkAccessNudgeBookId={bulkAccessNudgeBookId}
                bulkAccessNudgeDismissed={bulkAccessNudgeDismissed}
                onUserAccess={handleUserAccess}
                onBulkAccessDismiss={handleBulkAccessDismiss}
                onBulkAccessPrimary={handleBulkAccessDismiss}
              />
            )}

            <div style={{ height: t.spacing[4] }} />
          </main>
        )}
      </div>

      </div>

      {/* Intercept modal */}
      {interceptBook && !interceptResult && coachingOn && (
        <CoachIntercept
          annotationCount={8}
          onUseReplace={() => setInterceptResult('replaced')}
          onDeleteAnyway={() => setInterceptResult('deleted')}
        />
      )}

      {/* Wizard modal */}
      {wizardOpen && (
        <CoachWizard
          onClose={() => setWizardOpen(false)}
          onSave={handleWizardSave}
        />
      )}
    </div>
  )
}
