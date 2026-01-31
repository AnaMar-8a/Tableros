export interface Theme {
  bg: string;
  text: string;
  head: string;
  accent: string;
  sec: string;
  border: string;
  card: string;
  chart1: string;
  chart2: string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  light: Theme;
  dark: Theme;
}

export const THEMES: Record<string, ThemeDefinition> = {
  summan: {
    id: 'summan',
    name: 'Summan',
    light: {
      bg: '#FDFDFD',
      text: '#333333',
      head: '#1A1A1B',
      accent: '#A3C657',
      sec: '#F9D423',
      border: '#E69D4F',
      card: '#FFFFFF',
      chart1: '#A3C657',
      chart2: '#F9D423'
    },
    dark: {
      bg: '#1A1A1B',
      text: '#E0E0E0',
      head: '#F9D423',
      accent: '#A3C657',
      sec: '#F2B134',
      border: '#A3C657',
      card: '#252526',
      chart1: '#A3C657',
      chart2: '#F2B134'
    }
  },
  nutresa: {
    id: 'nutresa',
    name: 'Nutresa',
    light: {
      bg: '#F8F9FA',
      text: '#333333',
      head: '#2D5A27',
      accent: '#2D5A27',
      sec: '#76B82A',
      border: '#76B82A',
      card: '#FFFFFF',
      chart1: '#2D5A27',
      chart2: '#76B82A'
    },
    dark: {
      bg: '#121212',
      text: '#E0E0E0',
      head: '#8BD13F',
      accent: '#8BD13F',
      sec: '#2D5A27',
      border: '#4A773C',
      card: '#1E1E1E',
      chart1: '#8BD13F',
      chart2: '#4A773C'
    }
  },
  amop: {
    id: 'amop',
    name: 'AMOP',
    light: {
      bg: '#EEF2FF',
      text: '#1e293b',
      head: '#312e81',
      accent: '#6366f1',
      sec: '#d946ef',
      border: '#818cf8',
      card: '#FFFFFF',
      chart1: '#6366f1',
      chart2: '#d946ef'
    },
    dark: {
      bg: '#020617',
      text: '#e2e8f0',
      head: '#ffffff',
      accent: '#818cf8',
      sec: '#e879f9',
      border: '#1e293b',
      card: '#0f172a',
      chart1: '#818cf8',
      chart2: '#e879f9'
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Grises',
    light: {
      bg: '#f9fafb',
      text: '#4b5563',
      head: '#111827',
      accent: '#374151',
      sec: '#9ca3af',
      border: '#e5e7eb',
      card: '#FFFFFF',
      chart1: '#374151',
      chart2: '#9ca3af'
    },
    dark: {
      bg: '#000000',
      text: '#9ca3af',
      head: '#ffffff',
      accent: '#d4d4d4',
      sec: '#525252',
      border: '#262626',
      card: '#171717',
      chart1: '#d4d4d4',
      chart2: '#525252'
    }
  }
};
