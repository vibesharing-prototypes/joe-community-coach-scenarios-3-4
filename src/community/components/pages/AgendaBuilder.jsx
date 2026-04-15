import { useState, useEffect } from 'react'
import { c } from '../../lib/tokens.js'
import { I } from '../../lib/icons.jsx'
import { SECTION_TYPES, INITIAL_SECTIONS_S3, INITIAL_SECTIONS_S4 } from '../../lib/data.js'
import CoachPanel from '../coach/CoachPanel.jsx'
import ComplianceModal from '../coach/ComplianceModal.jsx'
import InlineTip from '../coach/InlineTip.jsx'

// ─── ITEM MEMBER NOTES BUTTON ─────────────────────────────────────────────────
function ItemMemberNotesButton({ memberNotesTipDismissed, onShowCoach }) {
  return (
    <button
      onClick={() => { if (!memberNotesTipDismissed) onShowCoach() }}
      title="Add member notes"
      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: c.textSub, background: 'transparent', border: `0.5px solid ${c.border}`, borderRadius: c.r6, padding: '3px 8px', cursor: 'pointer' }}
    >
      <I.note /> Member notes
    </button>
  )
}

// ─── ITEM MENU ────────────────────────────────────────────────────────────────
function ItemMenu({ onDelete, showCoach, effectiveFirstTime, memberNotesTipDismissed, onMemberNotesTipDismiss, scratchpadTipDismissed, onScratchpadTipDismiss }) {
  const [open, setOpen] = useState(false)
  const [showMemberNotesCoach, setShowMemberNotesCoach] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, padding: '3px 5px', borderRadius: c.r4 }}><I.dots /></button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: '100%', zIndex: 50, background: c.bgPage, border: `0.5px solid ${c.borderMid}`, borderRadius: c.r8, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: '4px 0', minWidth: 170 }}>
          {[
            { label: 'Edit item' },
            { label: 'Duplicate' },
            { label: 'Move to' },
            {
              label: 'Member Notes',
              onClick: () => {
                setOpen(false)
                if (showCoach && effectiveFirstTime && !memberNotesTipDismissed) setShowMemberNotesCoach(true)
              },
            },
            { label: 'Delete', danger: true, onClick: () => { setOpen(false); onDelete() } },
          ].map((item, i) => (
            <button key={i} onClick={item.onClick ?? (() => setOpen(false))} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 14px', background: 'transparent', border: 'none', fontSize: 13, color: item.danger ? c.dangerText : c.text, cursor: 'pointer' }}>
              {item.label}
            </button>
          ))}
        </div>
      )}
      {/* Member Notes coach — from menu */}
      {showMemberNotesCoach && !memberNotesTipDismissed && (
        <div style={{ position: 'absolute', right: 0, top: '100%', zIndex: 60, width: 280 }}>
          <CoachPanel
            icon={<I.note />}
            title="Member Notes are never public"
            body="Use Member Notes to add context for board members only — background info, legal considerations, or internal commentary. They appear on the private Members agenda and are never visible to the public."
            primaryLabel="Got it"
            onPrimary={() => { setShowMemberNotesCoach(false); onMemberNotesTipDismiss() }}
            onDismiss={() => { setShowMemberNotesCoach(false); onMemberNotesTipDismiss() }}
          />
        </div>
      )}
    </div>
  )
}

