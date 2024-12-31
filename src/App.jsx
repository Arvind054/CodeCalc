import { useState } from 'react'
import './App.css'
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from "react-markdown";
const KEY = 'AIzaSyAvM7ipxk6kgiJOwFbuxuy-9lmMglcU0_Y'
const genAI = new GoogleGenerativeAI(KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function App() {
  const [snippit, setSnippit] = useState('');
  const [output, setoutput] = useState('');
  const [btnTxt, setBtnTxt] = useState('Calculate');
  const [explBtn, setExplBtn] = useState('Get Explaination');
 async function handleSubmit(){
          setBtnTxt('Calculating...');
        const result = await model.generateContent(snippit + "calculate time and space complexity of this code in bigo notation and just provide the summary of two lines to show the time and space complexity of this code");
        setBtnTxt('Calculate');
       const value = result.response.text();
       setoutput(value);
  }
  async function handleExplaination(){
          setExplBtn('Getting Explaination...');
          const result = await model.generateContent(snippit + "explain the time and space complexity of this code in bigo notation");
          setExplBtn('Get Explaination');
          const value = result.response.text();
          setoutput(value);
  }
  return (
    <>
    <div className="main">
      <div className="intro">
      <h1>CodeCalc </h1>
       <p>Paste Your Code snippit below to kow the Time and Spcae Complexity of your Code in BigO notation.</p>
       </div>
       <div className="inputs">
          <textarea name="" id="" cols="30" rows="10" value={snippit} onChange={(e)=>setSnippit(e.target.value)}></textarea>
          <button onClick={handleSubmit}>{btnTxt}</button>
       </div>
       <div className="output">
          
          <p> <ReactMarkdown>{output}</ReactMarkdown>
             {output != '' && <button onClick={handleExplaination}>{explBtn}</button>}
          </p>
       </div>
       </div>

    </>
  )
}

export default App
