import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useAuth } from '../Contexts/AuthContext';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

export default function ApplyForm() {
    const [resumerFile, setResumerFile] = useState(null);
    const [applyData, setApplyData] = useState({
        id:'',
        prenom: '',
        resumerFile: '',
      });
      const {api} = useAuth(); 
      const navigate=useNavigate();

      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    useEffect(()=>{scrollToTop()},[]);

      const handleApplication = ()=>{
      //for paper
      if(resumerFile){
        const paperData = new FormData();
        paperData.append('resumer', resumerFile);
        paperData.append('auteurId', Cookies.get('id') );
        paperData.append('status', "in progress");
        api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
        api.post('/api/apply', paperData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            alert("Application succed");
            navigate('/');
              
        })
            .catch(error => {
                console.error('Error uploding paper', error);
            });
        };
    }

  
    const handleResumerChange = (event) => {
      const file = event.target.files[0];
      setResumerFile(file);
  };
  return (

<div className="wrapper bg-white">
 <h4 className="pb-4 border-bottom">Application details</h4>
            
  {/* Research Interests */}
  <div className="row py-2">
    <div className="col-md-12">
      <label htmlFor="researchInterests">Research Interests</label>
      <textarea
        className="bg-light form-control"
        rows="3"
        placeholder="Briefly describe your research interests"
        value={applyData.researchInterests}
        onChange={event =>
            setApplyData(prevData => ({
            ...prevData,
            researchInterests: event.target.value,
          }))
        }
      ></textarea>
    </div>
  </div>

  {/* Project Experience */}
  <div className="row py-2">
    <div className="col-md-12">
      <label htmlFor="projectExperience">Project Experience</label>
      <textarea
        className="bg-light form-control"
        rows="3"
        placeholder="Briefly describe your previous research projects or publications"
        value={applyData.projectExperience}
        onChange={event =>
          setApplyData(prevData => ({
            ...prevData,
            projectExperience: event.target.value,
          }))
        }
      ></textarea>
    </div>
  </div>


        <div className="py-3">
          <b style={{ fontSize: '1.2rem' }}>Paper</b>
          <p style={{ fontSize: '0.8rem' }}>
              Put your cin, phd-cart-student,.. in one pdf and <b>upload it</b>
          </p>
        <input
              type="file"
              className='form-control'
              id="resumer"
              accept=".pdf"
              onChange={handleResumerChange}
            />
      </div>

        <div className="py-3 pb-4">
          <button type="button" className="btn btn-primary btn-lg" onClick={handleApplication}>Apply</button>
        </div>
</div>
)}
