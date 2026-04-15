import { useEffect, useRef } from 'react'
import { theme } from '../../lib/theme.js'
import {
  IconMenuUnpublish,
  IconMenuBell,
  IconMenuArchive,
  IconMenuDuplicate,
  IconMenuReplace,
  IconMenuUsers,
  IconMenuTrash,
} from '../ui/Icons.jsx'

const t = theme

const MENU_ITEMS = [
  { Icon: IconMenuUnpublish, label: 'Unpublish',    action: 'unpublish' },
  { Icon: IconMenuBell,      label: 'Notify Users', action: 'notify' },
  { Icon: IconMenuArchive,   label: 'Archive',      action: 'archive' },
  { Icon: IconMenuDuplicate, label: 'Duplicate',    action: 'duplicate' },
  { Icon: IconMenuReplace,   label: 'Replace',      action: 'replace' },
  { Icon: IconMenuUsers,     label: 'User access',  action: 'userAccess' },
]

export default function BookContextMenu({ onDelete, onReplace, onUserAccess, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const handleAction = (action) => {
    onClose()
    if (action === 'replace' && onReplace)     onReplace()
    if (action === 'userAccess' && onUserAccess) onUserAccess()
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        right: 0,
        top: 'calc(100% + 4px)',
        zIndex: 300,
        background: t.color.surface.default,
        border: `1px solid ${t.color.ui.dividerDefault}`,
        borderRadius: t.radius.lg,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        minWidth: 208,
        padding: `${t.spacing['0_5']} 0`,
      }}
    >
      {MENU_ITEMS.map(({ Icon, label, action }) => (
        <MenuItem
          key={label}
          Icon={Icon}
          label={label}
          onClick={() => handleAction(action)}
        />
      ))}

      <div style={{ height: 1, background: t.color.ui.dividerDefault, margin: `${t.spacing['0_5']} 0` }} />

      <MenuItem Icon={IconMenuTrash} label="Delete" onClick={() => { onClose(); onDelete() }} destructive />
    </div>
  )
}

function MenuItem({ Icon, label, onClick, destructive = false }) {
  const color = destructive ? t.color.extended.destructiveText : t.color.type.default

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: t.spacing['1_5'],
        width: '100%',
        padding: `${t.spacing['1_5']} ${t.spacing[2]}`,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        ...t.typography.body,
        color,
        textAlign: 'left',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = destructive ? '#fff5f5' : t.color.surface.variant }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <Icon size={18} color={color} />
      {label}
    </button>
  )
}
