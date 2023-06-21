import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PanelsContainer() {
  let navigate = useNavigate()
  function toSignup(){
    navigate("/signup")
  }
  function hasAccount(){
    navigate("/login")
   }  
  return (
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>New here ?</h3>
          <p className='text-capitalize text-light fs-4'>
            if this the first time for youhere, you should sign-Up to use the website
          </p>
          <button className="btn transparent" id="sign-up-btn" onClick={toSignup}>
            Sign up
          </button>
        </div>
        {/* <img src="img/log.svg" className="image" alt="" /> */}
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>One of us ?</h3>
          <p className='text-capitalize fs-4'>
            Welcome to our website, you should Log-in To use the website.
          </p>
          <button className="btn transparent" id="sign-in-btn" onClick={hasAccount}>
            Sign in
          </button>
        </div>
        {/* <img src="img/register.svg" className="image" alt="" /> */}
      </div>
    </div>
  );
}
