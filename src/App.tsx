import { useEffect, useState } from 'react'
import './App.css'
import { extractTitles, fetchImageFromStream, selectRandomTitle } from './utils';
import { randomTopics } from './random-topics';

const BASE_URL = 'https://frenzy.yikew40375.workers.dev';

function App() {
  const [count, setCount] = useState(0)
  const [imageData, setImageData] = useState<string | null>(null);
  const [options, setOptions] = useState<string[] | null>(null);

  const handleGetTitles = async (query: string) => {
    const resp = await fetch(`${BASE_URL}/options?query=${query}`);
    const response = await resp.json();
    if (response && response.text) {
      return response.text;
    }

    return '';
  }

  const handleGetImage = async (title: string) => {
    const resp = await fetch(`${BASE_URL}/image?title=${title}`)
    const buff = await resp.arrayBuffer();
    const blob = new Blob([buff]);
    const url = URL.createObjectURL( blob );

    if(url) return url;
    // if (resp.body) {
    //   const img = await fetchImageFromStream(resp.body);
    //   return img;
    // }

    return '';
  }

  const getQuestion = async ()=> {
    const randomTopic = selectRandomTitle(randomTopics);
    const titles = await handleGetTitles(randomTopic);
    const formattedTitles =  extractTitles(titles);
    setOptions(formattedTitles);
    const randomTitle = selectRandomTitle(formattedTitles);
    const img = await handleGetImage(randomTitle);
    setImageData(img);
  }

  useEffect(() => {
    getQuestion();
  }, [])

  return (
    <>
      <div>
        {imageData && <img src={imageData} className="question" alt="question img" />}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Project by Shweta Kale for Cloudflare dev.to challenge
      </p>
    </>
  )
}

export default App
