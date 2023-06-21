import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";

export default function GeneExpression() {
  const [gene, setGene] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [GeneData, setGeneData] = useState()

  const handleKeyDown = (event) => {
    const charCode = event.which || event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      // Prevent entering numbers
      event.preventDefault();
    } else if (charCode >= 33 && charCode <= 47) {
      // Prevent entering symbols
      event.preventDefault();
    }
  };

  const handleShowResult = () => {
    // call the gene_search API with the current gene input
    fetch('http://localhost:5000/gene_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gene })
    })
    .then(response => response.json())
    .then(data => {
      // set the returned data to state and show the overlay
      setGeneData(data[0]);
      setShowOverlay(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    handleReset('')
  };

  const handleReset = () => {
    setGene('');
  };

  return <>
      <Helmet>
      <title>ClonGuard | Gene Exepression</title>
    </Helmet>

      <section id="geneExpression" className="gene expression mb-5">
        <div className="container">
          <div className="section-title">
            <h2>Gene Expression</h2>
          </div>
        </div>
        <div className="form-box secContainer bg-light rounded text-center shadow-sm w-50 mx-auto p-3">
          <div>
            <textarea onChange={(e) => setGene(e.target.value)} onKeyDown={handleKeyDown} value={gene} className="form-control w-75 mx-auto" rows="10" placeholder="Gene Expression..." required></textarea>
          </div>
          <br/>
          <div>
            <input type="reset" className="btn btn-danger w-auto mb-2" onClick={handleReset}/>
          </div>
          <div>
            <button type="button" className="btn btn-primary" onClick={handleShowResult}> show result</button>
          </div>
        </div>
      </section>

      {showOverlay && (
  <div className="overlay d-flex justify-conetent-center align-items-center" style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999}}>
    <div className="overlay-container container rounded" style={{backgroundColor: '#fff', margin: '10% auto', padding: '20px', width: '50%', overflow: 'auto'}}>
      {GeneData.error ? <p className='text-danger'>{GeneData.error}</p>
      : <>
      <p className='text-dark-blue'> This gene is: {GeneData.gene_name}</p>
      <p className='text-dark-blue'>Consensus coding sequence ID: {GeneData.ccs_id}</p>
      <p className='text-dark-blue'> Gene Type: {GeneData.gene_type}</p>
      {GeneData.Mutation_Type ? 
      <p className='text-dark-blue'> Mutation_Type: <span className='text-danger'>{GeneData.Mutation_Type}</span></p>
      : 
      null
      }
      <div className="geneCompare mb-1">
      <p id='original_gene' className='text-dark-blue m-0'>{GeneData.original_gene}</p>
      <p id='lines' className='text-dark-blue m-0'>{GeneData.lines.split().join(' ')}</p>
      <p id='target_gene' className='text-dark-blue m-0'>{GeneData.target_gene}</p>
      </div>
      <p className='text-dark-blue'> {GeneData.final_score}</p>
      <p className='text-dark-blue'> Max Alignment Score: {GeneData.max_score}</p>
      <p className='text-dark-blue'> Match Score is: {GeneData.match_score}</p>
      <p className='text-dark-blue'> Mismatch Score: {GeneData.mismatch_score}</p>
     <p className='text-dark-blue'> Gap Extension Score: {GeneData.gap_extension_score}</p>
      <p className='text-dark-blue'> Gap Opening Score: {GeneData.gap_opening_score}</p>
      <p className='text-dark-blue'> NCBI Gene Link: {GeneData.gene_url}</p>
      </>
    }
      <button type="button" className="btn btn-danger" onClick={handleCloseOverlay}>Close</button>
    </div>
  </div>
)}
    </>;
}