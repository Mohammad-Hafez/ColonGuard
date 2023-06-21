import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import contactImg from '../../assets/img/bg2.jpg'
export default function Contact() {
  return <>
      <section id="contact" className="contact mb-5">
        <div className="section-title">
          <h2>Contact</h2>
     </div>
     <div className="container mx-auto w-50 black-shadow rounded overflow-hidden">
      <div className="row">
        <div className="col-md-6 px-0 ">
          <img src={contactImg} className="img-fluid h-100 " alt="ContactImg"/>
        </div>
        <div className="col-md-6">
          <div className="contactRight p-3 text-center">
            <h2>Contact Us</h2>
            <input type="text" className="field rounded" placeholder="Your Name" required/>
            <input type="text" className="field rounded" placeholder="Your Email"/>
            <input type="text" className="field rounded" placeholder="Phone"/>
            <textarea placeholder="Message" className="field rounded"></textarea>
            <Link to={'mailto:test@gmail.com'} className="social-links">
              <button className="btn btn-primary">Send</button>
            </Link>  
          </div>
        </div>
      </div>
     </div>
    </section>
  </>
}
