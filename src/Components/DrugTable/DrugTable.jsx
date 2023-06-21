import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import supabase from '../Api/Api'
import { DrEmaiContext } from '../../Context/drEmailContext';
import { Toolbar } from 'primereact/toolbar';
import { toast } from 'react-hot-toast';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
        
export default function DrugTable({id}) {
  const { DrEmail } = useContext(DrEmaiContext)
  let [Drugs, setDrugs] = useState([])
  const toast = useRef(null);
  const dt = useRef(null);
  async function getDrugInfo(){
    if (id) {
    try {
      let { data } = await supabase.rpc('get_drug_info_for_patient_and_doctor', {
        d_pnt_id_input : id, 
        doc_email_input : DrEmail
      })
      setDrugs(data);
      } catch (error) {
      console.error(error);
    }
  }
  }
  useEffect(()=>{
    getDrugInfo()
  },[])
  async function deleteDrugs (){
    try {
        let { data, error } = await supabase
        .rpc('delete_drug_info_for_patient', {
          p_id_input : id
        })
        setDrugs([])
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Patient Deleted', life: 3000 });
    } catch (error) {
        console.error(error)
    }
    };

  const rightToolbarTemplate = () => {
    return<>
    <Button className='btn btn-danger' onClick={deleteDrugs}>Delete <i className="pi pi-trash"></i></Button>
    </>
};

  return <>
  {Drugs ?
        <div className='container mt-3'>
        <Toast ref={toast} />
        <div className="container p-2 card h-100 text-capitalize">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
            <DataTable className='rounded' ref={dt} value={Drugs} columnResizeMode='fit'  showGridlines >
                <Column key="id" header="Patient Id" className='text-center'    field='d_pnt_id'/>
                <Column key="name" header="Name" className='text-center'        body={(rowData) => <span>{rowData.p_name}</span>}/>
                <Column key="drug" header="drug" className='text-center'        body={(rowData) => <span>{rowData.drug}</span>}/>
                <Column key="info_submit_date" header="submit date" className='text-center' body={(rowData) => <span>{rowData.info_submit_date}</span>} />
                <Column key="dose" header="dose" className='text-center' body={(rowData) => <span>{rowData.dose}</span>}/>
                <Column key="aajcc_stage" header="ajcc stage" className='text-center' body={(rowData) => <span>{rowData.ajcc_stage}</span>} />
                <Column key="grade" header="grade" className='text-center' body={(rowData) => <span>{rowData.grade}</span>}/>
                <Column key="tnm" header="tnm" className='text-center' body={(rowData) => <span>{rowData.tnm}</span>}/>
                <Column key="notes" header="notes" className='text-center' body={(rowData) => <span>{rowData.notes}</span>}/>
            </DataTable>
        </div>
    </div>
:
null
}
  </>;
}

