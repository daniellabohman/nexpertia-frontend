'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FileText as FileIcon } from '@phosphor-icons/react/dist/ssr/FileText';
import CircularProgress from '@mui/material/CircularProgress';

export interface GDPRInfoProps {
  sx?: SxProps;
}

export function GDPRInfo({ sx }: GDPRInfoProps): React.JSX.Element {
  const [gdprUpdates, setGdprUpdates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulerer en API-request (kan erstattes med fetch senere)
    setTimeout(() => {
      setGdprUpdates([
        'Nye krav til samtykke for cookies.',
        'Skærpede regler for databehandlere.',
        'Strammere kontrol med tredjeparts dataoverførsler.',
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader title="Seneste GDPR-regler" />
      <CardContent>
        <Stack spacing={2}>
          {loading ? (
            <Stack direction="row" justifyContent="center">
              <CircularProgress />
            </Stack>
          ) : (
            gdprUpdates.map((update, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <FileIcon fontSize="var(--icon-fontSize-lg)" />
                <Typography variant="body1">{update}</Typography>
              </Stack>
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
