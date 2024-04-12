import { useEffect, useState } from "react";
import { QuestionData } from "../../types";

interface Props {
    questions: QuestionData[],
    currentQuestionNo: number
}

const Game = (props: Props)=> {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);

    useEffect(()=>{
        if(props.currentQuestionNo < 0 || props.currentQuestionNo > props.questions.length){
            setCurrentQuestion(null);
        } else{
            setCurrentQuestion(props.questions[props.currentQuestionNo]);
        }
    }, [props.currentQuestionNo])

    return (
        <div>
            {currentQuestion && (
                <img src={currentQuestion.imageData} alt={currentQuestion.answer}/>
            )}
        </div>
    )
}

export default Game;