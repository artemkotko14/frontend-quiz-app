import React from "react";
import StyledButton from "./StyledButton";
import "../styles/SubjectButton.scss";

type SubjectButtonProps = {
  label: string;
  image: string; // image will be imported and passed as a module
  bgColor: string;
  onClick?: () => void;
};

const SubjectButton: React.FC<SubjectButtonProps> = ({
  label,
  image,
  bgColor,
  onClick,
}) => {
  return (
    <StyledButton type="button" className="subject-button" onClick={onClick}>
      <div className="icon-wrapper" style={{ backgroundColor: bgColor }}>
        <img src={image} alt={`${label} icon`} className="subject-icon" />
      </div>
      <span>{label}</span>
    </StyledButton>
  );
};

export default SubjectButton;
