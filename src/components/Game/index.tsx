import { useEffect, useState } from "react";
import { QuestionData } from "../../types";
import "./index.css";

interface Props {
  questions: QuestionData[];
  currentQuestionNo: number;
  setCurrentQuestion: (questionNo: number) => void;
}

const Game = (props: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(
    null,
  );
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  useEffect(() => {
    console.log(
      "<< totlal questions",
      props.questions.length,
      props.currentQuestionNo,
    );
    if (
      props.currentQuestionNo < 0 ||
      props.currentQuestionNo > props.questions.length
    ) {
      setCurrentQuestion(null);
    } else {
      setCurrentQuestion(props.questions[props.currentQuestionNo]);
    }
  }, [props.currentQuestionNo]);

  const checkAnswer = (option: string) => {
    setSelectedOption(option);
    // setIsCorrect(option === correctAnswer);
    setTimeout(() => {
      setSelectedOption(null);
      //   setIsCorrect(false);
    }, 2000);
  };

  return (
    <div>
      {currentQuestion && (
        <div className="quiz-container">
          <img
            src={currentQuestion.imageData}
            alt={currentQuestion.answer}
            className="quiz-image"
          />
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedOption === option ? (selectedOption === currentQuestion.answer ? "correct" : "wrong") : ""}`}
                onClick={() => checkAnswer(option)}
                //    disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
          answer: {currentQuestion.answer}
        </div>
      )}
    </div>
  );
};

export default Game;
