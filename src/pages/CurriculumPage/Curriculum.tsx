import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

import { Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";

import { subjectData, curriculumData, ApiResponse } from './types';


export default function Curriculum() {
  const {auth} = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [curriculumData, setCurriculumData] = useState<subjectData[] | null>(null);
  const [studentCurriculum, setStudentCurriculum] = useState<any[]>([] as any[]);
  const [clavesArray, setClavesArray] = useState<string[]>([]);
  const config = {
    headers: {
      'Authorization': `Bearer ${cookies.token}`
    }
  }


  useEffect(() => {
    if (auth.user){
      if (auth.user.roles?.find(role => role === "admin")) {
        navigate('/admin')
        return;
      } else if (auth.user.roles?.find(role => role === "coordinator" || role === "assistant")) {
        navigate('/smart')
        return;
      }
    }

    const filterTakenSubjects = (subjects: any[]) => {
      // Filter subjects with grade not null and greater or equal to 60
      const filteredSubjects = subjects.filter(subject => subject.grade !== null && subject.grade >= 60);
    
      // Extract and store claves in an array
      const claves = filteredSubjects.map(subject => subject.subject.clave);
    
      // Do something with the clavesArray, for example, log it
      console.log('Filtered Claves:', claves);
    
      // Return the clavesArray or use it as needed in your application
      return claves;
    };

    const urlCurriculum = `${process.env.REACT_APP_API_URL}/curriculums/student`;
    console.log(`url: ${urlCurriculum}`)
    console.log(`config: ${config.headers.Authorization}`)
    const fetchCurriculum = async () => {
      try {
        const res = await axios.get<ApiResponse>(urlCurriculum, config);
        const { message, curriculum } = res.data;
    
        if (message === "success") {
          setCurriculumData(curriculum.subjects);
        } else {
          console.error("Error fetching curriculum:", message);
        }
      } catch (error) {
        console.error("Error fetching curriculum:", error);
      }
    };
  

    const urlStudentCurriculum = `${process.env.REACT_APP_API_URL}/students/subjects`;
    console.log(`url: ${urlStudentCurriculum}`)
    console.log(`config: ${config.headers.Authorization}`)
    const fetchStudentCurriculum = async () => {
      const res = await axios.get(urlStudentCurriculum, config).then(res => res.data);
    
      if (res.message === "success") {
        setStudentCurriculum(res.subjects);
    
        // Call the filterAndStoreSubjects function with the subjects data
        setClavesArray(filterTakenSubjects(res.subjects));
        console.log(clavesArray);
        
      } else {
        alert(res.message);
      }
    };

    fetchCurriculum();
    fetchStudentCurriculum();
  }, [])
  
  const tableHeadLabels = [
    'Semestre',
    'Clave',
    'Nombre',
    'Creditos',
    'Horas',
    'Competencias',
    'Modulo',
    'Cursada',
];


return (
  <>
    <Box component="form" sx={{ mt: 3 }}>
      <TableContainer className="m-4 p-4 border border-gray-300 rounded-lg shadow-lg">
        <Table className="min-w-full">
          <TableHead>
            <TableRow className="bg-gray-200">
              {tableHeadLabels.map((label, index) => (
                <TableCell key={index} className="font-bold text-gray-700 py-2">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {curriculumData === null ? (
            <TableRow>
              <TableCell colSpan={tableHeadLabels.length}>Loading...</TableCell>
            </TableRow>
          ) : curriculumData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeadLabels.length}>No data available</TableCell>
            </TableRow>
          ) : (
            curriculumData.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{/*semester_number*/0}</TableCell>
                <TableCell>{subject.clave}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>{subject.total_hours}</TableCell>
                <TableCell>{subject.competences}</TableCell>
                <TableCell>{subject.module}</TableCell>
                <TableCell>{clavesArray.includes(subject.clave) ? 'Sí' : 'No'}</TableCell>
              </TableRow>
            ))
          )}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </>
);
}