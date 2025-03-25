"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';

const checklistItems = [
  'Databeskyttelsespolitik opdateret',
  'Medarbejdertræning gennemført',
  'Risikovurdering foretaget',
  'Sikkerhedsforanstaltninger implementeret',
  'Brugersamtykke dokumenteret',
];

export function ComplianceChecklist(): React.JSX.Element {
  const [checked, setChecked] = React.useState<boolean[]>(
    new Array(checklistItems.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const progress = (checked.filter(Boolean).length / checklistItems.length) * 100;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={2}>
              <Typography color="text.secondary" variant="overline">
                Compliance Fremgang
              </Typography>
              <Typography variant="h4">{Math.round(progress)}%</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: "var(--mui-palette-primary-main)", height: 56, width: 56 }}>
              <ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <LinearProgress value={progress} variant="determinate" />
          <Stack spacing={2}>
            {checklistItems.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox 
                    checked={checked[index]} 
                    onChange={() => handleToggle(index)}
                    sx={{ transform: "scale(0.8)" }} // Gør checkboxene mindre
                  />
                }
                label={<Typography sx={{ fontSize: "0.75rem" }}>{item}</Typography>} // Mindre skrift
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}