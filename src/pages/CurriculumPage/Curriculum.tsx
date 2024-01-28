// @ts-nocheck
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { Box, Grid, Card } from "@mui/material";

import { subjectData, curriculumData, ApiResponse } from './types';


export default function Curriculum() {
  const { auth } = useAuth();
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
  let [semesterCount, setSemesterCount] = useState(0);


  useEffect(() => {
    if (auth.user) {
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
          console.log("Curriculum:")
          console.log(curriculum.subjects[0].semester_number)
          // iterate through the subjects and get the bigger semester number
          const semester_number = Math.max(...curriculum.subjects.map(subject => subject.semester_number));
          setSemesterCount(semester_number);
          console.log(`Semester number: ${semesterCount}`)
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

  const modulesColors = [
    'bg-blue-400',    // Soft blue
    'bg-green-400',   // Muted green
    'bg-yellow-400',  // Gentle yellow
    'bg-red-400',     // Muted red
    'bg-purple-400',  // Soft purple
    'bg-pink-400',    // Pastel pink
    'bg-indigo-400',  // Light indigo
    'bg-gray-400',    // Light gray
  ];
  


  // associate each module with a color each curriculum will have different modules
  const modulesColorsMap = new Map<string, string>();


  return (
    <>
      <Box component="form">
        <Grid container columns={semesterCount} columnSpacing={0.5} px={5} pt={5} >
          {
            [...Array(semesterCount)].map((_, i) => (
              <Grid item xs={1} key={i}>
                <Card className="bg-slate-700 text-white font-bold py-2 px-4 rounded-sm cursor-pointer text-center">
                  {i + 1}
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <Box component="form">
        <Grid container columns={semesterCount} spacing={0.5} px={5} pt={2} >
          {
            [...Array(semesterCount)].map((_, i) => (
              <Grid item  key={i} xs={1} >
                {
                  curriculumData?.map((subject, index) => (
                    // associate the module with a color if it is not already associated
                    modulesColorsMap.has(subject.module) ? null : modulesColorsMap.set(subject.module, modulesColors.pop() as string),
                    subject.semester_number === i + 1 ? (

                      <Card className={`${modulesColorsMap.get(subject.module)}  text-white font-bold py-2 px-4 my-2 rounded-sm cursor-pointer`} key={index}>
                        {console.log(modulesColorsMap.get(subject.module))}
                        <div className="bg-slate-500  text-white font-bold py-2 px-4 my-2 cursor-pointer flex flex-row space-x-4 w-full">
                          <p>{subject.clave}</p>
                          <p>{subject.semester_number}</p>
                        </div>

                        <div className="info ">
                          <p>{subject.name}</p>
                          <p>{subject.credits}</p>
                        </div>
                      </Card>
                    ) : null
                  ))
                }
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <div className="w-full pt-2">
        <div className='flex justify-center gap-4'>
          {
            Array.from(modulesColorsMap).map(([key, value]) => (
              <div key={key} className={` text-white font-bold py-2 px-4 cursor-pointer w-fit flex gap-1 items-center justify-center`}>
                <div className={`w-4 h-4 ${value} rounded-full`}></div>
                <p className="text-black">{key}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}