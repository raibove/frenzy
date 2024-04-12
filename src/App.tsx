import { useEffect, useState } from "react";
import "./App.css";
import { extractTitles, selectRandomTitle } from "./utils";
import { randomTopics } from "./random-topics";
import Landing from "./components/Landing";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { QuestionData } from "./types";
import Game from "./components/Game";

const BASE_URL = "https://frenzy.yikew40375.workers.dev";

function App() {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  // const [imageData, setImageData] = useState<string | null>(null);
  // const [options, setOptions] = useState<string[] | null>(null);

  const handleGetTitles = async (query: string) => {
    const resp = await fetch(`${BASE_URL}/options?query=${query}`);
    const response = await resp.json();
    if (response && response.text) {
      return response.text;
    }

    return "";
  };

  const handleGetImage = async (title: string) => {
    const resp = await fetch(`${BASE_URL}/image?title=${title}`);
    // const r = await resp.blob();
    // const url = URL.createObjectURL( r );

    const buff = await resp.arrayBuffer();
    const blob = new Blob([buff]);
    const url = URL.createObjectURL(blob);
    if (url) return url;
    return "";
  };

  const getQuestion = async () => {
    console.log("get question", questions.length);
    const randomTopic = selectRandomTitle(randomTopics);
    const titles = await handleGetTitles(randomTopic);
    const formattedTitles = extractTitles(titles);
    const randomTitle = selectRandomTitle(formattedTitles);
    const img = await handleGetImage(randomTitle);
    // setImageData(img)
    const questionData: QuestionData = {
      options: formattedTitles,
      imageData: img,
      answer: randomTitle,
    };
    setQuestions([...questions, questionData]);

    if (window.location.pathname === "/quiz" && currentQuestion === -1) {
      console.log("updated currentQuestion");
      setCurrentQuestion(0);
    }

    // if (questions.length < 3) {
    //   setTimeout(() => {
    //     getQuestion();
    //   }, 1000);
    // }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Landing setCurrentQuestion={setCurrentQuestion} />}
          />
          <Route
            path="/quiz"
            element={
              <Game
                questions={questions}
                currentQuestionNo={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
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
