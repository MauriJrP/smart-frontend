import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Button, TextField, MenuItem, Paper, Typography, CardContent, Card, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';

import axios from 'axios';
import { useAuth } from '../../../../hooks/useAuth';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

export default function Report() {
    const [curriculums, setCurriculums] = useState<any[]>([] as any[]);
    const [students, setStudents] = useState<any[]>([] as any[]);
    const [semester, setSemester] = useState<number>(1);
    const [credits, setCredits] = useState<number>(0);
    const [report, setReport] = useState<number>(0);
    const { auth } = useAuth();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const config = {
        headers: {
            'Authorization': `Bearer ${cookies.token}`,
            'Content-type': 'application/json',
        }
    }
    const report_param = useParams().id;

    useEffect(() => {
        console.log("test")
        if (report_param) {
            setReport(parseInt(report_param));
        }
        // clean students
        setStudents([]);
    }, [report_param])

    const handleCardClick = (id: number) => {
        const url = `${process.env.REACT_APP_API_URL}/reports/${report}?curriculum_clave=${"INCO"}`;
        // create a body with semester if is true
        let body = {};
        if (report === 2 || report === 3) {
            body = {
                semester: semester
            }
        }
        // create a body with credits if is true
        if (report === 4 || report === 5) {
            body = {
                credits: credits
            }
        }
        const fetchReports = async () => {
            const res = await (await axios.post(url, body, config)).data;
            setStudents(res.students);
        }

        fetchReports();
    };

    useEffect(() => {
        console.log("test")
        const url = `${process.env.REACT_APP_API_URL}/curriculums/all`;
        const fetchCurriculums = async () => {
            const res = await (await axios.get(url, config)).data;
            setCurriculums(res.curriculums);
        }

        fetchCurriculums();
    }, [])

    const handleSemesterChange = (event: SelectChangeEvent<number>) => {
        setSemester(event.target.value as number);
    };

    const tableHeadLabels = [
        'Nombre',
        'Código',
        'Ciclo de Admisión',
        'Último Ciclo',
        'Situación',
    ];

    if (report === 4 || report === 5) {
        tableHeadLabels.push('Créditos');
    }

    if (report === 6) {
        tableHeadLabels.push('Materia');
        tableHeadLabels.push('Clave');
    }

    // u.first_name, u.last_name, u.code, u.status, uc.last_cycle, s.name AS subject_name, s.clave AS subject_clave


    return (
        <>
            {/* if report is 2 or 3 add an input for the semester number */}
            {report === 2 || report === 3 ? <Box component="form" sx={{ mt: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="semester-select-label">Semester</InputLabel>
                    <Select
                        labelId="semester-select-label"
                        id="semester-select"
                        value={semester}
                        label="Semestre"
                        onChange={handleSemesterChange}
                        sx={{ width: 100 }}
                    >
                        {Array.from({ length: 16 }, (_, i) => i + 1).map((semester) => (
                            <MenuItem key={semester} value={semester}>
                                {semester}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box> : null}

            {/* if report is 4 or 5 ask for number of credits */}
            {report === 4 || report === 5 ? <Box component="form" sx={{ mt: 3 }}>
                <TextField
                    id="credits"
                    label="Creditos"
                    type="number"
                    value={credits}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCredits(parseInt(e.target.value))}
                />
            </Box> : null}
            <Box sx={{ mt: 3, width: "100%", display: "flex", gap: 2 }}>
                {curriculums.map(curriculum => (
                    <Card key={curriculum.id} className="cursor-pointer w-full bg-light shadow-sm hover:shadow-lg transition-shadow" onClick={() => handleCardClick(curriculum.id)} >
                        <CardContent className='w-full text-center flex justify-center ' >
                            <Typography variant="body2" className="mb-2">
                                {curriculum.clave}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {/* if report is 1, 4, 5 render hola */}
            {report ? <Box component="form" sx={{ mt: 3 }} className='overflow-x-auto max-w-full'>
                <TableContainer className=" p-4 border border-gray-300 rounded-lg shadow-lg">
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
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.first_name + " " + student.last_name}</TableCell>
                                    <TableCell>{student.id_user}</TableCell>
                                    {student.admission_cycle ? <TableCell>{student.admission_cycle}</TableCell> : null}
                                    <TableCell>{student.last_cycle}</TableCell>
                                    <TableCell>{student.status}</TableCell>
                                    {student.credits ? <TableCell>{student.credits}</TableCell> : null}
                                    {student.subject_name ? <TableCell>{student.subject_name}</TableCell> : null}
                                    {student.subject_clave ? <TableCell>{student.subject_clave}</TableCell> : null}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box> : null}

        </>
    )
}

