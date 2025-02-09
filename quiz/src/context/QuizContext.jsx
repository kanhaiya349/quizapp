import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score,setScore]=useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [data,setData]=useState([])
  const [user,setUser]=useState("Your")
  
  useEffect(() => {
    // Fetch quiz data from API
    const fetchQuizData = async () => {
        try {
            const response = await axios.get("https://quizapp-backend-ak8g.onrender.com/api/proxy");

          const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
          };
  
          setQuestions(shuffleArray(response.data.questions));
          setData(response.data)
          console.log(response.data.questions)
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      };
    fetchQuizData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,setScore,
        quizCompleted,
        setQuizCompleted,
        data,
        user,setUser,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Custom Hook for easier context access
export const useQuiz = () => useContext(QuizContext);
