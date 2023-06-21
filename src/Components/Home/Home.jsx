import React, { useEffect, useState } from 'react'
import WhyUs from '../WhyUs/WhyUs'
import Fourm from '../Fourm/Fourm'
import Hesto from '../Hesto/Hesto'
import Endo from '../Endo/Endo'
import GeneExpression from '../GeneExpression/GeneExpression'
import TumorMarker from '../TumorMarker/TumorMarker'
import Contact from '../Contact/Contact'
import PatientTracking from '../PatientTracking/PatientTracking'

export default function Home() {
  return <>
  <WhyUs/>
  <Fourm/>
  <Hesto/>
  <Endo/>
  <GeneExpression/>
  <TumorMarker/>
  <PatientTracking/>
  <Contact/>
  </>
}
