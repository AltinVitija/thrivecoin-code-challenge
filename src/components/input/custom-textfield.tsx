import React, { FC } from "react";
import { Box, TextField, Typography, SxProps, Theme } from "@mui/material";

interface CustomTextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  maxLength?: number;
  isTextArea?: boolean;
  rows?: number;
  disabled?: boolean;
  errorText?: string;
  showErrorText?: boolean;
  sx?: SxProps<Theme>;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  value = "",
  onChange,
  maxLength,
  isTextArea = false,
  rows = 3,
  disabled = false,
  errorText,
  showErrorText = false,
  sx,
}) => {
  return (
    <Box sx={{ marginBottom: "16px", ...sx }}>
      {label && (
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: "8px",
            fontWeight: 500,
            color: disabled ? "text.disabled" : "text.primary",
          }}>
          {label}
        </Typography>
      )}
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          onChange(e);
        }}
        multiline={isTextArea}
        rows={isTextArea ? rows : undefined}
        fullWidth
        disabled={disabled}
        variant="outlined"
        error={showErrorText && Boolean(errorText)}
        helperText={showErrorText && errorText ? errorText : undefined}
        sx={{
          borderRadius: "8px",
          backgroundColor: disabled
            ? "action.disabledBackground"
            : "background.paper",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor:
                showErrorText && errorText ? "error.main" : "divider",
            },
            "&:hover fieldset": {
              borderColor:
                showErrorText && errorText ? "error.dark" : "text.primary",
            },
          },
          ...sx,
        }}
      />
      {maxLength && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "right",
            marginTop: "4px",
            color: disabled ? "text.disabled" : "text.secondary",
          }}>
          {value.length}/{maxLength}
        </Typography>
      )}
    </Box>
  );
};

export default CustomTextField;
