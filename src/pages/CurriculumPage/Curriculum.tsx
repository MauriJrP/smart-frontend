// @ts-nocheck
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";

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
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500',
  ];


  // associate each module with a color each curriculum will have different modules
  const modulesColorsMap = new Map<string, string>();


  return (
    <>
      <div className={`subject grid grid-cols-${semesterCount} gap-4 px-10 pt-10`}>
        {
          [...Array(semesterCount)].map((_, i) => (
            <div className="bg-slate-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer text-center" key={i}>
              {i + 1}
            </div>
          ))
        }
      </div>
      <div className={`subject grid grid-cols-${semesterCount} gap-4 p-10`}>
        {
          [...Array(semesterCount)].map((_, i) => (
            <div className="bg-slate-800 text-white font-bold py-2 px-4 rounded-sm cursor-pointer" key={i}>
              {
                curriculumData?.map((subject, index) => (
                  // associate the module with a color if it is not already associated
                  modulesColorsMap.has(subject.module) ? null : modulesColorsMap.set(subject.module, modulesColors.pop() as string),
                  subject.semester_number === i + 1 ? (

                    <div className={`${modulesColorsMap.get(subject.module)}  text-white font-bold py-2 px-4 my-2 cursor-pointer`} key={index}>
                      {console.log(modulesColorsMap.get(subject.module))}
                      <div className="bg-blue-500  text-white font-bold py-2 px-4 my-2 cursor-pointer flex flex-row space-x-4 w-full">
                        <p>{subject.clave}</p>
                        <p>{subject.semester_number}</p>
                      </div>

                      {subject.name}
                      {subject.credits}
                    </div>
                  ) : null
                ))
              }
            </div>
          ))
        }
      </div>
      <div className="flex justify-center w-full">
        <div className='w-1/2'>
          {
            Array.from(modulesColorsMap).map(([key, value]) => (
              <div key={key} className={`${value} text-white font-bold py-2 px-4 cursor-pointer w-fit`}>
                <p>{key}</p>
              </div>
            ))
          }
        </div>


      </div>
    </>
  );
}