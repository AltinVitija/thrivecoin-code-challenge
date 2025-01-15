import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message,
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      aria-busy="true"
      aria-live="polite">
      <div className="flex flex-col items-center">
        <CircularProgress color="inherit" />
        {message && <p className="mt-4 text-white text-lg">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay;
