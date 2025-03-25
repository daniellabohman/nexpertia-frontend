import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ShieldCheckIcon } from "lucide-react"; // Ikon til GDPR-status


export interface AI_analyseProps {
  missingDocuments: number;
  issues: string[];
  sx?: object;
}

export const AI_analyse = ({ missingDocuments, issues, sx }: AI_analyseProps) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }} spacing={2}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Analyse overblik
              </Typography>
              <Typography variant="h4">{missingDocuments}</Typography>
            </Stack>
            {/* Ikon i cirkel-boks */}
            <Avatar sx={{ backgroundColor: "var(--mui-palette-primary-main)", height: 56, width: 56 }}>
              <ShieldCheckIcon size={32} color="white" />
            </Avatar>
          </Stack>

          {/* Problemområder-liste */}
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
            <Typography color="text.secondary" variant="body2">
              Mangler:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {missingDocuments} dokumenter
            </Typography>
          </Stack>
          <ul style={{ padding: 1 }}>
            {issues.map((issue, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center" }}>
                ❌ <Typography variant="body1" sx={{ ml: 1 }}>{issue}</Typography>
              </li>
            ))}
          </ul>

        </Stack>
      </CardContent>
    </Card>
  );
};