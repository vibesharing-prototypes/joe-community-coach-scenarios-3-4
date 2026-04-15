import { theme } from '../../lib/theme.js'

const c = theme.color

// ─── UI chrome icons ──────────────────────────────────────────────────────────

export const IconInfo = ({ size = 16, color = c.selection.primaryOnSelected }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.5" />
    <path d="M8 5v3.5M8 10.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconWarn = ({ size = 18 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <path d="M9 2L16.5 15H1.5L9 2z" stroke={c.extended.warningIconColor} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 7v4M9 13v.5" stroke={c.extended.warningIconColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconCheck = ({ size = 14, color = c.extended.successText }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke={color} />
    <path d="M4.5 7L6.5 9L9.5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconClose = ({ size = 12, color = c.type.muted }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M1 1l10 10M11 1L1 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconPlus = ({ size = 14, color = '#ffffff' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const IconSparkle = ({ size = 14, color = '#ffffff' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1l1.3 3.7L12 6l-3.7 1.3L7 11l-1.3-3.7L2 6l3.7-1.3z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

export const IconSearch = ({ size = 14, color = c.type.muted }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 14 14">
    <circle cx="6" cy="6" r="4.5" stroke={color} strokeWidth="1.2" />
    <path d="M9.5 9.5L13 13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const IconFilter = ({ size = 14, color = c.type.muted }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 14 14">
    <path d="M1 3h12M3 7h8M5 11h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export const IconCalendar = ({ size = 12, color = c.type.muted }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 12 12">
    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke={color} strokeWidth="1.1" />
    <path d="M4 1v2M8 1v2M1 5h10" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

export const IconPeople = ({ size = 12, color = c.type.muted }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 12 12">
    <circle cx="4.5" cy="4" r="2" stroke={color} strokeWidth="1.1" />
    <path d="M1 10c0-1.9 1.6-3 3.5-3s3.5 1.1 3.5 3" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="9" cy="4" r="1.5" stroke={color} strokeWidth="1.1" />
    <path d="M11 10c0-1.4-.9-2.3-2-2.6" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

export const IconDots = ({ size = 16, color = c.type.muted }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 16 16">
    <circle cx="8" cy="4" r="1.2" fill={color} />
    <circle cx="8" cy="8" r="1.2" fill={color} />
    <circle cx="8" cy="12" r="1.2" fill={color} />
  </svg>
)

export const IconExternalLink = ({ size = 12, color = c.type.muted }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 12 12">
    <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M8 1h3m0 0v3m0-3L5.5 6.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Sidebar nav icons ────────────────────────────────────────────────────────

export const IconNavBoards = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.4" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.4" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.4" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.4" />
  </svg>
)

export const IconNavBooks = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M4 4h10a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke={color} strokeWidth="1.4" />
    <path d="M15 6h3a2 2 0 012 2v10a2 2 0 01-2 2h-3" stroke={color} strokeWidth="1.4" />
    <path d="M7 9h5M7 12h5M7 15h3" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const IconNavResourceCenter = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke={color} strokeWidth="1.4" />
  </svg>
)

export const IconNavSmartBuilder = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M19 16l.75 2.25L22 19l-2.25.75L19 22l-.75-2.25L16 19l2.25-.75z" stroke={color} strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
)

export const IconNavDecisionHub = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.4" />
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.4" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
)

export const IconNavQuestionnaires = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth="1.4" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const IconNavUser = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.4" />
    <path d="M4 20c0-3.8 3.6-6 8-6s8 2.2 8 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const IconNavSettings = ({ size = 24, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.4" />
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.2-7.8L15.2 5.8M8.8 15.2l-1.6 1.6M4.2 4.2l1.6 1.6M16.8 16.8l1.4 1.4M4.2 19.8l1.6-1.6M16.8 7.2l1.4-1.4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

// ─── Context menu icons ───────────────────────────────────────────────────────

export const IconMenuUnpublish = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <rect x="1.5" y="2.5" width="15" height="10" rx="1.5" stroke={color} strokeWidth="1.3" />
    <path d="M6 16h6M9 12.5V16" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="13.5" cy="2.5" r="3" fill="white" />
    <circle cx="13.5" cy="2.5" r="2.5" stroke={color} strokeWidth="1.2" />
    <path d="M12 2.5h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export const IconMenuBell = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <path d="M9 1.5a5.5 5.5 0 00-5.5 5.5v3.5L2 13h14l-1.5-2.5V7A5.5 5.5 0 009 1.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M7 13v.5a2 2 0 004 0V13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconMenuArchive = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <rect x="1.5" y="2" width="15" height="3.5" rx="1" stroke={color} strokeWidth="1.3" />
    <path d="M2.5 5.5v9a1 1 0 001 1h11a1 1 0 001-1v-9" stroke={color} strokeWidth="1.3" />
    <path d="M9 8.5v4M7 10.5l2 2 2-2" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconMenuDuplicate = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <rect x="5.5" y="4.5" width="10" height="12" rx="1.5" stroke={color} strokeWidth="1.3" />
    <rect x="2.5" y="1.5" width="10" height="12" rx="1.5" stroke={color} strokeWidth="1.3" strokeDasharray="2.5 1.5" />
  </svg>
)

export const IconMenuReplace = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <path d="M14.5 6A6 6 0 103 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M3 6v3h3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 12A6 6 0 0015 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M15 12V9h-3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Top nav icons ────────────────────────────────────────────────────────────

export const IconOrgGrid = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <rect x="2" y="2" width="14" height="14" rx="2" stroke={color} strokeWidth="1.3"/>
    <path d="M2 7h14M2 11h14" stroke={color} strokeWidth="1.3"/>
    <path d="M7 7v9M11 7v9" stroke={color} strokeWidth="1.3"/>
  </svg>
)

export const IconChevronDown = ({ size = 14, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 14 14">
    <path d="M3 5l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const IconKeyboard = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <rect x="1.5" y="5" width="15" height="8" rx="1.5" stroke={color} strokeWidth="1.3"/>
    <path d="M4 8.5h1M6.5 8.5h1M9 8.5h1M11.5 8.5h1M14 8.5h0.5" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M4 11h1M6.5 11h1M9 11h1M11.5 11h1" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M5.5 11h5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

export const IconHelpCircle = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.3"/>
    <path d="M6.75 7a2.25 2.25 0 014.5 0c0 1.5-2.25 1.875-2.25 3.25" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="9" cy="13.25" r="0.75" fill={color}/>
  </svg>
)

export const IconUserCircle = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.3"/>
    <circle cx="9" cy="7.5" r="2.5" stroke={color} strokeWidth="1.3"/>
    <path d="M3.5 15.5c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

export const IconMenuUsers = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <circle cx="7" cy="6" r="2.5" stroke={color} strokeWidth="1.3" />
    <path d="M2 15c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="13" cy="6" r="2" stroke={color} strokeWidth="1.3" />
    <path d="M15.5 15c0-2-1.1-3.2-2.5-3.8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconMenuTrash = ({ size = 18, color }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <path d="M3 5h12" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5.5 5V4a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0112.5 4v1" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M4.5 5l.75 9.5a1 1 0 001 .9h5.5a1 1 0 001-.9L13.5 5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M7.5 8.5v4M10.5 8.5v4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
