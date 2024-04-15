import { useEffect, useState } from "react";
import "./App.css";
import { extractTitles, selectRandomTitle } from "./utils";
import { randomTopics } from "./random-topics";
import Landing from "./components/Landing";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { QuestionData } from "./types";
import Game from "./components/Game";
import Score from "./components/Score";

const BASE_URL = "https://frenzy.yikew40375.workers.dev";

function App() {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [error, setError] = useState<null | string>(null)

  const handleGetTitles = async (query: string) => {
    const resp = await fetch(`${BASE_URL}/options?query=${query}`);
    const response = await resp.json();
    if (response && response.text) {
      return response.text;
    }

    return "";
  };

  const handleGetImage = async (title: string) => {
    try{
      const resp = await fetch(`${BASE_URL}/image?title=${title}`);
      // const r = await resp.blob();
      // const url = URL.createObjectURL( r );
      if (!resp.ok) {
        setError('Faced some issue fetching image, please reload the page to start again.')
      }
      const buff = await resp.arrayBuffer();
      const blob = new Blob([buff]);
      const url = URL.createObjectURL(blob);
      return url || "";
    } catch(e){
      setError('Faced some issue fetching image, please reload the page to start again.')
      return "";
    }
  };

  const getQuestion = async (showLoader = false) => {
    console.log("get question", questions.length);
    showLoader && setLoading(true);
    const randomTopic = selectRandomTitle(randomTopics);
    const titles = await handleGetTitles(randomTopic);
    const formattedTitles = extractTitles(titles);
    const randomTitle = selectRandomTitle(formattedTitles);
    const img = await handleGetImage(randomTitle);
    const questionData: QuestionData = {
      options: formattedTitles,
      imageData: img,
      answer: randomTitle,
    };

    setQuestions((prevQuestion) => {return [...prevQuestion, questionData]});

    if (window.location.pathname === "/quiz" && currentQuestionNo === -1) {
      console.log("updated currentQuestion");
      setCurrentQuestionNo(0);
    }
    showLoader && setLoading(false);
  };

  useEffect(() => {
    getQuestion();
  }, [currentQuestionNo]);

  useEffect(()=>{
    getQuestion(true);
  },[])
  
  return (
    <div className="container">
      <Header />
      <div className="content">
        {error && <h2>{error}</h2>}
        <Routes>
          <Route
            path="/"
            element={<Landing setCurrentQuestionNo={setCurrentQuestionNo} />}
          />
          <Route
            path="/quiz"
            element={
              <Game
                questions={questions}
                currentQuestionNo={currentQuestionNo}
                setCurrentQuestionNo={setCurrentQuestionNo}
                loading={loading}
                setLoading={setLoading}
                getQuestion={getQuestion}
                setCorrectAnswers={setCorrectAnswers}
              />
            }
          />
           <Route
            path="/score"
            element={
              <Score
               totalQuestion={currentQuestionNo}
               correctAnswer={correctAnswers}
               resetQuestions={()=>{
                setCurrentQuestionNo(-1);
                setQuestions([])
                setLoading(true)
               }}
              />
            }
          />
        </Routes>
      </div>
      <div className="footer">
        <p className="read-the-docs">
          Project by Shweta Kale for Cloudflare dev.to challenge
        </p>
      </div>
    </div>
  );
}

export default App;
