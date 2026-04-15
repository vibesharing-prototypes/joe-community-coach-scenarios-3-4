import { theme } from '../../lib/theme.js'
import BookRow from './BookRow.jsx'
import { CoachNudge, CoachNudgeConfirm } from '../coach/CoachNudge.jsx'
import CoachPanel from '../coach/CoachPanel.jsx'
import CoachReplaceNudge from '../coach/CoachReplaceNudge.jsx'

const t = theme

export default function BookList({
  books,
  coachingOn,
  // Publish nudge
  nudgeBookId, nudgeCopied, nudgeDismissed,
  onPublish, onDelete, onCopyLink, onReEnableNotifs, onNudgeDismiss,
  // Post-create nudge (Scenario 1)
  postCreateNudgeBookId, postCreateNudgeDismissed,
  onPostCreateDismiss,
  // Replace nudge (Scenario 2)
  replaceNudgeBookId, replaceNudgeDismissed,
  onReplace, onReplaceAnyway, onReplaceDismiss,
  // Bulk access nudge (Scenario 2)
  bulkAccessNudgeBookId, bulkAccessNudgeDismissed,
  onUserAccess, onBulkAccessDismiss, onBulkAccessPrimary,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.layout.betweenCardsGap }}>
      {books.map((book) => {
        let nudgeSlot = null

        // Priority 1: post-create nudge (Scenario 1)
        if (coachingOn && postCreateNudgeBookId === book.id && !postCreateNudgeDismissed?.has(book.id)) {
          nudgeSlot = (
            <CoachPanel
              title="Review and approve documents before publishing"
              body="Open Build Book to add tabs and load your documents, then use Review Book to approve each one. Directors only see approved content when you publish."
              primaryLabel="Open book to build"
              secondaryLabel="I'll do it later"
              onPrimary={() => onPostCreateDismiss(book.id)}
              onSecondary={() => onPostCreateDismiss(book.id)}
              onDismiss={() => onPostCreateDismiss(book.id)}
            />
          )
        }
        // Priority 2: replace nudge (Scenario 2)
        else if (coachingOn && replaceNudgeBookId === book.id && !replaceNudgeDismissed?.has(book.id)) {
          nudgeSlot = (
            <CoachReplaceNudge
              onUseReplaceWithOptions={() => onReplaceDismiss(book.id)}
              onReplaceAnyway={() => onReplaceAnyway(book.id)}
              onDismiss={() => onReplaceDismiss(book.id)}
            />
          )
        }
        // Priority 3: bulk access nudge (Scenario 2)
        else if (coachingOn && bulkAccessNudgeBookId === book.id && !bulkAccessNudgeDismissed) {
          nudgeSlot = (
            <CoachPanel
              title="Manage access for multiple documents at once"
              body="You've updated access three times individually. Multi-document access lets you set permissions across all documents in one step — useful when access changes affect the whole book."
              primaryLabel="Try bulk access"
              secondaryLabel="Not now"
              onPrimary={() => onBulkAccessDismiss()}
              onSecondary={() => onBulkAccessDismiss()}
              onDismiss={() => onBulkAccessDismiss()}
            />
          )
        }
        // Priority 4: publish nudge
        else if (coachingOn && nudgeBookId === book.id && !nudgeDismissed.has(book.id)) {
          nudgeSlot = nudgeCopied
            ? <CoachNudgeConfirm />
            : (
              <CoachNudge
                onCopyLink={() => onCopyLink(book.id)}
                onReEnableNotifs={() => onReEnableNotifs(book.id)}
                onDismiss={() => onNudgeDismiss(book.id)}
              />
            )
        }

        return (
          <BookRow
            key={book.id}
            book={book}
            onPublish={onPublish}
            onDelete={onDelete}
            onReplace={onReplace}
            onUserAccess={onUserAccess}
            nudgeSlot={nudgeSlot}
          />
        )
      })}
    </div>
  )
}
