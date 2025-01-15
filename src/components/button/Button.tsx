import React from "react";
import { Button, SxProps, Theme, useTheme, useMediaQuery } from "@mui/material";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  icon,
  iconPosition = "right",
  width = "auto",
  height = "48px",
  disabled = false,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonSx: SxProps<Theme> = {
    width: isMobile ? "100%" : width,
    height: isMobile ? "40px" : height,
    padding: isMobile ? "0 12px" : "0 24px",
    borderRadius: "8px",
    backgroundColor: disabled ? "#bdbdbd" : "#000000",
    fontFamily: "Manrope, sans-serif",
    fontSize: isMobile ? "12px" : "15px",
    lineHeight: 1.2,
    color: "#ffffff",
    textDecoration: "none",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: disabled ? "#bdbdbd" : "#000000",
    },
    ...sx,
  };

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      startIcon={iconPosition === "left" ? icon : null}
      endIcon={iconPosition === "right" ? icon : null}
      sx={buttonSx}>
      {text}
    </Button>
  );
};

export default CustomButton;
