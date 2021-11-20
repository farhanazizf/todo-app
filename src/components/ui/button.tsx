import React from "react";
import { Button } from "@mui/material";

interface IProps {
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  bgColor?: string;
}

export const Buttons: React.FC<IProps> = ({
  type = "submit",
  disabled = false,
  onClick,
  width,
  bgColor,
  children,
}) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        boxShadow: "none",
        textTransform: "none",
        width,
        background: bgColor,
      }}
    >
      {children}
    </Button>
  );
};

export default Buttons;
