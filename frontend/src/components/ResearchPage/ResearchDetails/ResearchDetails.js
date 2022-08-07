import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function ResearchDetails() {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const authToken = localStorage.getItem("auth-token");

  const [research, setResearch] = useState({})
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://csecu-community.herokuapp.com/research/single/${id}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setResearch(data.research))
  }, [])

  return (
    <div className="container">
      <h3>Title: {research.title}</h3>
      <p>{research.description}</p>
      <h5>Publisher: {research.publisherName}</h5>
      <h5>{research.date}</h5>
      <h5>Research Paper</h5>
      <br />
      <div className="viewer" style={{height: "60vh"}}>
        {
          research.file ? 
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
            <Viewer fileUrl={`https://csecu-community.herokuapp.com/${research.file}`}
              plugins={[defaultLayoutPluginInstance]}>
            </Viewer>
          </Worker> :
          <p>Loading...</p>
        }
      </div>
    </div>
  );
}

export default ResearchDetails;
