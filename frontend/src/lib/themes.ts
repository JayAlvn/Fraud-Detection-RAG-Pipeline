export interface ThemeColors {
    bg: string;
    panelBg: string;
    cardBg: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentText: string;
  }
  
  export const THEMES: { name: string; colors: ThemeColors }[] = [
    {
      name: 'Midnight Dark',
      colors: {
        bg: '#0F0F11',
        panelBg: '#18181A',
        cardBg: '#27272A',
        text: '#FAFAFA',
        textMuted: '#A1A1AA',
        border: '#3F3F46',
        accent: '#3B82F6',
        accentText: '#FFFFFF'
      }
    },
    {
      name: 'Minimal Light',
      colors: {
        bg: '#FAFAFA',
        panelBg: '#FFFFFF',
        cardBg: '#FAF9F6',
        text: '#111827',
        textMuted: '#6B7280',
        border: '#E5E7EB',
        accent: '#111827',
        accentText: '#FFFFFF'
      }
    }
  ];