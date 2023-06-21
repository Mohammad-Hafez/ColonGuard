import React, { useEffect, useState } from 'react'
import img1 from '../../assets/img/record.jpg'
import img2 from '../../assets/img/forum.jpg'
import img3 from '../../assets/img/doctor.jpg'
export default function WhyUs() {
  const [height, setHeight] = useState(0);
  function whyusH(){
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const windowHeight = window.innerHeight;
    setHeight(windowHeight - navbarHeight);
  }
  useEffect(() => {
    whyusH()
  }, []);
  return <>
    <section id="whyUs" className="why-us mb-5 d-flex justify-content-center align-items-center" style={{ height: `${height}px` }}>
      <div className="container">
            <div className="row">
              <div className="col-4 d-flex align-items-center">
                <div className="icon-box grey-shadow mt-4 mt-xl-0 rounded w-100 p-4 text-center bg-light">
                  <img src={img1} className='rounded img-fluid mb-2' alt="recordImg" />
                  <h2 className='fw-'>Storage Your Medical <b>Records</b></h2>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center">
                <div className="icon-box grey-shadow mt-4 mt-xl-0 rounded w-100 p-4 text-center bg-light">
                <img src={img2} className='rounded mb-2 img-fluid' alt="forumImg" />
                  <h2>Discuss In The <b>Form</b></h2>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center">
                <div className="icon-box grey-shadow mt-4 mt-xl-0 rounded w-100 p-4 text-center bg-light">
                <img src={img3} className='rounded mb-2 img-fluid' alt="doctorImg" />
                  <h2> You Can Find Your <b>Doctors</b></h2>
                </div>
              </div>
          </div>
      </div>
    </section>
  </>
}
