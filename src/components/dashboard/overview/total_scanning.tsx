'use client'; 

import * as React from "react";
import { useEffect } from 'react';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box"; 
import { Barcode as ScanIcon } from "@phosphor-icons/react/dist/ssr/Barcode"; 
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { DriveFolderUpload as GoogleDriveIcon } from "@mui/icons-material";
import { Share as SharePointIcon } from "@mui/icons-material";

export interface Total_scanningProps {
  sx?: SxProps;
  value: number;
}

export function Total_scanning({ value, sx }: Total_scanningProps): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIntegration = (service: string) => {
    alert(`Forbinder til ${service}...`); // Her kan du tilføje en API-kald
    handleClose();
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }} spacing={3}>
            <Stack spacing={2}>
              <Typography color="text.secondary" variant="overline">
                Totale Scanninger
              </Typography>
              <Typography variant="h4">{value}</Typography>
            <Box sx={{ width: "200%", height: "4px", backgroundColor: "var(--mui-palette-primary-main)", mt: 1, }} />            </Stack>
            <Avatar sx={{ backgroundColor: "var(--mui-palette-primary-main)", height: 56, width: 56 }}>
              <ScanIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>





          {/* Knap til integration */}
          <Button variant="outlined" startIcon={<CloudUploadIcon />} onClick={handleClick}>
            Forbind med...
          </Button>

          {/* Dropdown-menu til valg af integration */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleIntegration("Google Drive")}>
              <GoogleDriveIcon sx={{ marginRight: 1 }} /> Google Drive
            </MenuItem>
            <MenuItem onClick={() => handleIntegration("SharePoint")}>
              <SharePointIcon sx={{ marginRight: 1 }} /> SharePoint
            </MenuItem>
          </Menu>
        </Stack>
      </CardContent>
    </Card>
  );
}
