import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { config } from '@/config';
import { DokumentFilter } from '@/components/dashboard/analyse/dokumentfilter';
import { DokumentScan } from '@/components/dashboard/analyse/dokumentscan';
import { UploadDokument } from '@/components/dashboard/analyse/uploaddokument';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';

export const metadata = { title: `Analyse | Dashboard | ${config.site.name}` } satisfies Metadata;

interface Dokument {
  id: string;
  title: string;
  description: string;
  risiko: string;
  reference: string;
  standard: string;
  uploadedAt: Date;
}

const dokumenter: Dokument[] = [
  {
    id: 'DOC-001',
    title: 'Privatlivspolitik.pdf',
    description: 'Analyse af privatlivspolitikken på din hjemmeside.',
    risiko: 'Høj',
    reference: 'Artikel 13 GDPR',
    standard: 'ISO 27001',
    uploadedAt: dayjs().subtract(12, 'minute').toDate(),
  },
  {
    id: 'DOC-002',
    title: 'Cookie Policy.docx',
    description: 'Gennemgang af cookie-politik for overholdelse af GDPR.',
    risiko: 'Mellem',
    reference: 'Artikel 5 GDPR',
    standard: 'ISO 27701',
    uploadedAt: dayjs().subtract(3, 'hour').toDate(),
  },
  {
    id: 'DOC-003',
    title: 'Databehandleraftale.pdf',
    description: 'Dokumentation af databehandleraftaler.',
    risiko: 'Lav',
    reference: 'Artikel 28 GDPR',
    standard: 'NIST 800-53',
    uploadedAt: dayjs().subtract(1, 'day').toDate(),
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Scannede Dokumenter
      </Typography>

      {/* Søgefelt til filtrering */}
      <DokumentFilter />

      {/* Upload og scanning af dokumenter */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <UploadDokument />
        </Grid>
        <Grid item xs={12} md={6}>
          <DokumentScan />
        </Grid>
      </Grid>

      {/* Liste over tidligere analyserede dokumenter */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {dokumenter.map((doc) => (
          <Grid item key={doc.id} xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Stack spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    {doc.title.charAt(0)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h6">{doc.title}</Typography>
                    <Typography color="text.secondary">{doc.description}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <ClockIcon fontSize="var(--icon-fontSize-sm)" />
                  <Typography color="text.secondary" variant="body2">
                    Uploadet {dayjs(doc.uploadedAt).format('MMM D, YYYY')}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <DownloadIcon fontSize="var(--icon-fontSize-sm)" />
                  <Typography color="text.secondary" variant="body2">
                    Risiko: {doc.risiko}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
