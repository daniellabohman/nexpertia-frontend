
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { config } from '@/config';
import { DokumentFilters } from '@/components/dashboard/dokumenter/dokument-filters';
import { DokumentsTable } from '@/components/dashboard/dokumenter/dokument-tabel';
import type { Dokument } from '@/components/dashboard/dokumenter/dokument-tabel'; // Ensure this path is correct

export const metadata = { title: `Dokumenter | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'DOC-001',
    avatar: '/assets/pdf-icon.png',
    upload: new Date(),
    filtype: 1, // F.eks. 1 = PDF, 2 = Word, osv.
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
  {
    id: 'DOC-004',
    avatar: '/assets/pdf-icon.png',
    upload: new Date(),
    filtype: 1,
    status: 'Processed',
    størrelse: '4.1MB',
    createdAt: new Date(),
  },
  {
    id: 'DOC-005',
    avatar: '/assets/word-icon.png',
    upload: new Date(),
    filtype: 2,
    status: 'Pending',
    størrelse: '900KB',
    createdAt: new Date(),
  },
] satisfies Dokument[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Dokumenter</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <DokumentFilters />
      <DokumentsTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Dokument[], page: number, rowsPerPage: number): Dokument[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
