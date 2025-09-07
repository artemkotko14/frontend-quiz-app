import React from "react";
import "../styles/ThemeToggle.scss";

type ColorMode = "light" | "dark";

type ThemeToggleProps = {
  imageLeft: string;
  imageRight: string;
  colorMode: ColorMode;
  onToggle: () => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  imageLeft,
  imageRight,
  colorMode,
  onToggle,
}) => {
  return (
    <div className="theme-toggle-wrapper">
      <img src={imageLeft} alt="Light mode" className="theme-icon" />

      <label className="theme-toggle">
        <input
          type="checkbox"
          checked={colorMode === "dark"}
          onChange={onToggle}
        />
        <span className="slider"></span>
      </label>

      <img src={imageRight} alt="Dark mode" className="theme-icon" />
    </div>
  );
};

export default ThemeToggle;
