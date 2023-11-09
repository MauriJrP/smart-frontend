import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Button, TextField, MenuItem, Paper, Typography, CardContent, Card } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';

import axios from 'axios';
import { useAuth } from '../../../../hooks/useAuth';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function Curriculums() {
    const [curriculums, setCurriculums] = useState<any[]>([] as any[]);
    const { auth } = useAuth();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${cookies.token}`
        }
    }
    

    const [formData, setFormData] = useState<{
        name: string;
        clave: string;
        date: string;
        total_credits: number;
        subjects: Array<{
          name: string;
          clave: string;
          credits: number;
          semester_number: number;
          total_hours: number;
          competences: string;
          module: string;
        }>;
      }>({
        name: '',
        clave: '',
        date: '',
        total_credits: 0,
        subjects: [],
      });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const handleAddSubject = () => {
      setFormData({
        ...formData,
        subjects: [
          ...formData.subjects,
          {
            name: '',
            clave: '',
            credits: 0,
            semester_number: 0,
            total_hours: 0,
            competences: '',
            module: '',
          },
        ],
      });
    };
    
    const handleRemoveSubject = (index: number) => {
      const subjects = [...formData.subjects];
      subjects.splice(index, 1);
      setFormData({
        ...formData,
        subjects,
      });
    };

    
    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { name, value } = e.target;
      const subjects = [...formData.subjects];
      subjects[index] = {
        ...subjects[index],
        [name]: value,
      };
      setFormData({
        ...formData,
        subjects,
      });
    };
  
    
    
    const urlCurriculum = `${process.env.REACT_APP_API_URL}/curriculums/add`;
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      console.log(`url: ${urlCurriculum}`)
      console.log(`config: ${config.headers.Authorization}`)
      console.log(JSON.stringify(formData))

      try {
        const response = await (await axios.post(urlCurriculum, JSON.stringify(formData), config)).data;
    
        if (response.data.message === 'success') {
          console.log(`Malla registrada exitosamente!`)
        } else {
          console.log(`No pudo completarse el registro`)// Handle API error
        }
      } catch (error) {
        // Handle any network or request error
      }
    };
  

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label htmlFor="clave_curriculum">Clave:</label>
            <input
            id="clave_curriculum"
            type="text"
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label htmlFor="date">Date:</label>
            <input
            id="date"
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label htmlFor="total_credits">Total Credits:</label>
            <input
            id="total_credits"
            type="number"
            name="total_credits"
            value={formData.total_credits}
            onChange={handleInputChange}
            />
        </div>
        {formData.subjects.map((subject, index) => (
            <div key={index}>
                <label htmlFor={`subject_name_${index}`}>Nombre {index + 1}:</label>
                <input
                id={`subject_name_${index}`}
                type="text"
                name="name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <label htmlFor={`subject_clave${index}`}>Clave:</label>
                <input
                id={`subject_clave${index}`}
                type="text"
                name="clave"
                value={subject.clave}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <label htmlFor={`subject_credits${index}`}>Creditos:</label>
                <input
                id={`subject_credits${index}`}
                type="number"
                name="credits"
                value={subject.credits}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <label htmlFor={`subject_semester_number${index}`}>Semestre:</label>
                <input
                id={`subject_semester_number${index}`}
                type="number"
                name="semester_number"
                value={subject.semester_number}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <label htmlFor={`subject_total_hours${index}`}>Total de horas:</label>
                <input
                id={`subject_total_hours${index}`}
                type="number"
                name="total_hours"
                value={subject.total_hours}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <label htmlFor={`subject_competences${index}`}>Competencias:</label>
                <input
                id={`subject_competences${index}`}
                type="text"
                name="competences"
                value={subject.competences}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <label htmlFor={`subject_module${index}`}>Modulo:</label>
                <input
                id={`subject_module${index}`}
                type="text"
                name="module"
                value={subject.module}
                onChange={(e) => handleSubjectChange(e, index)}
                />
                <button type="button" onClick={() => handleRemoveSubject(index)}>
                    Remove Subject
                </button>
            </div>
        ))}
        <button type="button" onClick={handleAddSubject}>
            Add Subject
        </button>
        <button type="submit">Submit</button>
        </form>
    )
}