import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

import { Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";


export default function Curriculum() {
  const {auth} = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [curriculumData, setCurriculumData] = useState<any[]>([] as any[]);
  const [studentCurriculum, setStudentCurriculum] = useState<any[]>([] as any[]);
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

    const urlCurriculum = `${process.env.REACT_APP_API_URL}/curriculums/student`;
    console.log(`url: ${urlCurriculum}`)
    console.log(`config: ${config.headers.Authorization}`)
    const fetchCurriculum = async () => {
      const res = await (await axios.get(urlCurriculum, config)).data;
      if (res.message === "success")
        setCurriculumData(res.curriculum);
      else alert(res.message)
      
    }
    const urlStudentCurriculum = `${process.env.REACT_APP_API_URL}/students/subjects`;
    console.log(`url: ${urlStudentCurriculum}`)
    console.log(`config: ${config.headers.Authorization}`)
    const fetchStudentCurriculum = async () => {
      const res = await (await axios.get(urlStudentCurriculum, config)).data;
      if (res.message === "success")
        setStudentCurriculum(res.subjects);
      else alert(res.message)
    }

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

const tableHeadLabels2 = [
  'nrc',
  'Clave',
  'Nombre',
  'Creditos',
  'Horas',
  'Competencias',
  'Modulo',
  'tipo',
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
            {curriculumData.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{/*subject.subject.semester_number*/0}</TableCell>
                <TableCell>{subject.subject.clave}</TableCell>
                <TableCell>{subject.subject.name}</TableCell>
                <TableCell>{subject.subject.credits}</TableCell>
                <TableCell>{subject.subject.total_hours}</TableCell>
                <TableCell>{subject.subject.competences}</TableCell>
                <TableCell>{subject.subject.module}</TableCell>
                <TableCell>{/*isTaken()*/}yes</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    <Box component="form" sx={{ mt: 3 }}>
    <TableContainer className="m-4 p-4 border border-gray-300 rounded-lg shadow-lg">
      <Table className="min-w-full">
        <TableHead>
          <TableRow className="bg-gray-200">
            {tableHeadLabels2.map((label, index) => (
              <TableCell key={index} className="font-bold text-gray-700 py-2">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {studentCurriculum.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject.nrc}</TableCell>
              <TableCell>{subject.subject.clave}</TableCell>
              <TableCell>{subject.subject.name}</TableCell>
              <TableCell>{subject.subject.credits}</TableCell>
              <TableCell>{subject.subject.total_hours}</TableCell>
              <TableCell>{subject.subject.competences}</TableCell>
              <TableCell>{subject.subject.module}</TableCell>
              <TableCell>{subject.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  )
}