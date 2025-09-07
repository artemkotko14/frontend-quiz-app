import React from "react";
import "../styles/StyledButton.scss";

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function StyledButton({
  className = "",
  children,
  ...props
}: StyledButtonProps) {
  return (
    <button className={`styled-button ${className}`} {...props}>
      {children}
    </button>
  );
}
