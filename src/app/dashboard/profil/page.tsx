'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { ProfilDetailForm } from '@/components/dashboard/profil/profil-form';
import { ProfilInfo } from '@/components/dashboard/profil/profil-info';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Bruger</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <ProfilInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <ProfilDetailForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
