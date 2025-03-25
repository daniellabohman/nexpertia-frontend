import type { ColorSystemOptions } from '@mui/material/styles';
import { complianceBlue, complianceGrey, complianceAccent, complianceError } from './colors'; 
import type { ColorScheme } from './types';

export const colorSchemes = {
  dark: {
    palette: {
      action: { disabledBackground: 'rgba(255, 255, 255, 0.12)' },
      background: {
        default: 'var(--mui-palette-neutral-950)', // Meget mørk baggrund
        defaultChannel: '18 21 23',
        paper: 'var(--mui-palette-neutral-900)', // Sekundær baggrund
        paperChannel: '32 36 38',
        level1: 'var(--mui-palette-neutral-800)',
        level2: 'var(--mui-palette-neutral-700)',
        level3: 'var(--mui-palette-neutral-600)',
      },
      common: { black: '#000000', white: '#ffffff' },
      divider: 'var(--mui-palette-neutral-700)',
      dividerChannel: '50 56 62',
      error: {
        ...complianceError,
        light: complianceError[300],
        main: complianceError[400],
        dark: complianceError[500],
        contrastText: 'var(--mui-palette-common-white)',
      },
      info: {
        ...complianceAccent,
        light: complianceAccent[300],
        main: complianceAccent[400],
        dark: complianceAccent[500],
        contrastText: 'var(--mui-palette-common-white)',
      },
      neutral: { ...complianceGrey },
      primary: {
        ...complianceBlue,
        light: complianceBlue[300],
        main: complianceBlue[400], // Mørkeblå primærfarve
        dark: complianceBlue[500],
        contrastText: 'var(--mui-palette-common-white)',
      },
      secondary: {
        ...complianceGrey,
        light: complianceGrey[300],
        main: complianceGrey[400], // Mørkegrå nuancer
        dark: complianceGrey[500],
        contrastText: 'var(--mui-palette-common-white)',
      },
      success: {
        ...complianceAccent,
        light: complianceAccent[300],
        main: complianceAccent[400],
        dark: complianceAccent[500],
        contrastText: 'var(--mui-palette-common-white)',
      },
      text: {
        primary: 'var(--mui-palette-neutral-100)', // Lys tekst på mørk baggrund
        primaryChannel: '240 244 248',
        secondary: 'var(--mui-palette-neutral-400)',
        secondaryChannel: '159 166 173',
        disabled: 'var(--mui-palette-neutral-600)',
      },
      warning: {
        light: '#FFD700',
        main: '#FFC107',
        dark: '#FF9800',
        contrastText: 'var(--mui-palette-common-black)',
      },
    },
  },
  light: {
    palette: {
      action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
      background: {
        default: 'var(--mui-palette-common-white)',
        defaultChannel: '255 255 255',
        paper: 'var(--mui-palette-common-white)',
        paperChannel: '255 255 255',
        level1: 'var(--mui-palette-neutral-50)',
        level2: 'var(--mui-palette-neutral-100)',
        level3: 'var(--mui-palette-neutral-200)',
      },
      common: { black: '#000000', white: '#ffffff' },
      divider: 'var(--mui-palette-neutral-200)',
      dividerChannel: '220 223 228',
      error: {
        ...complianceError,
        light: complianceError[400],
        main: complianceError[500],
        dark: complianceError[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      info: {
        ...complianceAccent,
        light: complianceAccent[400],
        main: complianceAccent[500],
        dark: complianceAccent[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      neutral: { ...complianceGrey },
      primary: {
        ...complianceBlue,
        light: complianceBlue[400],
        main: complianceBlue[500],
        dark: complianceBlue[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      secondary: {
        ...complianceGrey,
        light: complianceGrey[500],
        main: complianceGrey[600],
        dark: complianceGrey[700],
        contrastText: 'var(--mui-palette-common-white)',
      },
      success: {
        ...complianceAccent,
        light: complianceAccent[400],
        main: complianceAccent[500],
        dark: complianceAccent[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      text: {
        primary: 'var(--mui-palette-neutral-900)',
        primaryChannel: '33 38 54',
        secondary: 'var(--mui-palette-neutral-500)',
        secondaryChannel: '102 112 133',
        disabled: 'var(--mui-palette-neutral-400)',
      },
      warning: {
        light: '#FFD700',
        main: '#FFC107',
        dark: '#FF9800',
        contrastText: 'var(--mui-palette-common-black)',
      },
    },
  },
} satisfies Partial<Record<ColorScheme, ColorSystemOptions>>;
