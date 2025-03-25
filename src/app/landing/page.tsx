'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SignInForm } from '@/components/auth/sign-in-form';
import GDPRScanner from "@/components/auth/GDPRScanner";
import { DynamicLogo } from '@/components/core/logo';

export default function LandingPage(): React.JSX.Element {
  const router = useRouter();
  const loginRef = useRef<HTMLDivElement | null>(null);

  // Tjek URL for "#login" og scroll automatisk til login-sektionen
  useEffect(() => {
    if (window.location.hash === '#login' && loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Box>
    {/* HEADER MED LOGO */}
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <Link href="/">
          <DynamicLogo colorDark="light" colorLight="dark" height={40} width={140} />
        </Link>
      </Box>

      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'white',
          padding: 3,
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography variant="h2">
            Velkommen til <Box component="span" sx={{ color: '#15b79e' }}>Nexpertia</Box>
          </Typography>
          <Typography variant="h5">
            GDPR compliance gjort nemt og hurtigt!
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} href="#login">
            Log ind
          </Button>
        </Stack>
      </Box>

      {/* INFO SECTION */}
      <Box sx={{
        background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)', 
        color: 'white',
        py: 6, px: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Hvorfor vælge os?</Typography>
        <Typography variant="body1">
          Nexpertia hjælper dig med GDPR-compliance på under 10 minutter. Undgå bøder og få ro i sindet.
        </Typography>

          {/* GDPR Scanner */}
      <Box ref={loginRef} id="GDPR" sx={{ py: 4, px: 3, display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={1} sx={{ maxWidth: '450px', width: '100%' }}>
          <Typography variant="h4" align="center"></Typography>
          <GDPRScanner />
        </Stack>
      </Box>
    </Box>

      {/* LOGIN SECTION */}
      <Box ref={loginRef} id="login" sx={{ py: 6, px: 3, display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={3} sx={{ maxWidth: '450px', width: '100%' }}>
          <Typography variant="h4" align="center"></Typography>
          <SignInForm />
        </Stack>
      </Box>
    </Box>
  );
}
