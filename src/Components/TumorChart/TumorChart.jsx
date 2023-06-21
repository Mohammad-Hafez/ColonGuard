import React, { PureComponent, useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import moment from 'moment';
import { DrEmaiContext } from '../../Context/drEmailContext';
import supabase from '../Api/Api';
import toast, { Toaster } from "react-hot-toast";

const currentDate = moment();
const labels = [];
for (let i = 4; i >= 0; i--) { // Change loop to only include 5 values
  const month = currentDate.clone().subtract(i, 'months').format('MMMM');
  labels.push(month);
}

const data = {
  labels: labels,
  datasets: [
    {
      label: 'CEA',
      data: [.4, 0, .2, .05, 0, 0.17],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    },
    {
      label: 'CA19',
      data: [0.5, 0.18, 0.4, 0, 0.24, 0.3],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgb(255, 159, 64)',
      borderWidth: 1
    },
    {
      label: 'CA50',
      data: [.30, 0.6, 0, 0.2, 0.1, .03],
      backgroundColor: 'rgba(255, 205, 86, 0.2)',
      borderColor: 'rgb(255, 207, 86)',
      borderWidth: 1
    },
    {
      label: 'CA24',
      data: [0.1, 0.3, 0.4, 0.5, 0.6, 0.7],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1
    },
    {
      label: 'AFP',
      data: [0.3, 0.04, 0.15, 0.26, 0.07, 0.18],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }
  ],
  options: {
    scales: {
      y: {
        min: 0,
        max: 1.5,
        ticks: {
          stepSize: 0.1
        }
      }
    }
  }
};
export default function TumorChart({id}) {
  let {DrEmail} = useContext(DrEmaiContext)
  const [APIData, setAPIData] = useState(null);
  const [ResetChartLoad, setResetChartLoad] = useState(false)
  async function fetchTumorData() {
    try {
      const { data, error } = await supabase.rpc('get_tumor_data', {
        doctor_email: DrEmail,
        patient_id: id
      });
        setAPIData(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteChart(){
    setResetChartLoad(true)
    try {
      let { data, error } = await supabase.rpc('delete_tumors_for_patient', {
    p_id_input : id
    })
    setAPIData(null)
    toast.success(data);
    } catch (error) {
      console.error(error);
    }
    setResetChartLoad(false)
  }
  useEffect(() => {
    fetchTumorData();
  }, []);

  
  // Create a dynamic datasets array based on APIData
  let datasets = [
    {
      label: 'CEA',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    },
    {
      label: 'CA19',
      data: [],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgb(255, 159, 64)',
      borderWidth: 1
    },
    {
      label: 'CA50',
      data: [],
      backgroundColor: 'rgba(255, 205, 86, 0.2)',
      borderColor: 'rgb(255, 205, 86)',
      borderWidth: 1
    },
    {
      label: 'CA24',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1
    },
    {
      label: 'AFP',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColorContinued:'rgb(54, 162, 235)',
      borderWidth: 1
    }
  ];

if (APIData) {
  datasets.forEach((dataset, index) => {
    const key = Object.keys(APIData[0])[index + 1];
    dataset.label = key.toUpperCase();
    dataset.data = APIData?.slice(-5).map(d => d[key]); // Only take the last 5 data points
  });
}
const updatedData = {
  labels: APIData ? APIData?.slice(-5).map(d => d.submit_date) : labels, // Use last 5 data points if available
  datasets: datasets,
  options: {
    scales: {
      y: {
        min: 0,
        max: 1.5,
        ticks: {
          stepSize: 0.1
        }
      }
    }
  }
};
  return (
    <div className="container">
      <Bar data={updatedData} />
      {ResetChartLoad ? <button type="button" className='btn btn-danger w-100 text-light'><i className=' fa fa-spin fa-spinner'></i></button>
      :
      <button className='my-2 btn btn-danger w-100' onClick={deleteChart}>Reset Tumor Marker Chart</button>
      }
    </div>
  );
}



