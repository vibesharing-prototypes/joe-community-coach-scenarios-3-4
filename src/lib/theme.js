// Atlas Design System tokens — resolved from Figma file KO6WCc4DD9KMjD6Kj9skI5
export const theme = {
  color: {
    surface: {
      default: '#ffffff',
      variant: '#f0f0f3',
    },
    background: {
      base: '#ffffff',
      gradientStart: '#f9f9fc',
      gradientEnd: '#fcfcff',
    },
    type: {
      default: '#242628',
      inverse: '#1a1c1e',
      muted: '#5d5e61',
    },
    action: {
      secondaryOnSecondary: '#242628',
      secondaryOutline: '#76777a',
    },
    selection: {
      primaryDefault: '#ecf0ff',
      primaryOnSelected: '#0040d5',
      primaryIndicator: '#0040d5',
    },
    ui: {
      dividerDefault: '#e2e2e5',
      dividerSecondary: '#8f9193',
      outlineDefault: '#8f9193',
      accentHighlightedBackground: '#e2e2e5',
    },
    status: {
      newDefault: '#1c4ee4',
      newContentDefault: '#ffffff',
      neutralBackgroundVariant: '#e2e2e5',
      neutralContentVariant: '#242628',
    },
    ai: {
      gradientStart: '#be0c1e',
      gradientMiddle: '#ab48da',
      gradientEnd: '#4069fe',
    },
    // Extended: not in provided Atlas tokens but required for state feedback
    extended: {
      successBg: '#dcf0e3',
      successText: '#1a6b35',
      successConfirmBg: '#eaf3de',
      warningIconColor: '#ef9f27',
      warningIconBg: '#fef3e2',
      destructiveText: '#a32d2d',
    },
  },

  spacing: {
    0: '0px',
    '0_25': '2px',
    '0_5': '4px',
    1: '8px',
    '1_5': '12px',
    2: '16px',
    '2_5': '20px',
    3: '24px',
    4: '32px',
  },

  radius: {
    none: '0px',
    md: '8px',
    lg: '12px',
    wipCard: '12px',
    mainTopLeft: '32px',
  },

  icon: {
    sm: 16,
    md: 20,
    lg: 24,
  },

  layout: {
    canvasWidth: '1440px',
    sidebarWidth: '300px',
    contentMarginH: '32px',
    contentMaxWidth: '1440px',
    contentGutter: '24px',
    navItemLR: '12px',
    appHeaderMainGap: '12px',
    pageHeaderContentGap: '16px',
    betweenCardsGap: '12px',
    topNavHeight: '64px',
  },

  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    body: { fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.2px' },
    bodyEmphasis: { fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.2px' },
    md: { fontWeight: 400, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.3px' },
    mdEmphasis: { fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.3px' },
    h1Billboard: { fontWeight: 600, fontSize: '28px', lineHeight: '34px', letterSpacing: '0px' },
    labelSmEmphasis: { fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.3px' },
    labelXsEmphasis: { fontWeight: 600, fontSize: '11px', lineHeight: '16px', letterSpacing: '0.4px' },
    numberSmEmphasis: { fontWeight: 600, fontSize: '10px', lineHeight: '12px', letterSpacing: '0.3px' },
    buttonLg: { fontWeight: 600, fontSize: '16px', lineHeight: '25.5px', letterSpacing: '1px' },
    buttonSm: { fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '1px' },
  },

  input: {
    height: '40px',
  },
}
