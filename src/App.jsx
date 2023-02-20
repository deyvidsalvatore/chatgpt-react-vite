import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState('');
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generate_image = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    setResult(res.data.data[0].url);
  };
  return (
    <div className='app-main'>
      <h3>Generate an Image using Open AI API</h3>
      <input className='app-input' onChange={(e) => setPrompt(e.target.value)} placeholder="Type something to generate an image..."/>
      <button onClick={generate_image}>Generate an Image</button>

      {result.length > 0 ? <img className="result-image" src={result || ""} alt="result" /> : <></>}
    </div>
  )
}

export default App