// ─── AGENDA BUILDER ───────────────────────────────────────────────────────────
export default function AgendaBuilder({ meeting, isFirstTime, onBack, onPublish, onCoachState, coachingOn = true }) {
  const showCoach = coachingOn
  const effectiveFirstTime = isFirstTime || coachingOn

  const [sections, setSections] = useState(isFirstTime ? INITIAL_SECTIONS_S3 : INITIAL_SECTIONS_S4)
  const [expandedSections, setExpandedSections] = useState(new Set([1, 2, 3, 4, 5]))

  // First-time coach state
  const [structureTipDismissed, setStructureTipDismissed] = useState(false)
  const [sectionTypeTipShown, setSectionTypeTipShown] = useState(false)
  const [sectionTypeTipDismissed, setSectionTypeTipDismissed] = useState(false)
  const [scratchpadTipDismissed, setScratchpadTipDismissed] = useState(false)
  const [memberNotesTipDismissed, setMemberNotesTipDismissed] = useState(false)
  const [publishNudgeDismissed, setPublishNudgeDismissed] = useState(false)
  const [showPublishNudge, setShowPublishNudge] = useState(false)
  const [addedSectionCount, setAddedSectionCount] = useState(0)
  const [published, setPublished] = useState(false)
  const [memberNotesCoachItemId, setMemberNotesCoachItemId] = useState(null)
  const [attachmentTipItemId, setAttachmentTipItemId] = useState(null)

  // Returning clerk coach state
  const [attachmentInterceptData, setAttachmentInterceptData] = useState(null)
  const [notesInterceptData, setNotesInterceptData] = useState(null)
  const [duplicateCommentNudge, setDuplicateCommentNudge] = useState(false)
  const [duplicateNudgeSection, setDuplicateNudgeSection] = useState(null)
  const [reorderCount, setReorderCount] = useState(0)
  const [reorderNudgeDismissed, setReorderNudgeDismissed] = useState(false)
  const [reorderNudgeSection, setReorderNudgeSection] = useState(null)

  // Sync tip state up to parent
  useEffect(() => {
    if (!onCoachState || !isFirstTime) return
    onCoachState([
      { label: 'How the builder works',   desc: 'Sections, items, and structure',          dismissed: structureTipDismissed,    onToggle: () => setStructureTipDismissed(v => !v) },
      { label: 'Section types',           desc: 'Consent, Public comment, Members only',   dismissed: sectionTypeTipDismissed,  onToggle: () => { setSectionTypeTipDismissed(v => !v); if (sectionTypeTipDismissed) setSectionTypeTipShown(true) } },
      { label: 'Member Notes',            desc: 'Private notes, never shown publicly',      dismissed: memberNotesTipDismissed,  onToggle: () => setMemberNotesTipDismissed(v => !v) },
      { label: 'Scratchpad',              desc: 'Internal notes that never publish',        dismissed: scratchpadTipDismissed,   onToggle: () => setScratchpadTipDismissed(v => !v) },
      { label: 'Preview before publishing', desc: 'Check public view before going live',   dismissed: publishNudgeDismissed,    onToggle: () => setPublishNudgeDismissed(v => !v) },
    ])
  }, [structureTipDismissed, sectionTypeTipDismissed, memberNotesTipDismissed, scratchpadTipDismissed, publishNudgeDismissed])

  const hasPublicCommentSection = sections.some(s => s.type === 'publicComment')

  const handleAddSection = () => {
    const newCount = addedSectionCount + 1
    setAddedSectionCount(newCount)
    const newSection = { id: Date.now(), title: `New section ${sections.length + 1}`, type: 'standard', items: [] }
    setSections(prev => [...prev, newSection])
    setExpandedSections(prev => new Set([...prev, newSection.id]))
    if (newCount === 1 && showCoach && effectiveFirstTime && !sectionTypeTipShown) setSectionTypeTipShown(true)
  }

  const handleAddItem = (sectionId) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId
        ? { ...s, items: [...s.items, { id: Date.now(), title: 'New agenda item', description: '', hasNotes: false, attachments: [], descOpen: false }] }
        : s
    ))
  }

  const handleToggleDesc = (sectionId, itemId) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, descOpen: !i.descOpen } : i) } : s
    ))
  }

  const handleAddAttachment = (sectionId, itemId) => {
    const name = 'Document_' + Math.floor(Math.random() * 900 + 100) + '.pdf'
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, attachments: [...i.attachments, { name, public: true }] } : i) } : s
    ))
    if (effectiveFirstTime && showCoach) setAttachmentTipItemId(itemId)
  }

  const handleDeleteItem = (sectionId, itemId) => {
    const section = sections.find(s => s.id === sectionId)
    const item = section?.items.find(i => i.id === itemId)
    if (!isFirstTime && item?.hasNotes && showCoach) {
      setNotesInterceptData({ sectionId, itemId, item })
      return
    }
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s))
  }

  const confirmDeleteItem = () => {
    if (!notesInterceptData) return
    const { sectionId, itemId } = notesInterceptData
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s))
    setNotesInterceptData(null)
  }

  const doToggleAttachment = (sectionId, itemId, attIdx) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.map(i =>
            i.id === itemId
              ? { ...i, attachments: i.attachments.map((a, idx) => idx === attIdx ? { ...a, public: !a.public } : a) }
              : i
          )}
        : s
    ))
  }

  const handleToggleAttachmentVisibility = (sectionId, itemId, attIdx, currentPublic) => {
    if (!isFirstTime && currentPublic && showCoach) {
      setAttachmentInterceptData({ sectionId, itemId, attIdx, currentPublic })
      return
    }
    doToggleAttachment(sectionId, itemId, attIdx)
  }

  const handleChangeSectionType = (sectionId, newType) => {
    if (newType === 'publicComment' && hasPublicCommentSection && !isFirstTime && showCoach) {
      setDuplicateCommentNudge(true)
      setDuplicateNudgeSection(sectionId)
      return
    }
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, type: newType } : s))
  }

  const handleMoveSection = (sectionId, direction) => {
    const newCount = reorderCount + 1
    setReorderCount(newCount)
    if (newCount >= 2 && !reorderNudgeDismissed && !isFirstTime && showCoach) setReorderNudgeSection(sectionId)
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === sectionId)
      const newIdx = direction === 'up' ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= prev.length) return prev
      const arr = [...prev]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      return arr
    })
  }

  const handlePublishClick = () => {
    if (showCoach && effectiveFirstTime && !publishNudgeDismissed) {
      setShowPublishNudge(true)
    } else {
      setPublished(true)
      onPublish()
    }
  }

  const toggleSection = (id) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: c.bgApp }}>
      {/* Builder topbar */}
      <div style={{ background: c.bgPage, borderBottom: `0.5px solid ${c.border}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.textSub }}>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>Meetings</span>
          <span>›</span>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>{meeting.title}</span>
          <span>›</span>
          <span style={{ color: c.text, fontWeight: 500 }}>Edit Agenda</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: c.textMuted }}>Saving…</span>
          <button style={{ padding: '5px 14px', background: 'transparent', border: `0.5px solid ${c.borderMid}`, borderRadius: c.r6, fontSize: 13, color: c.textMid, cursor: 'pointer' }}>Preview</button>
          <button onClick={handlePublishClick} style={{ padding: '6px 16px', background: c.blue, color: 'white', border: 'none', borderRadius: c.r8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Publish agenda</button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
        {/* Table of contents */}
        <div style={{ width: 200, background: c.bgPage, borderRight: `0.5px solid ${c.border}`, padding: '16px 12px', flexShrink: 0, overflowY: 'auto' }}>
          <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 600, color: c.textMuted, letterSpacing: '.05em', textTransform: 'uppercase' }}>Table of contents</p>
          {sections.length === 0
            ? <p style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.4 }}>Sections you add will appear here</p>
            : sections.map((s, i) => (
              <div key={s.id} style={{ fontSize: 12, color: c.textSub, padding: '5px 8px', borderRadius: c.r4, cursor: 'pointer', marginBottom: 2 }}>
                {i + 1}. {s.title}
              </div>
            ))
          }
        </div>

        {/* Main builder area */}
        <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Publish nudge */}
          {showPublishNudge && !publishNudgeDismissed && (
            <div style={{ marginBottom: 16 }}>
              <CoachPanel
                icon={<I.info color={c.blue} />}
                title="Preview before you publish"
                body="Use the Preview button to see exactly how this agenda appears to the public before making it live. It takes 30 seconds and prevents formatting issues from reaching your community."
                primaryLabel="Preview agenda"
                secondaryLabel="Publish anyway"
                onPrimary={() => { setShowPublishNudge(false); setPublishNudgeDismissed(true) }}
                onSecondary={() => { setShowPublishNudge(false); setPublishNudgeDismissed(true); setPublished(true); onPublish() }}
                onDismiss={() => { setShowPublishNudge(false); setPublishNudgeDismissed(true) }}
              />
            </div>
          )}

          {/* Meeting header */}
          <div style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r10, padding: '16px 18px', marginBottom: 16 }}>
            <h2 style={{ margin: '0 0 2px', fontSize: 17, fontWeight: 600, color: c.text }}>{meeting.title}</h2>
            <p style={{ margin: 0, fontSize: 12, color: c.textSub }}>{meeting.date} · {meeting.type}</p>
          </div>

          {/* First-time structure orientation */}
          {showCoach && effectiveFirstTime && !structureTipDismissed && (
            <div style={{ background: c.bgPage, border: `0.5px solid ${c.borderMid}`, borderRadius: c.r10, padding: '16px 18px', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c.blue, borderRadius: '10px 10px 0 0' }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: c.r8, background: c.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <I.info color={c.blue} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 600, color: c.text }}>How this builder works</p>
                  <p style={{ margin: '0 0 10px', fontSize: 13, color: c.textMid, lineHeight: 1.55 }}>An agenda is made up of <strong>Sections</strong> that hold <strong>Items</strong>. Your meeting template may have pre-set some sections — you can rename, reorder, or remove them. Add items inside each section for the specific topics the board needs to address.</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[['Sections', 'Main groups like Call to Order, Business Items'], ['Items', 'Individual topics within a section'], ['Recommended Actions', 'Optional vote/motion labels on items']].map(([label, desc]) => (
                      <div key={label} style={{ flex: 1, background: c.bgSubtle, borderRadius: c.r8, padding: '8px 10px' }}>
                        <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 600, color: c.text }}>{label}</p>
                        <p style={{ margin: 0, fontSize: 11, color: c.textSub, lineHeight: 1.4 }}>{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStructureTipDismissed(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, padding: '2px 4px' }}><I.close /></button>
              </div>
              <div style={{ paddingLeft: 42, marginTop: 12 }}>
                <button onClick={() => setStructureTipDismissed(true)} style={{ padding: '6px 14px', background: c.blue, color: 'white', border: 'none', borderRadius: c.r8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Got it</button>
              </div>
            </div>
          )}

          {/* Sections */}
          {sections.map((section, sIdx) => (
            <div key={section.id} style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r10, marginBottom: 10 }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: expandedSections.has(section.id) ? `0.5px solid ${c.border}` : 'none' }}>
                <button onClick={() => handleMoveSection(section.id, 'up')}   style={{ background: 'transparent', border: 'none', cursor: sIdx === 0 ? 'not-allowed' : 'pointer', color: sIdx === 0 ? c.textMuted : c.textSub, padding: '1px 3px', fontSize: 11 }}>▲</button>
                <button onClick={() => handleMoveSection(section.id, 'down')} style={{ background: 'transparent', border: 'none', cursor: sIdx === sections.length - 1 ? 'not-allowed' : 'pointer', color: sIdx === sections.length - 1 ? c.textMuted : c.textSub, padding: '1px 3px', fontSize: 11 }}>▼</button>
                <div style={{ width: 22, height: 22, background: c.bgSubtle, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: c.textSub, flexShrink: 0 }}>{sIdx + 1}</div>
                <span style={{ fontSize: 14, fontWeight: 500, color: c.text, flex: 1 }}>{section.title}</span>
                <select
                  value={section.type}
                  onChange={e => handleChangeSectionType(section.id, e.target.value)}
                  style={{ fontSize: 11, border: `0.5px solid ${c.border}`, borderRadius: c.r4, padding: '3px 6px', color: c.textMid, background: c.bgPage, cursor: 'pointer' }}
                >
                  {Object.entries(SECTION_TYPES).map(([val, { label }]) => <option key={val} value={val}>{label}</option>)}
                </select>
                <button onClick={() => handleAddItem(section.id)} style={{ fontSize: 12, color: c.blue, background: c.blueLight, border: `0.5px solid ${c.blueBorder}`, borderRadius: c.r6, padding: '4px 10px', cursor: 'pointer' }}>+ Add item</button>
                <button onClick={() => toggleSection(section.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textMuted, fontSize: 14 }}>
                  {expandedSections.has(section.id) ? '▾' : '▸'}
                </button>
              </div>

              {/* Section description */}
              {expandedSections.has(section.id) && (
                <div style={{ padding: '8px 14px 8px 50px', borderBottom: `0.5px solid ${c.border}` }}>
                  <input
                    placeholder="Section description (optional — public-facing summary)"
                    style={{ width: '100%', padding: '6px 0', border: 'none', borderBottom: `0.5px solid ${c.border}`, fontSize: 12, color: c.textMid, outline: 'none', background: 'transparent', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>
              )}

              {/* Duplicate public comment nudge */}
              {!isFirstTime && showCoach && duplicateCommentNudge && duplicateNudgeSection === section.id && (
                <div style={{ padding: '0 14px 12px' }}>
                  <CoachPanel
                    icon={<I.warn color={c.warn} />}
                    variant="warning"
                    title="You already have a Public comment section"
                    body="Most public meeting templates only allow one. A second one can cause formatting issues on the published agenda. Consider using a different section type here."
                    primaryLabel="Got it"
                    onPrimary={() => { setDuplicateCommentNudge(false); setDuplicateNudgeSection(null); setSections(prev => prev.map(s => s.id === section.id ? { ...s, type: 'standard' } : s)) }}
                    onDismiss={() => { setDuplicateCommentNudge(false); setDuplicateNudgeSection(null) }}
                  />
                </div>
              )}

              {/* Reorder nudge inline */}
              {!isFirstTime && showCoach && reorderNudgeSection === section.id && !reorderNudgeDismissed && (
                <div style={{ padding: '0 14px 12px' }}>
                  <CoachPanel
                    icon={<I.info color={c.blue} />}
                    title="You can drag sections to reorder"
                    body="Instead of using the arrows, grab the drag handle (⠿) to reorder sections more quickly. This also works for items within a section."
                    primaryLabel="Got it"
                    onPrimary={() => { setReorderNudgeDismissed(true); setReorderNudgeSection(null) }}
                    onDismiss={() => { setReorderNudgeDismissed(true); setReorderNudgeSection(null) }}
                  />
                </div>
              )}

              {/* Section type tip — first-time */}
              {showCoach && effectiveFirstTime && sectionTypeTipShown && !sectionTypeTipDismissed && sIdx === sections.length - 1 && (
                <div style={{ padding: '0 14px 12px' }}>
                  <InlineTip
                    message={<><strong style={{ color: c.blueDark }}>Section types</strong> — Use <em>Consent section</em> to group routine items into a single vote. Use <em>Public comment section</em> for your public comment period — required on most public meeting agendas. <em>Members only</em> hides the entire section from the public-facing agenda.</>}
                    onDismiss={() => setSectionTypeTipDismissed(true)}
                  />
                </div>
              )}

              {/* Items */}
              {expandedSections.has(section.id) && section.items.map(item => (
                <div key={item.id}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px 10px 46px', borderTop: `0.5px solid ${c.border}` }}>
                    <span style={{ color: c.textMuted, cursor: 'grab', marginTop: 2, flexShrink: 0 }}><I.drag /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: '0 0 6px', fontSize: 13, color: c.text, fontWeight: 500 }}>{item.title}</p>

                      {/* Description field */}
                      {item.descOpen
                        ? (
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 8px', background: c.bgSubtle, border: `0.5px solid ${c.border}`, borderBottom: 'none', borderRadius: `${c.r6} ${c.r6} 0 0` }}>
                              {['B', 'I', 'U', '≡', '🔗'].map((btn, i) => (
                                <button key={i} style={{ width: 22, height: 22, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: i < 3 ? 11 : 13, color: c.textSub, borderRadius: c.r4, fontWeight: i === 0 ? 700 : 400, fontStyle: i === 1 ? 'italic' : 'normal', textDecoration: i === 2 ? 'underline' : 'none' }}>{btn}</button>
                              ))}
                              <div style={{ width: 1, height: 14, background: c.border, margin: '0 4px' }} />
                              <button
                                onClick={() => handleAddAttachment(section.id, item.id)}
                                style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 6px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 11, color: c.textSub, borderRadius: c.r4 }}
                              >
                                <I.attach /> Attach
                              </button>
                            </div>
                            <textarea
                              placeholder="Add a description — visible on the public agenda"
                              defaultValue={item.description}
                              style={{ width: '100%', minHeight: 72, padding: '8px 10px', border: `0.5px solid ${c.border}`, borderRadius: `0 0 ${c.r6} ${c.r6}`, fontSize: 12, color: c.text, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', lineHeight: 1.5, background: c.bgPage }}
                            />
                          </div>
                        ) : (
                          <button
                            onClick={() => handleToggleDesc(section.id, item.id)}
                            style={{ fontSize: 12, color: c.textMuted, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 6, display: 'block' }}
                          >
                            + Add description
                          </button>
                        )
                      }

                      {item.hasNotes && <span style={{ fontSize: 11, background: c.compLight, color: c.compliance, padding: '2px 8px', borderRadius: 10, display: 'inline-block', marginBottom: 4 }}>Member notes</span>}

                      {/* Attachments */}
                      {item.attachments.map((att, attIdx) => (
                        <div key={attIdx} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>
                          <I.attach />
                          <span style={{ fontSize: 12, color: c.blue }}>{att.name}</span>
                          <button
                            onClick={() => handleToggleAttachmentVisibility(section.id, item.id, attIdx, att.public)}
                            title={att.public ? 'Public — click to make members only' : 'Members only — click to make public'}
                            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, padding: '2px 8px', borderRadius: 10, border: `0.5px solid ${c.border}`, background: att.public ? c.greenLight : c.compLight, color: att.public ? c.green : c.compliance, cursor: 'pointer' }}
                          >
                            {att.public ? <><I.globe /> Public</> : <><I.lock /> Members only</>}
                          </button>
                        </div>
                      ))}

                      {/* First-time attachment visibility tip */}
                      {showCoach && effectiveFirstTime && attachmentTipItemId === item.id && (
                        <InlineTip
                          variant="compliance"
                          message={<><strong style={{ color: c.compliance }}>Check visibility before publishing.</strong> Each attachment is Public by default — visible to anyone on the public agenda. Change it to Members only for sensitive documents like contracts, legal advice, or closed-session materials.</>}
                          onDismiss={() => setAttachmentTipItemId(null)}
                        />
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
                      {/* Member Notes button — first-time only */}
                      {showCoach && effectiveFirstTime && (
                        <ItemMemberNotesButton
                          memberNotesTipDismissed={memberNotesTipDismissed}
                          showCoach={memberNotesCoachItemId === item.id}
                          onShowCoach={() => setMemberNotesCoachItemId(item.id)}
                          onMemberNotesTipDismiss={() => setMemberNotesTipDismissed(true)}
                        />
                      )}
                      <ItemMenu
                        onDelete={() => handleDeleteItem(section.id, item.id)}
                        showCoach={showCoach}
                        effectiveFirstTime={effectiveFirstTime}
                        memberNotesTipDismissed={memberNotesTipDismissed}
                        onMemberNotesTipDismiss={() => setMemberNotesTipDismissed(true)}
                        scratchpadTipDismissed={scratchpadTipDismissed}
                        onScratchpadTipDismiss={() => setScratchpadTipDismissed(true)}
                      />
                    </div>
                  </div>

                  {/* Member Notes coach inline below item */}
                  {showCoach && effectiveFirstTime && memberNotesCoachItemId === item.id && !memberNotesTipDismissed && (
                    <div style={{ padding: '0 14px 12px 46px' }}>
                      <CoachPanel
                        icon={<I.note />}
                        title="Member Notes are never public"
                        body="Use Member Notes to add context for board members only — background info, legal considerations, or internal commentary. They appear on the private Members agenda and are never visible to the public."
                        primaryLabel="Got it"
                        onPrimary={() => { setMemberNotesCoachItemId(null); setMemberNotesTipDismissed(true) }}
                        onDismiss={() => { setMemberNotesCoachItemId(null); setMemberNotesTipDismissed(true) }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Empty section state */}
              {expandedSections.has(section.id) && section.items.length === 0 && (
                <div style={{ padding: '14px 14px 14px 46px', borderTop: `0.5px solid ${c.border}` }}>
                  <button onClick={() => handleAddItem(section.id)} style={{ fontSize: 12, color: c.textSub, background: 'transparent', border: `0.5px dashed ${c.borderMid}`, borderRadius: c.r6, padding: '6px 14px', cursor: 'pointer', width: '100%' }}>
                    + Add first item to this section
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add section button */}
          <button onClick={handleAddSection} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '12px 14px', background: 'transparent', border: `1px dashed ${c.borderMid}`, borderRadius: c.r10, cursor: 'pointer', color: c.textSub, fontSize: 13, marginBottom: 16 }}>
            <I.plus color={c.textSub} /> Add section
          </button>

          {/* Scratchpad */}
          <div style={{ background: c.bgPage, border: `0.5px solid ${c.border}`, borderRadius: c.r10, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: scratchpadTipDismissed ? 0 : 8 }}>
              <span style={{ color: c.textSub }}><I.scratch /></span>
              <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>Scratchpad</span>
              <span style={{ fontSize: 11, color: c.textMuted, marginLeft: 'auto' }}>Never appears on any agenda</span>
            </div>
            {showCoach && effectiveFirstTime && !scratchpadTipDismissed && (
              <InlineTip
                message={<><strong style={{ color: c.blueDark }}>Use this for internal notes.</strong> Anything you type in the Scratchpad is never published or shown publicly. Use it for reminders, draft language, or notes to yourself — not the Description field on items.</>}
                onDismiss={() => setScratchpadTipDismissed(true)}
              />
            )}
          </div>

        </div>
      </div>

      {/* Compliance intercept — attachment visibility */}
      {attachmentInterceptData && (
        <ComplianceModal
          icon={<I.shield />}
          title="This attachment is currently public — are you sure?"
          body="Changing this to members only will hide it from the public-facing agenda. If residents or the press are expecting to see this document, removing it may raise transparency concerns."
          consequences={[
            'The attachment will no longer appear on the published public agenda',
            'Members and staff will still see it on the private agenda',
            'This change takes effect immediately if the agenda is already published',
          ]}
          primaryLabel="Keep as public"
          escapeLabel="Change to members only anyway"
          onPrimary={() => setAttachmentInterceptData(null)}
          onEscape={() => {
            doToggleAttachment(attachmentInterceptData.sectionId, attachmentInterceptData.itemId, attachmentInterceptData.attIdx)
            setAttachmentInterceptData(null)
          }}
        />
      )}

      {/* Notes intercept — delete item with member notes */}
      {notesInterceptData && (
        <ComplianceModal
          icon={<I.shield />}
          title="Member notes will be lost if you delete this item"
          body="This item has member-only notes attached. Deleting it removes all notes permanently — they can't be recovered."
          consequences={[
            'All member notes on this item will be deleted',
            'Any attached member-only documents will be removed',
          ]}
          primaryLabel="Keep item"
          escapeLabel="Delete anyway"
          onPrimary={() => setNotesInterceptData(null)}
          onEscape={confirmDeleteItem}
        />
      )}
    </div>
  )
}
