"use client"; 

import { useState } from "react";
import { Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { complianceBlue, complianceGrey } from "../../styles/theme/colors";

export default function GDPRScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const scanWebsite = async () => {
    setLoading(true);
    const response = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <TextField
        label="Indtast webshop URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{
            input: { color: "#122647" }, // Input farve
            "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: complianceBlue[500] }, // Standard kantfarve (blå)
            "&:hover fieldset": { borderColor: complianceBlue[700] }, // Hover-effekt (mørkere blå)
            "&.Mui-focused fieldset": { borderColor: complianceBlue[700] }, // Fokus-effekt (mørkere blå)
            },
            "& .MuiInputLabel-root": {
            color: complianceBlue[700], // Label farve
            },
        }}
/>
      <Button
        variant="contained"
        color="primary"
        onClick={scanWebsite}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Scan"}
      </Button>

      {result && (
        <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
          <Typography variant="h6">Resultater:</Typography>
          <Typography>✅ Cookie-banner: {result.hasCookieBanner ? "Ja" : "Nej"}</Typography>
          <Typography>✅ Privatlivspolitik: {result.hasPrivacyPolicy ? "Ja" : "Nej"}</Typography>
          <Typography>✅ Antal cookies: {result.cookieCount}</Typography>
        </Box>
      )}
    </Box>
  );
}
