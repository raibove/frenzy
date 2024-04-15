import { useNavigate } from "react-router-dom";
import "./index.css";

const Landing = ({
  setCurrentQuestionNo,
}: {
  setCurrentQuestionNo: (question: number) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="landing-con">
      <h4 className="landing-title">Image prompt guessing game.</h4>
      <p className="landing-subtitle">
        You will be shown an image and four possible prompts. Choose the correct
        prompt to score points. Good luck!
      </p>
      <button
        onClick={() => {
          setCurrentQuestionNo(0);
          navigate("/quiz");
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Landing;
