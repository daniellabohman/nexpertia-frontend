"use client";

import * as React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Stack,
  Typography,
  LinearProgress,
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";
import { UploadFile as UploadFileIcon, Download as DownloadIcon } from "@mui/icons-material";

interface RisikoVurdering {
  dokumentNavn: string;
  brud: { problem: string; risiko: "Lav" | "Mellem" | "Høj" }[];
}

const dokumentSkabeloner: Record<string, string> = {
  "Privatlivspolitik": "Dette er en generisk privatlivspolitik. [Rediger tekst her]",
  "Databehandleraftale": "Dette er en generisk databehandleraftale. [Rediger tekst her]",
  "Compliance-dokument": "Dette er et compliance-dokument. [Rediger tekst her]",
};

export function DokumentScan(): React.JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analyseResultat, setAnalyseResultat] = useState<RisikoVurdering | null>(null);
  const [loading, setLoading] = useState(false);
  const [valgtDokument, setValgtDokument] = useState<string>("");
  const [dokumentIndhold, setDokumentIndhold] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFile(file);
      setLoading(true);

      setTimeout(() => {
        kørDummyAnalyse(file);
        setLoading(false);
      }, 2000);
    }
  };

  const kørDummyAnalyse = (file: File) => {
    const dummyBrud: { problem: string; risiko: "Lav" | "Mellem" | "Høj" }[] = [
      { problem: "Manglende samtykkeafsnit", risiko: "Høj" },
      { problem: "Ingen kontaktoplysninger til DPO", risiko: "Mellem" },
      { problem: "Databehandlingsaftale ikke nævnt", risiko: "Lav" },
    ];
    const randomBrud = dummyBrud.sort(() => 0.5 - Math.random()).slice(0, 2);

    setAnalyseResultat({
      dokumentNavn: file.name,
      brud: randomBrud,
    });
  };

  const handleDokumentValg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valgt = event.target.value;
    setValgtDokument(valgt);
    setDokumentIndhold(dokumentSkabeloner[valgt] || "");
  };

  const downloadDokument = () => {
    const blob = new Blob([dokumentIndhold], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${valgtDokument}.txt`;
    link.click();
  };

  return (
    <Card sx={{ p: 3, textAlign: "center" }}>
      <Stack spacing={2}>
        <Typography variant="h6">Upload et dokument til GDPR-analyse</Typography>

        <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
          Vælg dokument
          <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.docx,.txt" />
        </Button>

        {loading && <LinearProgress sx={{ width: "100%" }} />}

        {uploadedFile && !loading && (
          <Typography variant="body1" color="text.secondary">
            {uploadedFile.name} uploadet
          </Typography>
        )}

        {analyseResultat && !loading && (
          <Card sx={{ p: 2, mt: 2, bgcolor: "var(--mui-palette-neutral-100)" }}>
            <Typography variant="h6">AI-analyse:</Typography>
            <Typography variant="body1">
              Dokument: <strong>{analyseResultat.dokumentNavn}</strong>
            </Typography>

            <Typography variant="body2" color="error">
              Fundne GDPR-brud:
            </Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {analyseResultat.brud.map((brud, index) => (
                <Chip
                  key={index}
                  label={`${brud.problem} - Risiko: ${brud.risiko}`}
                  color={brud.risiko === "Høj" ? "error" : brud.risiko === "Mellem" ? "warning" : "success"}
                />
              ))}
            </Stack>
          </Card>
        )}

        {/* Dokumentgenerator */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          📄 Generér et compliance-dokument
        </Typography>
        <TextField
          select
          label="Vælg dokumenttype"
          value={valgtDokument}
          onChange={handleDokumentValg}
          fullWidth
        >
          {Object.keys(dokumentSkabeloner).map((dokType) => (
            <MenuItem key={dokType} value={dokType}>
              {dokType}
            </MenuItem>
          ))}
        </TextField>

        {valgtDokument && (
          <TextField
            label="Rediger dokument"
            multiline
            minRows={5}
            value={dokumentIndhold}
            onChange={(e) => setDokumentIndhold(e.target.value)}
            fullWidth
          />
        )}

        {valgtDokument && (
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadDokument}>
            Download {valgtDokument}
          </Button>
        )}
      </Stack>
    </Card>
  );
}
