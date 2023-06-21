import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes(props) {
  if (localStorage.getItem("doctorEmail")) {
    // navigate to entered path
    return props.children
  }else{
    // navigate to login
    return <Navigate to={"/login"}></Navigate>
  }
}
