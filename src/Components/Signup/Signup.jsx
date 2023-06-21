import * as Yup from 'yup'
import { Formik, useFormik, validateYupSchema } from 'formik'
import { useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { useEffect, useState } from 'react';
// import styles from './Signup.module.css'
import supabase from '../Api/Api';
import PanelsContainer from '../Panel/Panel';
import Login from '../Login/Login';
export default function Signup() {
  const [IsSignUpMode, setIsSignUpMode] = useState(true);
  function handleSignUpClick() {
    setIsSignUpMode(false)
  }
  function handleLogInClick() {
    setIsSignUpMode(true)
  }

  const [height, setHeight] = useState(0);
  function signupH(){
    const navbarHeight = document.querySelector('#header').offsetHeight;
    const windowHeight = window.innerHeight;
    setHeight(windowHeight - navbarHeight);
  }
  useEffect(() => {
    signupH()
  }, []);
  // useEffect(() => {
  //   document.body.classList.add('no-scroll');
  //   return () => {
  //     document.body.classList.remove('no-scroll');
  //   };
  // }, []);

  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState(null)
  let navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {setPasswordShown(!passwordShown);};
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const toggleRePassword = () => {setRePasswordShown(!rePasswordShown)};

  async function Register(values){
    setIsLoading(true)
    setErrMsg(null)
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    })
    if (error) {
      setErrMsg(error.message)
    } else {
      console.log(data.user.email);
      navigate("/login")
    }
    setIsLoading(false)
  }  
  let mySchema =Yup.object( {
    name:Yup.string().required("name is required").min(3,"min char is 3").max(15,"max char is 15"),
    email:Yup.string().email("invalid email").required("email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"password must start with capital letter (A-Z)").required("password is required"),
    rePassword:Yup.string().required("required").oneOf([Yup.ref('password')],"rePassword must matches Password")
  })
  let formik = useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:""
    },
    validationSchema:mySchema,
    onSubmit:(values)=> Register(values)
  })
  return <>
  <Helmet>
    <title>
    Register
    </title>
  </Helmet>
  <section className='signup'  style={{ height: `${height}px` }}>
  <div className={`container  ${IsSignUpMode ? 'sign-up-mode' : ''} `}>
  <div className="forms-container">
  {IsSignUpMode ?
  <div className="signin-signup">
      <form action=""  onSubmit={formik.handleSubmit} className='bg-muted sign-up-form '>
      <h1 className='text-main fw-bolder'>Register Now</h1>
      {errMsg?<div className="alert alert-danger">{errMsg}</div>:"" }
      <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
      <i className="fas fa-user me-2 txt-dark-grey"></i>
      <input type="text" placeholder='User Name' className='w-100' id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      </div>
        {formik.errors.name && formik.touched.name ?<div className="alert alert-danger">{formik.errors.name}</div>: null}
        <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
        <i class="fa-solid fa-envelope txt-dark-grey me-2"></i>
        <input type="email" placeholder='E-Mail...' className='w-100' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>: null}
        <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
        <div className="passwordField position-relative w-100 d-flex align-items-center">
        <i class="fa-solid fa-lock txt-dark-grey me-2"></i>
        <input type={passwordShown ? "text" : "password"} placeholder='Enter Password' className='w-100' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
        <div className="passwordField position-relative w-100 d-flex align-items-center">
        <i class="fa-solid fa-lock txt-dark-grey me-2"></i>
        <input type={rePasswordShown ? "text" : "password"} placeholder='Re-enter Password' className='w-100' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={toggleRePassword} className='togglePassword cursor-pointer'>{rePasswordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div>: null}
        {isLoading ? <button type="button" className='btn bg-main text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button> :
        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn bg-danger text-light me-2'>Register</button>
        }
      </form>
  </div>
  : <Login/> }
    </div>
    <PanelsContainer/>
    </div>
  </section>
  </>
}
