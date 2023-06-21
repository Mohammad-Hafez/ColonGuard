import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'

export let DrEmaiContext = createContext();
export  function DrEmailContextProvider(props) {
    const[DrEmail , setDrEmail]=useState()
    function saveUser(){
        let drEmail = localStorage.getItem("doctorEmail")
        setDrEmail(drEmail)
    }  
    useEffect(()=>{
      if (localStorage.getItem("doctorEmail")) {
        saveUser()
    }
    },[])
  
  return <>
  <DrEmaiContext.Provider value={{saveUser , setDrEmail , DrEmail}}>
    {props.children}
  </DrEmaiContext.Provider>
  </>
}
