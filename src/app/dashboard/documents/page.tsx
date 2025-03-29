// src/app/dashboard/dokumenter/page.tsx; 

'use client'; // Denne linje er nødvørndig for at TypeScript kan forstå, at det er en React-fil


import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Download as DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Upload as UploadIcon } from "@phosphor-icons/react/dist/ssr/Upload";
import { config } from "@/config";
import { DocumentFilters } from "@/components/dashboard/documents/document-filters";
import { DocumentsTable } from "@/components/dashboard/documents/document-tabel";
import { getUserDocuments } from "@/lib/api";
import type { Document } from "@/components/dashboard/documents/document-tabel";

export default function Page(): React.JSX.Element {
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [loading, setLoading] = React.useState(true);
  const page = 0;
  const rowsPerPage = 5;

  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getUserDocuments();
        const formattedDocuments = data.map((doc: any) => ({
          id: doc.document_id,
          avatar: "/assets/pdf-icon.png", // Evt. brug en dynamisk ikon-vælger
          upload: new Date(),
          filtype: 1,
          status: "Processed",
          størrelse: "2MB",
          createdAt: new Date(),
        }));

        setDocuments(formattedDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const paginatedDocuments = applyPagination(documents, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Dokumenter</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Upload
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Download
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Tilføj
          </Button>
        </div>
      </Stack>
      <DocumentFilters />
      {loading ? (
        <Typography>Loading dokumenter...</Typography>
      ) : (
        <DocumentsTable count={paginatedDocuments.length} page={page} rows={paginatedDocuments} rowsPerPage={rowsPerPage} />
      )}
    </Stack>
  );
}

function applyPagination(rows: Document[], page: number, rowsPerPage: number): Document[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
