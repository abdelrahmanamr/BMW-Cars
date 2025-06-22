import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface SpinnerProps {
  size?: number; // size of spinner (default 40)
  fullscreen?: boolean; // center spinner in full viewport (default false)
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, fullscreen = true }) => {
  if (fullscreen) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "transparent",
          zIndex: 1300, // above typical MUI modal zIndex
        }}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: size * 2,
        width: size * 2,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Spinner;
