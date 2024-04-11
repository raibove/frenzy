import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

async function fetchImageFromStream(stream: ReadableStream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
  }

  const blob = new Blob(chunks, { type: 'image/jpeg' }); // Adjust type based on actual image format
  const imageUrl = URL.createObjectURL(blob);
  console.log(imageUrl)
  return imageUrl;
}

function App() {
  const [count, setCount] = useState(0)
  const [imageData, setImageData] = useState<string | null>(null);

  const handleGetImage = async ()=>{
    const url = 'https://frenzy.yikew40375.workers.dev/';
    const resp = await fetch(url)
    console.log(resp.body)
    if(resp.body){
    const img = await fetchImageFromStream(resp.body);
    setImageData(img);
    }
  }
  
  useEffect(()=>{
    handleGetImage()
  }, [])

  return (
    <>
      <div>
        {imageData && <img src={imageData} className="logo react" alt="React logo" />}
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
