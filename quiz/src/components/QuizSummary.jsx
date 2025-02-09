import { useQuiz } from "../context/QuizContext";

const QuizSummary = () => {
  const { score,user } = useQuiz();

  return (
    <div className="flex flex-col items-center justify-center h-screen quiz-bg">
      <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-xl mb-4">{user} Score: <span className="text-green-500 font-bold">{score} points</span></p>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-500"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
};

export default QuizSummary;
