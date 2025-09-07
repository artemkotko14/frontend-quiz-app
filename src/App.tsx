import "./styles/App.scss";
import SubjectButton from "./components/SubjectButton";
import ThemeToggle from "./components/ThemeToggle";
import htmlIcon from "./assets/images/icon-html.svg";
import cssIcon from "./assets/images/icon-css.svg";
import jsIcon from "./assets/images/icon-js.svg";
import accessibilityIcon from "./assets/images/icon-accessibility.svg";
import { useEffect, useState } from "react";
import quizData from "../data.json";
import Quiz from "./components/Quiz";
import sunIconLight from "./assets/images/icon-sun-light.svg";
import moonIconLight from "./assets/images/icon-moon-light.svg";
import sunIconDark from "./assets/images/icon-sun-dark.svg";
import moonIconDark from "./assets/images/icon-moon-dark.svg";

const quizAssets: Record<string, { icon: string; color: string }> = {
  HTML: { icon: htmlIcon, color: "#fff5ed" },
  CSS: { icon: cssIcon, color: "#e0fdef" },
  JavaScript: { icon: jsIcon, color: "#ebf0ff" },
  Accessibility: { icon: accessibilityIcon, color: "#f6e7ff" },
};

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  title: string;
  icon: string;
  questions: Question[];
}

function App() {
  type ColorMode = "light" | "dark";

  const getInitialTheme = (): ColorMode => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
    }
    return "light";
  };

  const [theme, setTheme] = useState<ColorMode>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const sunIcon = theme === "dark" ? sunIconLight : sunIconDark;
  const moonIcon = theme === "dark" ? moonIconLight : moonIconDark;

  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  const quizzes: QuizData[] = quizData.quizzes;

  const handleSelectQuiz = (title: string) => {
    const quiz = quizzes.find((q) => q.title === title);
    if (quiz) setSelectedQuiz(quiz);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="menu-wrapper">
        {!selectedQuiz && (
          <>
            <header className="header">
              <div className="toggle">
                <ThemeToggle
                  imageLeft={sunIcon}
                  imageRight={moonIcon}
                  colorMode={theme}
                  onToggle={toggleTheme}
                />
              </div>
            </header>

            <main className="quiz-menu">
              <div className="main-section">
                <h1 className="title">
                  <span className="title-line">Welcome to the</span>
                  <b className="quiz-name">Frontend Quiz!</b>
                </h1>
                <p className="instruction-text">
                  Pick a subject to get started.
                </p>
              </div>
              <div className="subject-list">
                <SubjectButton
                  label="HTML"
                  image={htmlIcon}
                  bgColor="#fff5ed"
                  onClick={() => handleSelectQuiz("HTML")}
                />
                <SubjectButton
                  label="CSS"
                  image={cssIcon}
                  bgColor="#e0fdef"
                  onClick={() => handleSelectQuiz("CSS")}
                />
                <SubjectButton
                  label="JavaScript"
                  image={jsIcon}
                  bgColor="#ebf0ff"
                  onClick={() => handleSelectQuiz("JavaScript")}
                />
                <SubjectButton
                  label="Accessibility"
                  image={accessibilityIcon}
                  bgColor="#f6e7ff"
                  onClick={() => handleSelectQuiz("Accessibility")}
                />
              </div>
            </main>
          </>
        )}

        {selectedQuiz && (
          <>
            <header className="header">
              <div className="quiz-header-title">
                <div
                  className="quiz-icon-wrapper"
                  style={{
                    backgroundColor: quizAssets[selectedQuiz.title].color,
                  }}
                >
                  <img
                    src={quizAssets[selectedQuiz.title].icon}
                    alt={`${selectedQuiz.title} icon`}
                    className="quiz-icon"
                  />
                </div>
                <p className="header-title">{selectedQuiz.title}</p>
              </div>
              <ThemeToggle
                imageLeft={sunIcon}
                imageRight={moonIcon}
                colorMode={theme}
                onToggle={toggleTheme}
              />
            </header>

            <Quiz
              title={selectedQuiz.title}
              icon={quizAssets[selectedQuiz.title].icon}
              color={quizAssets[selectedQuiz.title].color}
              questions={selectedQuiz.questions}
              onBack={() => setSelectedQuiz(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
