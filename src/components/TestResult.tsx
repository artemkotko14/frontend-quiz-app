import React from "react";
import "../styles/TestResult.scss";
import StyledButton from "./StyledButton";
import SubmitButton from "./SubmitButton";
interface TestResultProps {
  title: string;
  score: number;
  icon: string;
  color: string;
  totalQuestions: number;
  onBack: () => void;
}
const TestResult: React.FC<TestResultProps> = ({
  title,
  icon,
  color,
  score,
  totalQuestions,
  onBack,
}) => {
  return (
    <main className="result-screen">
      <h2 className="quiz-status">
        Quiz Completed
        <br />
        <b className="score-text">You scored...</b>
      </h2>
      <div className="result-container">
        <div className="result-content">
          <div className="result-header">
            <div
              className="result-icon-wrapper"
              style={{ backgroundColor: color }}
            >
              <img src={icon} alt={`${title} icon`} className="result-icon" />
            </div>
            <div className="result-title">{title}</div>
          </div>
          <div className="score-details">
            <p className="score-number">{score}</p>
            <p className="score-description">out of {totalQuestions}</p>
          </div>
        </div>
        <SubmitButton onClick={onBack}>Play Again</SubmitButton>
      </div>
    </main>
  );
};

export default TestResult;
