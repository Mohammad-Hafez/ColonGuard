import React, { useEffect, useState } from 'react'
import supabase from '../Api/Api'
import { useContext } from 'react';
import { DrEmaiContext } from '../../Context/drEmailContext';
import { toast } from 'react-hot-toast';
import {Helmet} from "react-helmet";

export default function TumorMarker() {
  const { DrEmail } = useContext(DrEmaiContext)
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pId, setpId] = useState();
  const [showPatientList, setShowPatientList] = useState(false);
  const [CEA, setCEA] = useState  (null)
  const [TumorBtn, setTumorBtn] = useState(false)
  const [CA19, setCA19] = useState(null)
  const [CA50, setCA50] = useState(null)
  const [CA24, setCA24] = useState(null)
  const [AFP, setAFP] = useState  (null)

  async function getAllPatient(query) {
    try {
        if (query === '') return;
        const { data } = await supabase.rpc("get_all_patient_by_doctor_email", {doc_email_input: DrEmail} );
        if (query !== '') {
            const filteredPatients = data.filter((patient) => patient.p_name.toLowerCase().includes(query.toLowerCase()) ); 
            console.log(filteredPatients);  
            setSelectedPatient(filteredPatients)
            setShowPatientList(true); // show patient list
        }
    } catch (error) {
        console.error("all err" , error); 
    }
}

function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    setSelectedPatient([]);
    if (query === '') {
      setShowPatientList(false);
    } else {
      getAllPatient(query); // Call fetchPatients() here
      setShowPatientList(true);
    }
  }

  function handlePatientClick(patientId , patientName) {
    setpId(patientId);
    setSearchQuery('');
    setSelectedPatient([]);
    setShowPatientList(false);
    setSearchQuery(patientName)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTumorBtn(true)
  try {
    if ( AFP ||	 CA19 || CA24 || CA50 || CEA ) {
      let { data, error } = await supabase.rpc('add_tumor_data', {
        afp_input : AFP,
        ca19_input : CA19,
        ca24_input : CA24,
        ca50_input : CA50,
        cea_input : CEA,
        pnt_id_input : pId
      });
      toast.success(data , {
        className : 'z-3 mt-5 bg-light text-success ',
        duration:2000})
        resetTumor()
      }
  } catch (error) {
    console.error(error)
  }
  setTumorBtn(false)
}
function resetTumor(){
  setCEA(null); setAFP(null) ; setCA19(null) ; setCA24(null) ; setCA50(null);setSearchQuery('')
}
  return <>
      <Helmet>
      <title>ClonGuard | Tumor Marker</title>
    </Helmet>

    <section id="tumorMarker" className="tumor-marker mb-5">
      <div className="container">
        <div className="section-title">
          <h2>Tumor Marker</h2>
        </div>
      </div>
      <div className="form-box secContainer bg-light text-center w-50 rounded shadow-sm mx-auto p-3">
        <form onSubmit={handleSubmit} className="tumor marker-form position-relative" method="post" role="form">
          <div className="select w-50 mx-auto mb-3 d-flex  justify-content-around align-items-center">
            <input type="text" placeholder="Search For A Patient By Name" value={searchQuery} onChange={handleSearchInputChange} className="select-patient black-btn-shadow border-0" />
          </div>
          {showPatientList && (
            <div className="patient-list rounded p-2">
              <ul className='list-unstyled mb-0'>
                {selectedPatient?.map(patient => (< >
                <div className="d-flex">
                <li className='cursor-pointer me-3' key={patient.p_id} onClick={() => handlePatientClick(patient.p_id , patient.p_name)}>
                    {patient.p_name}
                  </li>
                  <li className='cursor-pointer' key={patient.p_id} onClick={() => handlePatientClick(patient.p_id , patient.p_name)}>
                    id : {patient.p_id}
                  </li>

                </div>

                  </>
                ))}
              </ul>
            </div>
          )}
          <div className="row">
            <div className="input-field w-25 mx-auto bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
              <i className="fas fa-hashtag text-muted opacity-75"></i>
              <input type="number"  onChange={(e)=>{setCEA(e.target.value);}} value={CEA ? CEA : ''} placeholder="CEA" className="w-100"  name="patient tumor marker" />
            </div>
          </div>
          <div className="row">
            <div className="input-field w-25 mx-auto bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
              <i className="fas fa-hashtag text-muted opacity-75"></i>
              <input type="number" onChange={(e)=>{setCA19(e.target.value);}} value={CA19 ? CA19 : ''} className="w-100" placeholder="CA19-9"  name="patient tumor marker" />
            </div>
          </div>
          <div className="row">
            <div className="input-field w-25 mx-auto bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
              <i className="fas fa-hashtag text-muted opacity-75"></i>
              <input type="number" onChange={(e)=>{setCA50(e.target.value);}} value={CA50 ? CA50 :''} placeholder="CA50" className="w-100"  name="patient tumor marker" />
            </div>
          </div>
          <div className="row">
            <div className="input-field w-25 mx-auto bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
              <i className="fas fa-hashtag text-muted opacity-75"></i>
              <input type="number" onChange={(e)=>{setCA24(e.target.value);}} value={CA24 ? CA24 : ''} placeholder="CA24-2" className="w-100"  name="patient tumor marker" />
            </div>
          </div>
          <div className="row">
            <div className="input-field w-25 mx-auto bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill mb-2">
              <i className="fas fa-hashtag text-muted opacity-75"></i>
              <input type="number" onChange={(e)=>{setAFP(e.target.value);}} value={AFP ? AFP : ''} placeholder="AFP" className="w-100"  name="patient tumor marker" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mx-auto mb-3">
              {TumorBtn ? <button className='btn btn-primary red-btn-shadow w-100'><i className=' fa fa-spin fa-spinner'></i></button>
              :
              <input type="submit" className="btn btn-primary red-btn-shadow w-100" value="Submit" />
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mx-auto mb-3">
              <input type="reset" onClick={resetTumor} className="btn btn-danger black-btn-shadow w-100" value="Reset" />
            </div>
          </div>
        </form>
      </div>
    </section>
  </>
}