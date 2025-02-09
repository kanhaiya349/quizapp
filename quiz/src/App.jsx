import { useState } from "react";
import { useQuiz } from "./context/QuizContext";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import QuizSummary from "./components/QuizSummary";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const { quizCompleted } = useQuiz();

  return (
    <div className="">
      {!quizStarted ? (
        <StartScreen onStart={() => setQuizStarted(true)} />
      ) : quizCompleted ? (
        <QuizSummary />
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
