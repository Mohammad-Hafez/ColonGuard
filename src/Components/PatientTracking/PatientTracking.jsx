import React, { useEffect, useState } from 'react'
import supabase from '../Api/Api'
import { useContext } from 'react';
import { DrEmaiContext } from '../../Context/drEmailContext';
import { toast } from 'react-hot-toast';
import Select from "react-select";
import {Helmet} from "react-helmet";

export default function PatientTracking() {
  const { DrEmail } = useContext(DrEmaiContext)
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pId, setpId] = useState();
  const [showPatientList, setShowPatientList] = useState(false);
  const [Ajcc, setAjcc] = useState('');
  const [Dose, setDose] = useState();
  const [Drug, setDrug] = useState('');
  const [Grade, setGrade] = useState('');
  const [Notes, setNotes] = useState('');
  const [Tnm, setTnm] = useState('')
  const tnmOptions = {
    '0': ['Tis, N0, M0', 'TX, NX, M0', 'T0, N0, M0'],
    'I': ['T1 or T2, N0, M0', 'TX, NX, M0'],
    'IIA': ['T3, N0, M0', 'TX, NX, M0'],
    'IIB': ['T4a, N0, M0', 'TX, NX, M0'],
    'IIC': ['T4b, N0, M0', 'TX, NX, M0'],
    'IIIA': ['T1 or T2, N1 or N1c, M0', 'T1, N2a, M0', 'TX, NX, M0'],
    'IIIB': [
      'T3 or T4a, N1 or N1c, M0',
      'T2 or T3, N2a, M0',
      'T1 or T2, N2b, M0',
      'TX, NX, M0'
    ],
    'IIIC': [
      'T4a, N2a, M0',
      'T3 or T4a, N2b, M0',
      'T4b, N1 or N2, M0',
      'TX, NX, M0'
    ],
    'IVA': ['any T, Any N, M1a', 'TX, NX, M0'],
    'IVB': ['any T, Any N, M1b', 'TX, NX, M0'],
    'IVC': ['any T, Any N, M1c', 'TX, NX, M0'],
  };
  const AjccOptions = [
    {value : '0' , label : '0'},
    {value : 'I' , label : 'I'},
    {value : 'IIA' , label : 'IIA'},
    {value : 'IIB' , label : 'IIB'},
    {value : 'IIC' , label : 'IIC'},
    {value : 'IIIA' , label : 'IIIA'},
    {value : 'IIIB' , label : 'IIIB'},
    {value : 'IIIC' , label : 'IIIC'},
    {value : 'IVA' , label : 'IVA'},
    {value : 'IVB' , label : 'IVB'},
    {value : 'IVC' , label : 'IVC'},
  ]
  const GradeOptions = [
    {value : 'G1' , label : 'G1'},
    {value : 'G2' , label : 'G2'},
    {value : 'G3' , label : 'G3'},
    {value : 'G4' , label : 'G4'},
    {value : 'GX' , label : 'GX'}
  ]
  const handleAjccStageChange = (selectedOption) => {
    setAjcc(selectedOption.value);
    setTnm('')
  };
  const handleGradeChange = (selectedOption) => {
    setGrade(selectedOption.value);
  };

  const handleNotesChange = (event)=>{
    setNotes(event.target.value)
  }
  const handleTnmChange = (selectedOption) => {
    setTnm(selectedOption.value);
  };

  const getTnmOptions = () => {
    if (Ajcc) {
      if (Ajcc === '0') {
        return tnmOptions['0'].map((option) => ({
          value: option,
          label: option,
        }));
      } else {
        return tnmOptions[Ajcc]
          .filter((option) => !(option === 'T0, N0, M0' && Ajcc !== '0'))
          .map((option) => ({
            value: option,
            label: option,
          }));
      }
    }
    return [];
  };

  async function getAllPatient(query) {
    try {
        if (query === '') return;
        const { data } = await supabase.rpc("get_all_patient_by_doctor_email", {doc_email_input: DrEmail} );
        if (query !== '') {
            const filteredPatients = data.filter((patient) => patient.p_name.toLowerCase().includes(query.toLowerCase()) );   
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
  try {
    let { data, error } = await supabase
    .rpc('add_drug_info', {
      ajcc_stage_input : Ajcc, 
      dose_input : Dose, 
      drug_input : Drug, 
      grade_input : Grade, 
      notes_input : Notes, 
      pnt_id_input : pId, 
      tnm_input : Tnm
    });
        toast.success(`${data}`, {
        className : 'z-3 mt-5 bg-light text-danger ',
        duration:2000})
        resetData()
  } catch (error) {
    console.error(error)
  }
}
  function resetData(params) {
    setAjcc(); setDose();setDrug('');setGrade();setNotes('');setPatients('');setSearchQuery('');setSelectedPatient('');setTnm('');setpId()
  }
  return <>
      <Helmet>
      <title>ClonGuard | Patient Tracking</title>
    </Helmet>

   <section id="patientTracking" className="patientTracking mb-5">
     <div className="container">
       <div className="section-title">
         <h2>Patient Tracking</h2>
       </div>
     </div>
     <div className="form-box secContainer bg-light text-center w-50 rounded shadow-sm mx-auto p-3">
       <form onSubmit={handleSubmit} className="tumor marker-form position-relative" method="post" role="form" >
       <div className="select w-50 mx-auto mb-3 d-flex  justify-content-around align-items-center">
            <input type="text" placeholder="Search For A Patient By Name" value={searchQuery} onChange={handleSearchInputChange} className="select-patient black-btn-shadow border-0" />
          </div>
          {showPatientList && (
            <div className="patient-list rounded p-2">
              <ul className='list-unstyled mb-0'>
                {selectedPatient.map(patient => ( <>
                  <div className="d-flex" key={patient.p_id}>
                <li className='cursor-pointer me-3' onClick={() => handlePatientClick(patient.p_id , patient.p_name)}>
                    {patient.p_name}
                  </li>
                  <li className='cursor-pointer' onClick={() => handlePatientClick(patient.p_id , patient.p_name)}>
                    id : {patient.p_id}
                  </li>
                  </div>
                 </>
                ))}
              </ul>
            </div>
          )}
         <div className="row mb-3">
           <div className="col-6 form-group">
             <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
               <i className="fas fa-hashtag text-muted opacity-75"></i>
               <input type="text" placeholder="DRUG" required onChange={(e)=>{setDrug(e.target.value);}} value={Drug ? Drug : ''} className=''  name="patient tumor marker"/>
             </div>
           </div>
           <div className="col-6 form-group">
             <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
               <i className="fas fa-hashtag text-muted opacity-75"></i>
               <input type="number" placeholder="DOSE" required  onChange={(e)=>{setDose(e.target.value);}} value={Dose ? Dose : ''}  name="patient tumor marker"/>
             </div>
           </div>
         </div>
         <div className="row mb-3">
           <div className="col-4 form-group ">
               <Select options={AjccOptions} id="ajcc-stage-select" placeholder ="AJCC" value={Ajcc ? AjccOptions.find((option) => option.value === Ajcc) : ''} onChange={handleAjccStageChange} />
            </div>
            <div className="col-4 form-group ">
                <Select options={GradeOptions} id="grade-select" placeholder ="Grade" value={Grade ? GradeOptions.find((option) => option.value === Grade) : ''} onChange={handleGradeChange} />
            </div>
            <div className="col-4 form-group ">
            <Select options={getTnmOptions()} id="tnm-select" placeholder="TNM" value={Tnm ? { value: Tnm, label: Tnm } : null} onChange={handleTnmChange} />          </div> 
          </div>
          <div>
           <textarea className='form-control' placeholder="Notes"  value={Notes ? Notes : ""} onChange={handleNotesChange}></textarea>
          </div>     
          <br/>
          <div>
           <input type="submit" className="btn btn-primary"/>
          </div>
          <br/>
          <div>
           <button type="reset" onClick={resetData} className="btn btn-danger">Reset</button>
          </div>
       </form>
     </div>
   </section>
    
    </>
}