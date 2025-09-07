import { useState } from "react";
import TestResult from "./TestResult";
import StyledButton from "./StyledButton";
import "../styles/Quiz.scss";
import SubmitButton from "./SubmitButton";
import ErrorIcon from "../assets/images/icon-error.svg";
import IconCorrect from "../assets/images/icon-correct.svg";
import IconIncorrect from "../assets/images/icon-incorrect.svg";

interface Question {
  question: string;
  options: string[]; //An array of possible answer choices
  answer: string;
}

interface QuizProps {
  title: string;
  icon: string;
  color: string;
  questions: Question[];
  onBack: () => void; //A function used to go back to the previous screen
}

export default function Quiz({
  title,
  icon,
  color,
  questions,
  onBack,
}: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentOption, setCurrentOption] = useState<string>("");
  const [error, setError] = useState(false);
  const [barValue, setBarValue] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [submittedOption, setSubmittedOption] = useState<string | null>(null);

  const q = questions[currentIndex]; //current question

  const setOption = (option: string) => {
    if (!answerSubmitted) {
      setCurrentOption(option);
      setError(false);
      setCorrectAnswer(false);
    }
  };

  const submitAnswer = () => {
    if (!currentOption) {
      setError(true);
      return;
    }

    if (!answerSubmitted) {
      // First click = "Submit Answer"
      setError(false);
      setAnswerSubmitted(true);
      setSubmittedOption(currentOption);

      if (currentOption === q.answer) {
        setScore((prev) => prev + 1);
        setCorrectAnswer(true);
      }
    } else {
      // Second click = "Next Question"
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setBarValue((prev) => prev + 1);
        setCurrentOption("");
        setCorrectAnswer(false);
        setAnswerSubmitted(false); // reset for next round
      } else {
        setShowResult(true);
      }
    }
  };

  if (showResult) {
    return (
      <TestResult
        title={title}
        icon={icon}
        color={color}
        score={score}
        totalQuestions={questions.length}
        onBack={onBack}
      />
    );
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className="quiz-screen">
      <div className="question-container">
        <p className="question-number">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <h3 className="question">{q.question}</h3>
        <div className="progress-bar-container">
          <progress
            className="progress-bar"
            value={barValue}
            max="10"
          ></progress>
        </div>
      </div>
      <div className="answer-options-container">
        <div className="options">
          {q.options.map((opt, index) => (
            <StyledButton
              key={opt}
              className={`answer-option 
              ${currentOption === opt ? "selected" : ""}
              ${
                answerSubmitted &&
                currentOption === opt &&
                currentOption === q.answer
                  ? "correctAnswer"
                  : ""
              }        
              ${
                answerSubmitted &&
                currentOption === opt &&
                currentOption !== q.answer
                  ? "wrongAnswer"
                  : ""
              }
              `}
              onClick={() => setOption(opt)}
              type="button"
            >
              <div className="answer-label">{alphabet[index]}</div>
              <span>{opt}</span>
              <div className="icon-container">
                {answerSubmitted && opt === q.answer && (
                  <img
                    src={IconCorrect}
                    alt="Correct"
                    className="answer-icon"
                  />
                )}
                {answerSubmitted &&
                  currentOption === opt &&
                  currentOption !== q.answer && (
                    <img
                      src={IconIncorrect}
                      alt="Wrong"
                      className="answer-icon"
                    />
                  )}
              </div>
            </StyledButton>
          ))}
        </div>
        <SubmitButton
          className={`submit-button ${error ? "muted" : ""}`}
          onClick={submitAnswer}
        >
          {currentIndex + 1 === questions.length && answerSubmitted
            ? "End Quiz"
            : answerSubmitted
            ? "Next Question"
            : "Submit Answer"}
        </SubmitButton>
        <div className={`error-message-container ${error ? "show" : ""}`}>
          <img className="error-icon" src={ErrorIcon} alt="error" />
          <span className="error-message">Please select an answer</span>
        </div>
      </div>
    </main>
  );
}
