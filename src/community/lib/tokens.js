/**
 * Community prototype theme tokens.
 * Atlas-mapped values from src/lib/theme.js where a match exists;
 * coach/product-specific values kept as named constants otherwise.
 * Exported as a single `c` object to match the reference usage pattern.
 */
import { theme } from '../../lib/theme.js'
const t = theme

export const c = {
  // ── Atlas-mapped ────────────────────────────────────────────────────────────
  blue:        t.color.selection.primaryOnSelected,  // #0040d5
  blueLight:   t.color.selection.primaryDefault,     // #ecf0ff
  bgPage:      t.color.surface.default,              // #ffffff
  bgApp:       t.color.surface.variant,              // #f0f0f3
  text:        t.color.type.default,                 // #242628
  textSub:     t.color.type.muted,                   // #5d5e61
  border:      t.color.ui.dividerDefault,            // #e2e2e5
  green:       t.color.extended.successText,         // #1a6b35
  greenLight:  t.color.extended.successBg,           // #dcf0e3
  amberLight:  t.color.extended.warningIconBg,       // #fef3e2
  warn:        t.color.extended.warningIconColor,    // #ef9f27
  dangerText:  t.color.extended.destructiveText,     // #a32d2d
  font:        t.typography.fontFamily,

  // ── No Atlas equivalent — kept as product/coach-specific constants ──────────
  blueMid:     '#B5D4F4',
  blueDark:    '#0C447C',
  blueBorder:  '#93C5FD',
  bgSubtle:    '#F9FAFB',
  bgHover:     '#F3F4F6',
  textMid:     '#374151',
  textMuted:   '#9CA3AF',
  borderMid:   '#D1D5DB',
  greenBorder: '#86EFAC',
  greenMid:    '#22C55E',
  amber:       '#92400E',
  amberBorder: '#FCD34D',
  danger:      '#991B1B',
  dangerLight: '#FEF2F2',
  dangerBorder:'#FCA5A5',
  compliance:  '#6D28D9',
  compLight:   '#EDE9FE',
  compBorder:  '#C4B5FD',
  red:         '#e8363d',  // Diligent brand red (logo)

  // ── Radius scale ────────────────────────────────────────────────────────────
  r4:  '4px',
  r6:  '6px',
  r8:  '8px',
  r10: '10px',
  r12: '12px',
  r16: '16px',
}
