import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import supabase from '../Api/Api'
import { DrEmaiContext } from '../../Context/drEmailContext';
import { InputText } from 'primereact/inputtext';
import toast, { Toaster } from "react-hot-toast";

export default function Patient({ onSearchPatientUpdate}) {
    const { DrEmail } = useContext(DrEmaiContext)
    const [deletePatientDialog, setDeletePatientDialog] = useState(false);
    const [selectedPatients, setSelectedPatients] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [SearchPatient, setSearchPatient] = useState()
    const toast = useRef(null);
    const dt = useRef(null);

    function handleSearchInputChange(event) {
        const query = event.target.value;
        setSearchQuery(query);
        if (query === "") {
            setSearchPatient([]); 
        }  
    }
    
    async function getAllPatient() {
        try {
            if (searchQuery === '') return;
            const { data, error } = await supabase.rpc("get_all_patient_by_doctor_email", {doc_email_input: DrEmail} );
            if (searchQuery !== '') {
                const filteredPatients = data.filter((patient) => patient.p_name.toLowerCase().includes(searchQuery.toLowerCase()) );   
                getSearchedPatient(filteredPatients[0].p_id)
            }
        } catch (error) {
            console.error("all err" , error); 
        }
    }

    useEffect(() => {
        getAllPatient();
    }, [searchQuery]);
    
    useEffect(() => {
        onSearchPatientUpdate(SearchPatient);
    }, [SearchPatient, onSearchPatientUpdate]);

    async function getSearchedPatient(id){
        let { data, error } = await supabase.rpc('get_patient_data', {
        dr_email_input : DrEmail, 
        p_id_input :  id
        })
        setSearchPatient(data)
    }

    const confirmDeletePatient = async (rowData) => {
        console.log(rowData);
        setSelectedPatients([rowData]);
        setDeletePatientDialog(true);
    };
    
    const actionBodyTemplate = (rowData) => {
        return  <React.Fragment>
                    <Button icon="pi pi-trash" rounded outlined className="mx-1" severity="danger" onClick={() => confirmDeletePatient(rowData)} />
                </React.Fragment>
    };
    
    async function deletePatient (id){
    try {
        let { data, error } = await supabase
        .rpc('delete_patient', {
          p_id_input : id
        })
        console.log(data);
        setSearchPatient([])
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Patient Deleted', life: 3000 });
    } catch (error) {
        console.error(error)
    }
    };

const hideDeletePatientDialog = () => {
setDeletePatientDialog(false);
};

const deletePatientDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePatientDialog} />
        <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => { deletePatient(selectedPatients[0].p_id); hideDeletePatientDialog(); }} />
    </React.Fragment>
);

const rightToolbarTemplate = () => {
    return<>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={searchQuery} onChange={handleSearchInputChange} placeholder="Patient Name..." />
            </span>
        </div>
    </>
};

    return <>
        <div className='container mt-3'>
            <Toast ref={toast} />
            <div className="container p-2 card h-100 text-capitalize">
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <DataTable className='rounded' ref={dt} value={SearchPatient}  selection={selectedPatients} onSelectionChange={(e) => setSelectedPatients(e.value)}
                    dataKey="p_id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}  columnResizeMode='fit' filterClearIcon showGridlines 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" index="1" reorderableRows
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Patients">
                    <Column selectionMode="multiple" className='text-center' exportable={false}></Column>
                    <Column key="name" field="p_name" header="name" className='text-center'sortable />
                    <Column key="id" field="p_id" header="Id" className='text-center'sortable />
                    <Column key="age"     field="age_years" header="age" className='text-center'  sortable />
                    <Column key="Height"  field='p_height' header="Height" className='text-center'  sortable />
                    <Column key="Weight"  field='p_weight' header="Weight" className='text-center'  sortable />
                    <Column key="BSA"     field='p_bsa'  header="BSA" className='text-center'  sortable />
                    <Column field="p_gender" header="Gender" className='text-center' body={(rowData) => (<span>{rowData.p_gender ? 'Male' : 'Female'}</span>)} />
                    <Column field="p_smoke" header="Smoker" className='text-center' body={(rowData) => ( <span>{rowData.p_smoke ? 'Smoker' : 'Non-smoker'}</span> )} />
                    <Column key="Date" field="p_submit_date" header="Date" className='text-center'  sortable />
                    <Column body={actionBodyTemplate} className='text-center' exportable={false} ></Column> 
                </DataTable>
                <Dialog visible={deletePatientDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePatientDialogFooter} onHide={hideDeletePatientDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {Patient && (
                            <span>
                                Are you sure you want to delete <b>{Patient.name}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    </>;
}














