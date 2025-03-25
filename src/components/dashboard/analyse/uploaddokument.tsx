"use client"; 

import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Stack, Typography } from '@mui/material';
import { UploadFile as UploadFileIcon } from '@mui/icons-material';

interface AnalyseResultat {
  dokumentNavn: string;
  brud: string[];
}

export function UploadDokument(): React.JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analyseResultat, setAnalyseResultat] = useState<AnalyseResultat | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFile(file);
      kørDummyAnalyse(file);
    }
  };

  const kørDummyAnalyse = (file: File) => {
    // Dummy "AI-analyse" – Finder tilfældige GDPR-brud
    const dummyBrud = [
      "Manglende samtykkeafsnit",
      "Ingen kontaktoplysninger til DPO",
      "Databehandlingsaftale ikke nævnt",
    ];
    const randomBrud = dummyBrud.sort(() => 0.5 - Math.random()).slice(0, 2); // Vælg 2 tilfældige brud

    setAnalyseResultat({
      dokumentNavn: file.name,
      brud: randomBrud,
    });
  };

  return (
    <Card sx={{ p: 3, textAlign: 'center' }}>
      <Stack spacing={2}>
        <Typography variant="h6">Upload et dokument til GDPR-analyse</Typography>
        
        <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
          Vælg dokument
          <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
        </Button>

        {uploadedFile && (
          <>
            <Typography variant="body1" color="text.secondary">
              {uploadedFile.name} uploadet
            </Typography>
          </>
        )}

        {analyseResultat && (
          <Card sx={{ p: 2, mt: 2, bgcolor: 'var(--mui-palette-neutral-100)' }}>
            <Typography variant="h6">AI-analyse:</Typography>
            <Typography variant="body1">
              Dokument: <strong>{analyseResultat.dokumentNavn}</strong>
            </Typography>
            <Typography variant="body2" color="error">
              Fundne GDPR-brud:
            </Typography>
            <ul>
              {analyseResultat.brud.map((brud, index) => (
                <li key={index}>{brud}</li>
              ))}
            </ul>
          </Card>
        )}
      </Stack>
    </Card>
  );
}
