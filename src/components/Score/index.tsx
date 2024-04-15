import { useNavigate } from 'react-router-dom';
import './index.css'

interface ScoreCard {
    totalQuestion: number;
    correctAnswer: number;
    resetQuestions: ()=> void;
}

const Score = ({totalQuestion, correctAnswer, resetQuestions}: ScoreCard)=> {
    const navigate = useNavigate();

    return (
        <div>
        <div className='scorecard'>
            <p className='total'>Total Questions: {totalQuestion}</p>
            <p className='score'>Correct Answers: {correctAnswer}</p>
        </div>
        <button onClick={()=> {
            resetQuestions();
            navigate('/quiz');
        }}>Play Again</button>
        </div>
    )
}

export default Score;