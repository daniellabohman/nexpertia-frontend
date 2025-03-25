import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GDPRScanner from "@/components/auth/GDPRScanner";
import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, // 1 kolonne på mobil, 2 kolonner på store skærme
    minHeight: '100vh', // Sikrer, at hele skærmen fyldes
    width: '100%', // Sørger for at tage hele bredden
  }}
>
  {/* Login-sektion */}
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
    <Box sx={{ maxWidth: '450px', width: '100%', margin: 'auto' }}>{children}</Box>
  </Box>

  {/* GDPR-sektion */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
      color: 'white',
      padding: 3,
    }}
  >
    <GDPRScanner />
  </Box>
</Box>

  );
}
