import React, { useState , useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link , useNavigate, useParams } from 'react-router-dom'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import supabase from '../Api/Api'
import { useContext } from 'react';
import { DrEmaiContext } from '../../Context/drEmailContext';
import Signup from '../Signup/Signup';
import PanelsContainer from '../Panel/Panel';

export default function Login() {
  const [IsSignUpMode, setIsSignUpMode] = useState(false);
  function handleSignUpClick() {
    setIsSignUpMode(true)
  }
  function handleLogInClick() {
    setIsSignUpMode(false)
  }

  const [height, setHeight] = useState(0);
  function loginH(){
    const navbarHeight = document.querySelector('#header').offsetHeight;
    const windowHeight = window.innerHeight;
    setHeight(windowHeight - navbarHeight);
  }
  useEffect(() => {
    loginH()
  }, []);

  const {saveUser} = useContext(DrEmaiContext)
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState(null)
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  let navigate = useNavigate()
  async function drLogin(values){
    setIsLoading(true)
    setErrMsg(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
        })
      if (error) {
        setErrMsg(error.message)
      } else {
        localStorage.setItem('doctorEmail' , data.user.email)
        saveUser()
        navigate("/")
      }
      setIsLoading(false)
  
    } catch (error) {
      console.error(error)
    }
  }  
  let mySchema =Yup.object( {
    email:Yup.string().email("invalid email").required("email is required"),
  })
  let formik = useFormik({
  initialValues:{
    email:"",
    password:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> drLogin(values)
  })
  return <>
  <Helmet>
    <title>
    ColoGuard | Login
    </title>
  </Helmet>
  <section className={`loginContainer` } style={{ minHeight: `${height}px` }}>
  <div className="container">
    <div className="forms-container">
      {!IsSignUpMode ?
      <div className="signin-signup">
      <form action="#" onSubmit={formik.handleSubmit} className='sign-in-form loginForm'>
      <h1 className='text-main fw-bolder mb-2'>Sign In</h1>
      {errMsg?<div className="alert alert-danger">{errMsg}</div>:"" }
      <div className="input-field  bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
      <i className="fa-solid fa-envelope txt-dark-grey me-2"></i>
      <input type="email" className='w-100' placeholder='E-Mail' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      </div>
        {formik.errors.email && formik.touched.email ?<div className="alert alert-danger w-75 mx-auto">{formik.errors.email}</div>: null}
        <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
        <div className="passwordField position-relative d-flex align-items-center w-100">
        <i className="fa-solid fa-lock txt-dark-grey me-2"></i>
          <input type={passwordShown ? "text" : "password"} placeholder='Password' className='w-100' name='password' id='password'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          <span onClick={togglePassword} className='togglePassword cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger w-75 mx-auto">{formik.errors.password}</div>: null}
        {/* <Link to={'/forgetPassword'} id='forgetPass' className="btn p-0 mb-2 text-main">Do You Forget Your Password ? </Link> */}
        {/* <br /> */}
        {isLoading?
        <button type="button" className='btn bg-primary text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn bg-primary text-light me-2'>Log in</button>
        </>
      }
      </form>
      </div>
       : <Signup/> }
    </div>
    <PanelsContainer/>
    </div>
  </section>
  </>
}