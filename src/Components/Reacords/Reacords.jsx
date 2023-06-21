import React, { useContext, useEffect, useState } from 'react'
import PatientTable from '../Patient/Patient'
import TumorChart from '../TumorChart/TumorChart'
import DrugTable from '../DrugTable/DrugTable';
import {Helmet} from "react-helmet";

export default function Reacords() {
  const [searchedPatientData, setSearchedPatientData] = useState();
  const [PatientId, setPatientId] = useState()

  function handleSearchPatientUpdate(data) {
    if (data?.length > 0) {
      setSearchedPatientData(data);
      setPatientId(data[0].p_id);  
    }else{
      setSearchedPatientData()
      setPatientId()
    }
  }


  return <>
      <Helmet>
      <title>ClonGuard | Records</title>
    </Helmet>

  <div className="container">
  <PatientTable onSearchPatientUpdate={handleSearchPatientUpdate}/>

  {searchedPatientData  && PatientId ? <>
    <div className="chartContainer w-50 mx-auto text-center my-3">
    <div className="section-title">
        <h2>Tumor Markers Chart</h2>
    </div>
    <TumorChart id={PatientId}/>
  </div>
  <div className="DrugTableContainer w-75 mx-auto text-center mb-4">
  <div className="section-title">
        <h2>Patient Tracking</h2>
    </div>
  <DrugTable id={PatientId}/>
  </div>
  </>
  :
  null
}
  </div>
  </>
}
