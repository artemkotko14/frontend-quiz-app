import React from "react";
import StyledButton from "./StyledButton";
import "../styles/SubmitButton.scss";

type SubmitButtonProps = React.ComponentProps<typeof StyledButton>;

export default function SubmitButton({
  className = "",
  ...props
}: SubmitButtonProps) {
  return <StyledButton className={`submit-button ${className}`} {...props} />;
}
