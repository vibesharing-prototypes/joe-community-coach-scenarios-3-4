export const MEETINGS = [
  { id: 1, title: 'Regular board meeting',  date: 'Wed, April 15, 2026 · 6:00 PM', type: 'Regular board', status: 'upcoming', agendaDone: false },
  { id: 2, title: 'Finance committee',       date: 'Wed, April 22, 2026 · 5:30 PM', type: 'Finance',       status: 'upcoming', agendaDone: false },
  { id: 3, title: 'Special board meeting',   date: 'Sun, May 3, 2026 · 4:00 PM',    type: 'Regular board', status: 'upcoming', agendaDone: false },
  { id: 4, title: 'Regular board meeting',   date: 'Mar 18, 2026 · 6:00 PM',        type: 'Regular board', status: 'recent',   agendaDone: true  },
]

export const SECTION_TYPES = {
  standard:      { label: 'Standard',               color: '#6B7280' },
  consent:       { label: 'Consent section',         color: '#1A56DB' },
  publicComment: { label: 'Public comment section',  color: '#166534' },
  membersOnly:   { label: 'Members only',            color: '#6D28D9' },
}

export const INITIAL_SECTIONS_S3 = []

export const INITIAL_SECTIONS_S4 = [
  {
    id: 1, title: 'Call to Order', type: 'standard',
    items: [
      { id: 11, title: 'Pledge of Allegiance', hasNotes: false, attachments: [] },
      { id: 12, title: 'Roll Call',            hasNotes: false, attachments: [] },
    ],
  },
  {
    id: 2, title: 'Public Comment', type: 'publicComment',
    items: [],
  },
  {
    id: 3, title: 'Consent Agenda', type: 'consent',
    items: [
      { id: 31, title: 'Approval of minutes — March 18, 2026',  hasNotes: false, attachments: [{ name: 'Minutes_Mar18.pdf',  public: true  }] },
      { id: 32, title: 'Renewal of janitorial contract',         hasNotes: true,  attachments: [{ name: 'Contract_2026.pdf', public: true  }] },
    ],
  },
  {
    id: 4, title: 'Business Items', type: 'standard',
    items: [
      { id: 41, title: "Superintendent's Annual Report", hasNotes: true, attachments: [{ name: 'Supt_Report_2026.pdf', public: false }] },
    ],
  },
  {
    id: 5, title: 'Adjournment', type: 'standard',
    items: [
      { id: 51, title: 'Motion to adjourn', hasNotes: false, attachments: [] },
    ],
  },
]
