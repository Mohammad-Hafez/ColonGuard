import React, { useState } from "react";
import supabase from "../Api/Api";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { DrEmaiContext } from "../../Context/drEmailContext";
import {Helmet} from "react-helmet";

import "react-calendar/dist/Calendar.css";
export default function Form() {
  const { DrEmail } = useContext(DrEmaiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [smoking, setSmoking] = useState();
  const [gender, setGender] = useState();
  const [Day, setDay] = useState()
  const [Month, setMonth] = useState()
  const [Year, setYear] = useState()
  const currentYear = new Date().getFullYear();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await supabase.rpc("add_patient_data", {
        doc_email_input: DrEmail,
        p_name_input: username,
        p_date_input: birthDate,
        p_height_input: height,
        p_weight_input: weight,
        p_smoke_input: smoking,
        p_gender_input: gender,
      });
      toast.success("Patient data added successfully");
      setUsername("");
      setYear();
      setMonth();
      setDay();
      setHeight("");
      setWeight("");
      setSmoking("");
      setGender("");
    } catch (error) {
      console.error(error);
      toast.error("There was an error adding patient data!");
    }
    setIsLoading(false);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBirthDateChange = () => {
    if (Year && Month && Day) {
      const formattedBirthdate = `${Year}-${Month}-${Day}`;
      setBirthDate(formattedBirthdate);
    }
    };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSmokingChange = (event) => {
    if (event.target.value === "smoking") {
      setSmoking(true);
    } else {
      setSmoking(false);
    }
  };

  const handleGenderChange = (event) => {
    if (event.target.value === "male") {
      setGender(true);
    } else {
      setGender(false);
    }
  };
  return (
    <>
        <Helmet>
      <title>ClonGuard | Form</title>
    </Helmet>

      <section id="forum" className="forum mb-5">
        <div className="section-title">
          <h2>Form</h2>
        </div>
        <div className="form-box secContainer bg-light mx-auto p-3 w-75 shadow-sm rounded">
          <form onSubmit={handleSubmit} className="patient-form mx-auto bgr-light rounded px-4 py-5" method="post" id="myform2" >
            <div className="patient-data ">
              <div className="row gy-2">
                <div className="col-md-6 form-group">
                  <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
                    <i className="fas fa-user me-2 txt-dark-grey"></i>
                    <input className="w-100" type="text" placeholder="Name" required name="user" id="user" value={username} onChange={handleUsernameChange} />
                  </div>
                </div>
                <div className="col-md-6 form-group">
                  <div className="row g-1">
                    <div className="col-4">
                      <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
                        <i className="fa-solid fa-calendar-days me-1 txt-dark-grey"></i>
                        <input type="number" className="w-100 fs-6" placeholder="YY" required name="birthDate" id="birthDate" value={Year ? Year : ""} onChange={(event) => setYear(event.target.value)} onBlur={handleBirthDateChange} min="1900" max={currentYear} />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
                        <i className="fa-solid fa-calendar-days me-1 txt-dark-grey"></i>
                        <input type="number" className="w-100" placeholder="MM" required name="birthDate" id="birthDate" value={Month ? Month : ""} onChange={(event) => setMonth(event.target.value)} onBlur={handleBirthDateChange} min="1" max="12"/>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
                        <i className="fa-solid fa-calendar-days me-1 txt-dark-grey"></i>
                        <input type="number" className="w-100" placeholder="DD" required name="birthDate" id="birthDate" value={Day ? Day : ""} onChange={(event) => setDay(event.target.value)} onBlur={handleBirthDateChange} min="1" max="31"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 form-group">
                  <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
                    <i className="fas fa-arrows-alt-v me-2 txt-dark-grey"></i>
                    <input type="number" className="w-100" placeholder="Height" min="0" max="200" required name="height" id="height" value={height} onChange={handleHeightChange} />
                  </div>
                </div>
                <div className="col-md-6 form-group">
                  <div className="input-field bgr-dark-grey d-flex align-items-center p-3 form-control rounded-pill">
                    <i className="fas fa-weight me-2 txt-dark-grey"></i>
                    <input type="number" className="w-100" placeholder="Weight" min="0" max="300" required name="weight" id="weight" value={weight} onChange={handleWeightChange} />
                  </div>
                </div>
              </div>
              <hr />
              <div className="check-form" id="smoke">
                <div>
                  <input type="radio" checked={smoking === true} className="form-check-input me-1" value="smoking" id="smoking" placeholder="smoking" name="data" onChange={handleSmokingChange} />
                  <label htmlFor="smoking" className="form-check-label">
                    Smoking
                  </label>
                </div>
                <div>
                  <input type="radio" checked={smoking === false} className="form-check-input me-1" value="no smoking" id="no smoking" placeholder="alcohol" name="data" onChange={handleSmokingChange} />
                  <label htmlFor="no smoking" className="form-check-label">
                    No Smoking
                  </label>
                </div>
              </div>
              <hr />
              <div className="gender" id="gender">
                <div className=" form-group mt-2">
                  <input type="radio" checked={gender === true} className="form-check-input me-1" value="male" id="male" placeholder="male" name="gender" onChange={handleGenderChange} />
                  <label htmlFor="male" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className=" form-group mt-2">
                  <input type="radio" checked={gender === false} className="form-check-input me-1" value="female" id="female" placeholder="female" name="gender" onChange={handleGenderChange} />
                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
              <hr />
              <div className="text-center">
                
                  {isLoading ? (
                    <button type="button" className='btn btn-primary text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
                  ) : (
                    <button type="submit" id="submit" className="btn btn-primary w-auto">
                    Submit
                    </button> 
                  )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
