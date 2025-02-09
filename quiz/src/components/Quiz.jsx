import { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Quiz = () => {
  const { questions, setScore, currentQuestionIndex, setCurrentQuestionIndex, setQuizCompleted } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timerId, setTimerId] = useState(null); // Store timer reference
  const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options

  if (questions.length === 0) return <div>Loading questions...</div>;

  const question = questions[currentQuestionIndex];

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (!questions.length) return;

    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setShuffledOptions(shuffleArray(question.options)); // Shuffle options

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleNextQuestion();
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerId(timer); // Store timer ID

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentQuestionIndex, questions.length]);

  const handleAnswer = (option) => {
    if (selectedOption !== null) return; // Prevent selecting again

    clearInterval(timerId); // Stop the timer when an answer is selected

    setSelectedOption(option);
    setIsAnswerCorrect(option.is_correct);

    setScore((prevScore) => (option.is_correct ? prevScore + 4 : prevScore - 1));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className={`flex flex-col px-4 md:px-16 ${selectedOption?"h-[100%]":"h-screen"} quiz-bg-quiz pt-10`}>
      <div className="text-green-700 font-semibold">{question.topic}</div>
      <h2 className="text-2xl font-semibold mb-4 text-white">{`${currentQuestionIndex + 1}. ${question.description}`}</h2>
      <div className="flex w-full justify-between font-semibold mb-4">
        <div className="text-green-600">Marks: +4</div>
        <div className="text-red-400">Negative: -1</div>
      </div>
      <div className="flex w-full justify-between mb-4">
        <div className="text-lg font-bold text-red-500 mb-4">Time Left: {timeLeft}s</div>
        <div className="text-blue-600 font-semibold">{question.question_from}</div>
      </div>

      <div className="grid gap-3 mt-4 max-w-[300px]">
        {shuffledOptions.map((option, index) => {
          const isCorrectOption = option.is_correct;
          const isSelected = option === selectedOption;
          const shouldHighlightCorrect = !isAnswerCorrect && isCorrectOption && selectedOption;

          return (
            <button
              key={index}
              className={`px-6 py-2 rounded-md ${
                isSelected
                  ? isAnswerCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : shouldHighlightCorrect
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-blue-400"
              }`}
              onClick={() => handleAnswer(option)}
              disabled={selectedOption !== null}
            >
              {option.description}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div>
          <button
            onClick={handleNextQuestion}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next Question
          </button>
          <div className="mt-6 text-white">{question.detailed_solution}</div>
          <div className="mt-16 mb-4 font-bold text-white">Reading Materials:</div>
          {question.reading_material.content_sections.map((items, index) => (
            <div className="mb-10 text-white" key={index} dangerouslySetInnerHTML={{ __html: items }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
