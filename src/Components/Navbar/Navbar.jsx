import React, { useContext , useEffect , useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DrEmaiContext } from '../../Context/drEmailContext';
import nanImg from'../../assets/img/cancer.jpg';

export default function Navbar() {
  const location = useLocation();
  let {DrEmail , setDrEmail} = useContext(DrEmaiContext)
  const navigate = useNavigate();

  function LogOut(){
    localStorage.removeItem("doctorEmail")
    setDrEmail(null)
    navigate("/login")
  }
  const [activeLink, setActiveLink] = useState('Home');
  useEffect(()=>{
    if (DrEmail) {
      setActiveLink(location.pathname.slice(1));
    }else{
      setActiveLink(location.pathname.slice(1))
    }
  },[DrEmail])
  return <>
    <header id="header" className="blue-shadow position-sticky sticky-top top-0 bg-light">
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="slogan me-2">   
          <img src={nanImg} alt="" className='rounded-circle' width="60"/>
        </span>
        <Link className="navbar-brand tagline text-main fw-bold" to="/">ColonGuard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        {DrEmail ?
          <>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'home'? ' active' : ''}`} aria-current="page" to={'home'} onClick={() => setActiveLink('home')}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'forum' ? ' active' : ''}`} to={'forum'} onClick={() => setActiveLink('forum')}>Form</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'histopathology' ? ' active' : ''}`} to={'histopathology'} onClick={() => setActiveLink('histopathology')}>Histopathology</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'endoscopy' ? ' active' : ''}`} to={'endoscopy'} onClick={() => setActiveLink('endoscopy')}>Endoscopy</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'geneExpression' ? ' active' : ''}`} to={'geneExpression'} onClick={() => setActiveLink('geneExpression')}>Gene Expression</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'tumorMarker' ? ' active' : ''}`} to={'tumorMarker'} onClick={() => setActiveLink('tumorMarker')}>Tumor Marker</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'PatientTracking' ? ' active' : ''}`} to={'PatientTracking'} onClick={() => setActiveLink('PatientTracking')}>Patient Tracking</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link  ${activeLink === 'records' ? ' active' : ''}`} to={'records'}  onClick={() => setActiveLink('records')}>
                Records
              </Link>
              {/* <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={'records/Patient'}>Patient</Link></li>
                <li><Link className="dropdown-item" to={'records/TumorChart'}>Tumor Marker</Link></li>
                <li><Link className="dropdown-item" to={'records/DrugsInfo'}>Drugs Info</Link></li>
              </ul> */}
            </li>
          </ul>
          <ul className='navbar-nav mb-2 mb-lg-0'>
        <li className={`nav-link p-0`}><span className="nav-link cursor-pointer btn btn-primary text-light btn-sm" onClick={()=>{
          LogOut()
          setActiveLink('Login')
          }}>
          LogOut
          </span>
        </li> 
        </ul>
            </>
:
            <>
            <ul className='authUl navbar-nav mb-2 mb-lg-0'>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'Signup' ? ' active' : ''}`} onClick={() => setActiveLink('Signup')}  to={'signup'}>Register</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'Login' ? ' active' : ''}`} onClick={() => setActiveLink('Login')} to={'login'}>Sign-In</Link>
            </li>

            </ul>
          </>
}
        </div>
      </div>
    </nav>
  </header>
  </>
}
