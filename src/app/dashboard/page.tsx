import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Compliance } from '@/components/dashboard/overview/compliance';
import { DokumentsTable } from '@/components/dashboard/dokumenter/dokument-tabel';
import { Overblik } from '@/components/dashboard/overview/overblik';
import { ComplianceChecklist } from '@/components/dashboard/overview/fremgang';
import { AI_analyse } from '@/components/dashboard/overview/AI_analyse';
import { Total_scanning } from '@/components/dashboard/overview/total_scanning';
import { GDPRInfo } from '@/components/dashboard/overview/GDPR_info';
import type { Dokument } from '@/components/dashboard/dokumenter/dokument-tabel';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

const dokumenter: Dokument[] = [
  {
    id: 'DOC-001',
    avatar: '/assets/pdf-icon.png',
    upload: new Date(),
    filtype: 1,
    status: 'Processed',
    størrelse: '2.5MB',
    createdAt: new Date(),
  },
  {
    id: 'DOC-002',
    avatar: '/assets/word-icon.png',
    upload: new Date(),
    filtype: 2,
    status: 'Pending',
    størrelse: '1.2MB',
    createdAt: new Date(),
  },
  {
    id: 'DOC-003',
    avatar: '/assets/excel-icon.png',
    upload: new Date(),
    filtype: 3,
    status: 'Failed',
    størrelse: '3.8MB',
    createdAt: new Date(),
  },
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const paginatedDokumenter = dokumenter.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Compliance complianceScore={85} riskLevel="Medium" sx={{ height: "100%" }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <AI_analyse
          missingDocuments={2}
          issues={["Cookie-banner forkert opsat", "Ingen privatlivspolitik link"]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <ComplianceChecklist />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Total_scanning value={250} sx={{ height: "100%" }}/>
      </Grid>

      <Grid lg={8} xs={12}>
        <Overblik
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }} 
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <GDPRInfo sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <DokumentsTable
          count={dokumenter.length}
          page={page}
          rows={paginatedDokumenter}
          rowsPerPage={rowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
