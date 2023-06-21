import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Reacords from './Components/Reacords/Reacords';
import Contact from './Components/Contact/Contact';
import Endo from './Components/Endo/Endo';
import Fourm from './Components/Fourm/Fourm';
import GeneExpression from './Components/GeneExpression/GeneExpression';
import Hesto from './Components/Hesto/Hesto';
import PatientTable from './Components/Patient/Patient';
import TumorMarker from './Components/TumorMarker/TumorMarker';
import WhyUs from './Components/WhyUs/WhyUs';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import PatientTracking from './Components/PatientTracking/PatientTracking';
import { DrEmailContextProvider } from './Context/drEmailContext';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { Toaster } from 'react-hot-toast';
import TumorChart from './Components/TumorChart/TumorChart';
import Notfound from './Components/Notfound/Notfound';

export default function App() {
  const routes = createHashRouter([
    {
      path: "",element:<Layout/>,
      children:[
        {index:true ,  element:<ProtectedRoutes><Home/></ProtectedRoutes> },
        {path : "home",element:<ProtectedRoutes><Home/></ProtectedRoutes>},
        {path : "forum",element:<ProtectedRoutes><Fourm/></ProtectedRoutes>},
        {path : "histopathology",element:<ProtectedRoutes><Hesto/></ProtectedRoutes>},
        {path : "endoscopy",element:<ProtectedRoutes><Endo/></ProtectedRoutes>},
        {path : "geneExpression",element:<ProtectedRoutes><GeneExpression/></ProtectedRoutes>},
        {path : "tumorMarker",element:<ProtectedRoutes><TumorMarker/></ProtectedRoutes>},
        {path : "Contact",element:<ProtectedRoutes><Contact/></ProtectedRoutes>},
        {path : "WhyUs",element:<ProtectedRoutes><WhyUs/></ProtectedRoutes>},
        {path : "PatientTracking",element:<ProtectedRoutes><PatientTracking/></ProtectedRoutes>},
        {path : "records",element:<ProtectedRoutes><Reacords/></ProtectedRoutes>},
        {path : "signup",element:<Signup/>},
        {path : "login",element:<Login/>},
        {path : "*",element:<Notfound/>}
      ]
    }
  ])
  return <>
  <DrEmailContextProvider>
    <Toaster/>
  <RouterProvider router={routes}></RouterProvider>
  </DrEmailContextProvider>
  </>
}