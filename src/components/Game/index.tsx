import { useState } from "react";
import { QuestionData } from "../../types";
import "./index.css";
import { useNavigate } from "react-router-dom";

interface Props {
  questions: QuestionData[];
  currentQuestionNo: number;
  setCurrentQuestionNo: (questionNo: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getQuestion: (showLoading: boolean) => void;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>
}

const Game = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<null | string>(null);

  const navigate = useNavigate();

  const checkAnswer = (option: string) => {
    setSelectedOption(option);
    if(option === props.questions[props.currentQuestionNo].answer) {
      props.setCorrectAnswers((prevCorrectAns)=> { return prevCorrectAns+1} )
    }
    setTimeout(() => {
      props.setCurrentQuestionNo(props.currentQuestionNo + 1);
      const showLoading = props.questions.length - 1 <= props.currentQuestionNo; 
      props.getQuestion(showLoading);
    }, 2000);
  };

  return (
    <div>
      { props.loading && !props.questions[props.currentQuestionNo] &&
        (
          <div>
            Loading...
          </div>
        )
      }
      {!props.loading && props.questions[props.currentQuestionNo] && (
        <div className="quiz-container">
          <p className="ques">Guess the prompt for image below</p>
          <img
            src={props.questions[props.currentQuestionNo].imageData}
            alt={props.questions[props.currentQuestionNo].answer}
            className="quiz-image"
          />
          <div className="options">
            {props.questions[props.currentQuestionNo].options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedOption === option ? (selectedOption === props.questions[props.currentQuestionNo].answer ? "correct" : "wrong") : ""}`}
                onClick={() => checkAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {/* answer: {props.questions[props.currentQuestionNo].answer} */}
          <button onClick={()=>{navigate('/score')}} style={{marginTop: '7vh'}}>End Game</button>
        </div>
      )}
    </div>
  );
};

export default Game;
