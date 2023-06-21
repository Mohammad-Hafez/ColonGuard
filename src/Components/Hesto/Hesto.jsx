import React, { useState } from 'react';
import {Helmet} from "react-helmet";

export default function Hesto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = () => {
    document.getElementById('file').click();
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
      const response = await fetch('http://localhost:5000/histopathology/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult('An error occurred while processing the request');
    } finally {
      setLoading(false); // set loading state to false when the request is completed
    }
  };

  return <>
      <Helmet>
      <title>ClonGuard | Histopathology</title>
    </Helmet>

    <section id="histopathology" className="histopathology mb-5">
      <div className="section-title">
        <h2>Histopathology</h2>
      </div>
      <div className="form-box secContainer bg-light text-center w-50 shadow-sm rounded mx-auto py-4">
        <form action="#" id="myform" onSubmit={handleSubmit} method="post">
          <div className="histoForm mx-auto w-75 p-2 rounded bgr-light">
            <input type="file" id="file" accept="image/jpeg, image/png, image/jpg" hidden onChange={handleImageChange} />

            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Hesto Image" className="w-100 mb-2 rounded" style={{ height: '200px', objectFit: 'contain' }} />
            ) : (
              <div className="img-area w-75 position-relative mx-auto py-5 mb-3 rounded overflow-hidden bg-grey d-flex justify-content-center align-items-center flex-column" data-img="">
                <i className="fa-solid fa-cloud-arrow-up fs-2 cursor-pointer"></i>
                <h3 className="fw-medium">Upload Image</h3>
                <p>Upload Image Of <span className="fw-bold">Histopathology</span>(jpg, png, jpeg)</p>
              </div>
            )}

            {result ? <>
            <p className="text-success my-1"><span className="text-dark-blue">Result :</span> {result}</p>
            <button type="button" className="btn btn-danger black-btn-shadow" onClick={() => {setSelectedImage(null); setResult(null);}}>
                Reset
              </button>
            </>
            :
            <>
            <button type="button" className="btn btn-primary mb-2 black-btn-shadow w-50" onClick={handleSelectImage}>
              Select Image
            </button>
            <br />
            <div className="text-center mb-2">
              {loading ? <button type="button" className='btn btn-success w-50 black-btn-shadow'><i className=' fa fa-spin fa-spinner'></i></button>
              :
              <input type="submit" value="Submit" className="btn btn-success w-50 black-btn-shadow" disabled={loading} />
              }
            </div>
          </>
        }
            <div>
            </div>
          </div>
        </form>
      </div>
    </section>
    </>;
}




















// import React, { useState } from 'react';
// import supabase from '../Api/Api';

// export default function Hesto() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isReset, setIsReset] = useState(false);

//   const handleSelectImage = () => {
//     document.getElementById('file').click();
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//     setIsReset(false);
//   };

//   const handleReset = () => {
//     setSelectedImage(null);
//     setIsReset(true);
//   };

//   return (
//     <section id="histopathology" className="histopathology mb-5">
//       <div className="section-title">
//         <h2>Histopathology</h2>
//       </div>
//       <div className="form-box secContainer bg-light text-center w-50 shadow-sm rounded mx-auto py-4">
//         <form action="#" id="myform" method="post">
//           <div className="histoForm mx-auto w-75 p-2 rounded bgr-light">
//             <input type="file" id="file" accept="image/*, jpg, png" hidden onChange={handleImageChange} />

//               {selectedImage && !isReset ? (
//                 <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className='w-100 mb-2 rounded' style={{  height: '200px', objectFit: 'contain' }} />
//               ) : (
//                 <>
//                 <div className="img-area w-75 position-relative mx-auto py-5 mb-3 rounded overflow-hidden bg-grey d-flex justify-content-center align-items-center flex-column" data-img="">
//                   <i className="fa-solid fa-cloud-arrow-up fs-2 cursor-pointer"></i>
//                   <h3 className="fw-medium">Upload Image</h3>
//                   <p>
//                     Upload Image Of <span className="fw-bold">Histopathology</span> Or Files Here
//                   </p>
//                   </div>

//                 </>
//               )}

//             <button
//               type="button"
//               className="btn btn-primary mb-2 black-btn-shadow w-50"
//               onClick={handleSelectImage}
//             >
//               Select Image
//             </button>
//             <br />
//             <div className="text-center mb-2">
//               <input type="submit" value="Submit" className="btn btn-success w-50 black-btn-shadow" />
//             </div>
//             {/* *FIXME - ele gay mn el API */}
//             <p className='text-success my-1'><span className='text-dark-blue'>Result :</span> Adenocarcinoma (Cancerous)</p>
//             <div>
//               <button type="button" className="btn btn-danger black-btn-shadow" onClick={handleReset}>
//                 Reset
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }