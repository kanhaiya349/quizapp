import { useContext, useState } from "react";
import { useQuiz } from "../context/QuizContext";

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState("");
  const { data } = useQuiz();
  const {setUser}=useQuiz()

  return (
    <div className="flex flex-col justify-center h-screen px-4 md:px-10 quiz-bg-start">
      <h1 className="text-3xl font-bold mb-4 my-8 flex flex-col lg:flex-row gap-3"><span>Welcome to the Quiz of</span> <span className="">{data.title}</span></h1>
      <div className="flex my-5 justify-between w-full">
        <div className="md:text-xl text-green-600 font-semibold">Marks: {data.correct_answer_marks}</div>
        <div className="md:text-xl text-red-600 font-semibold">Negative Marks: {data.negative_marks}</div>
      </div>
      <div className="md:text-xl mb-4 font-semibold">No. of questions: {data.questions_count}</div>
      <div className="md:text-xl mb-4 font-semibold">Time: {data.duration} sec per question</div>
      <input
        type="text"
        placeholder="Enter Your Name"
        className="p-2 border rounded-md mb-4 max-w-[400px] mx-auto mt-16"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md max-w-[200px] mx-auto hover:bg-blue-700 transition-all ease-in-out duration-500"
        onClick={() => {onStart(name);name!==""?setUser(name):""}}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
