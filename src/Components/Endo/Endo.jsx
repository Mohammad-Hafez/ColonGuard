import { Canvas } from 'canvas';
import React, { useState } from 'react';
import { useRef } from 'react';
import {Helmet} from "react-helmet";

export default function Endo() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canvasContext, setCanvasContext] = useState(null);
  const [detectPolyps, setDetectPolyps] = useState(false);
  const [DetextBtnLoad, setDetextBtnLoad] = useState(false)
  const [DetectData, setDetectData] = useState()
  const canvasRef = useRef(null);
  const handleSelectImage = () => {
    document.getElementById('file1').click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // set loading state to true
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await fetch('http://localhost:5000/endoscopy/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data[0].to_image);
    } catch (error) {
      setResult('An error occurred while processing the request');
    } finally {
      setLoading(false); // set loading state to false when the request is completed
    }
  };

  const detect = () => {
    setDetectPolyps(true)
    if (typeof result === 'string' && result.toLowerCase().includes('hyperplastic')) {
      detectHyper();
    } else if (typeof result === 'string' && result.toLowerCase().includes('adenomatous')) {
      detectAdeno();
    } else {
      setResult("This Entered Image Can't Be Detected.");
    }
  };
  
  const detectAdeno = async () => {
    const formData = new FormData();
    setDetextBtnLoad(true)
    formData.append('image', selectedImage);
    try {
      const response = await fetch('http://localhost:5000/adeno', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setDetectData(data[0])
      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = 416;
        canvas.height = 416;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0 , 416 , 416);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(data[0].bbox_list[2], data[0].bbox_list[3], data[0].bbox_list[0] - data[0].bbox_list[2], data[0].bbox_list[1] - data[0].bbox_list[3]);
        ctx.stroke();
        setCanvasContext(ctx);
      };
            } catch (error) {
      console.log('An error occurred while processing the request');
    }
    setDetextBtnLoad(false)
  };  

  const detectHyper = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await fetch('http://localhost:5000/hyper', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setDetectData(data[0])
      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = 416;
        canvas.height = 416;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0 , 416 , 416);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(data[0].bbox_list[2], data[0].bbox_list[3], data[0].bbox_list[0] - data[0].bbox_list[2], data[0].bbox_list[1] - data[0].bbox_list[3]);
        ctx.stroke();
        setCanvasContext(ctx);
      };
            } catch (error) {
      console.log('An error occurred while processing the request');
    }
    setDetextBtnLoad(false)
  };  
  const hideDetect = ()=>{
    setDetectPolyps(false)
    setDetectData()
  }
  return <>
    <Helmet>
    <title>ClonGuard | Endoscopy</title>
    </Helmet>
    <section id="endoscopy" className="endoscopy mb-5">
      <div className="section-title">
        <h2>Endoscopy</h2>
      </div>
      {detectPolyps ? 
        <div className="overlay d-flex justify-conetent-center align-items-center" style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999}}>
          <div className="overlay-container container rounded p-2 mx-auto" style={{backgroundColor: '#fff', width: 'auto', overflow: 'auto'}}>
            <figure>
            <canvas ref={canvasRef} /> 
            </figure>
            <div className="d-flex align-items-center justify-content-around">
            {DetextBtnLoad && <>
            <button type="button" className='btn btn-secondary black-btn-shadow me-2'><i className=' fa fa-spin fa-spinner'></i></button>
            </>
            }
            <button className='btn btn-danger' onClick={hideDetect}>Close</button>
            <span className='text-capitalize fs-5'>{DetectData?.class_name} {DetectData && ':'}  {DetectData?.conf ? <> {(DetectData.conf * 100).toFixed(2)} %</> : ''}</span>
            </div>
          </div>
        </div>
        :
        <div className="form-box secContainer bg-light w-50 shadow-sm text-center mx-auto py-4 rounded">
        <form action="#" id="myform" onSubmit={handleSubmit} method="post">
          <div className="endoForm mx-auto w-75 p-2 rounded bgr-light">
            <input type="file" id="file1" accept="image/jpeg, image/png, image/jpg" hidden onChange={handleImageChange} />
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Endo Image" className="w-100 mb-2 rounded" style={{ height: '200px', objectFit: 'contain' }} />
            ) : (
              <>
                <div className="img-area  w-75 position-relative mx-auto py-5 mb-3 rounded overflow-hidden bg-grey d-flex justify-content-center align-items-center flex-column" data-img="">
                  <i className="bx bxs-cloud-upload icon fs-1 w-100"></i>
                  <h3>Upload Image</h3>
                  <p>
                    Upload Image Of <span className="fw-bold">Endoscopy</span> (jpg, png, jpeg)
                  </p>
                </div>
              </>
            )}
            {result ?<>
              <p className="text-success my-1"><span className="text-dark-blue">Result :</span> {result}</p>
              {/* <button type="button" className='btn btn-secondary black-btn-shadow me-2'><i className=' fa fa-spin fa-spinner'></i></button> */}
              <button className='btn btn-secondary me-2' onClick={detect}>Detect ?</button>
              <button type="button" className="btn btn-danger black-btn-shadow" onClick={() => { setSelectedImage(null); setResult(null); }}>
                Reset
              </button>
              </>
              :
              <>
              <button type="button" className="btn btn-primary w-50 mb-2" id="selectimage" onClick={handleSelectImage}>
                Select Image
              </button>
              <br />
              <div className="text-center mb-2">
                {loading ? (
                  <button type="button" className='btn btn-success w-50 black-btn-shadow'><i className=' fa fa-spin fa-spinner'></i></button>
                ) : (
                  <input type="submit" value="Submit" className="btn btn-success w-50 black-btn-shadow" disabled={loading} />
                )}
              </div>
              </> 
            }
            <div>
            </div>
          </div>
        </form>
        </div>
    }
    </section>
    </>;
}