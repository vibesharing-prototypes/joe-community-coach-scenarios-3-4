import { useState } from 'react'
import { theme } from '../../lib/theme.js'
import { IconCalendar, IconPeople, IconDots } from '../ui/Icons.jsx'
import BookContextMenu from './BookContextMenu.jsx'

const t = theme

const STATUS_STYLE = {
  Published: { background: t.color.extended.successBg,             color: t.color.extended.successText },
  Draft:     { background: t.color.status.neutralBackgroundVariant, color: t.color.status.neutralContentVariant },
  Archived:  { background: t.color.status.neutralBackgroundVariant, color: t.color.type.muted },
}

export default function BookRow({ book, onPublish, onDelete, onReplace, onUserAccess, nudgeSlot }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const statusStyle = STATUS_STYLE[book.status]
  const isArchived  = book.status === 'Archived'
  const isDraft     = book.status === 'Draft'

  return (
    // Outer wrapper — Atlas card anatomy
    <div style={{
      background: t.color.surface.variant,
      borderRadius: t.radius.wipCard,
      padding: t.spacing['0_5'],
      display: 'flex',
      flexDirection: 'column',
      gap: t.spacing['0_5'],
    }}>
      {/* Inner card */}
      <div style={{
        background: t.color.surface.default,
        border: `1px solid ${t.color.ui.dividerDefault}`,
        borderRadius: t.radius.wipCard,
        padding: t.spacing[2],
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing['1_5'] }}>
          {/* Title + meta */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[1], marginBottom: t.spacing['0_5'] }}>
              <span style={{
                ...t.typography.bodyEmphasis,
                color: isArchived ? t.color.type.muted : t.color.type.default,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {book.title}
              </span>
              <span style={{
                ...t.typography.labelXsEmphasis,
                ...statusStyle,
                padding: `2px ${t.spacing[1]}`,
                borderRadius: 20,
                flexShrink: 0,
              }}>
                {book.status}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[2], ...t.typography.md, color: t.color.type.muted }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: t.spacing['0_5'] }}>
                <IconCalendar size={12} color={t.color.type.muted} />
                {book.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: t.spacing['0_5'] }}>
                <IconPeople size={12} color={t.color.type.muted} />
                {book.committee}{book.extra ? ` ${book.extra}` : ''}
              </span>
              <span>↻ Last updated: {book.updated}</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing[1], flexShrink: 0 }}>
            {isArchived ? (
              <>
                <button style={ghostBtn}>Restore</button>
                <button style={outlineBtn}>Open</button>
              </>
            ) : (
              <>
                <button style={ghostBtn}>Access</button>
                <button style={ghostBtn}>Properties</button>
                {isDraft ? (
                  <button style={primaryBtn} onClick={() => onPublish(book)}>Publish</button>
                ) : (
                  <button style={outlineBtn}>Edit</button>
                )}
              </>
            )}

            <div style={{ position: 'relative' }}>
              <button
                style={iconBtn}
                onClick={() => setMenuOpen((prev) => !prev)}
                title="More options"
              >
                <IconDots size={16} color={t.color.type.muted} />
              </button>
              {menuOpen && (
                <BookContextMenu
                  onDelete={() => { setMenuOpen(false); onDelete(book) }}
                  onReplace={onReplace ? () => { setMenuOpen(false); onReplace(book) } : null}
                  onUserAccess={onUserAccess ? () => { setMenuOpen(false); onUserAccess(book) } : null}
                  onClose={() => setMenuOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Coach nudge slot — renders inside the outer wrapper */}
      {nudgeSlot}
    </div>
  )
}

// ─── Shared button styles using Atlas tokens ──────────────────────────────────

const ghostBtn = {
  ...theme.typography.buttonSm,
  padding: `6px ${theme.spacing['1_5']}`,
  background: 'transparent',
  color: theme.color.type.muted,
  border: 'none',
  cursor: 'pointer',
  borderRadius: theme.radius.md,
}

const outlineBtn = {
  ...theme.typography.buttonSm,
  padding: `6px ${theme.spacing['1_5']}`,
  background: theme.color.surface.default,
  color: theme.color.type.default,
  border: `1px solid ${theme.color.ui.dividerDefault}`,
  cursor: 'pointer',
  borderRadius: theme.radius.md,
}

const primaryBtn = {
  ...theme.typography.buttonSm,
  padding: `6px ${theme.spacing['1_5']}`,
  background: theme.color.selection.primaryOnSelected,
  color: '#ffffff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: theme.radius.md,
}

const iconBtn = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: theme.spacing['0_5'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.radius.md,
}
