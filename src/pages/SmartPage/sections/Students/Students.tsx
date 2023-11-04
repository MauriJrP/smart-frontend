import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Button, TextField, MenuItem, Paper, Typography, CardContent, Card, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';

import axios from 'axios';
import { useAuth } from '../../../../hooks/useAuth';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function Students() {
    const [students, setStudents] = useState<any[]>([] as any[]);
    const { auth } = useAuth();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const config = {
        headers: {
            'Authorization': `Bearer ${cookies.token}`
        }
    }

    useEffect(() => {

        const url = `${process.env.REACT_APP_API_URL}/students/all`;
        console.log(`url: ${url}`)
        console.log(`config: ${config.headers.Authorization}`)
        const fetchStudents = async () => {
            const res = await (await axios.get(url, config)).data;
            setStudents(res.students);
        }

        fetchStudents();
    }, [])

    const handleCardClick = (id: number) => {
        navigate(`/curriculum/${id}`);
    };

    const tableHeadLabels = [
        'Ciclo de Admisión',
        'Calendario de Admisión',
        'Promedio',
        'Campus',
        'Carrera',
        'Código',
        'Créditos Actuales',
        'Nombre',
        'Último Ciclo',
        'Descripción del Último Ciclo',
        'Apellido',
        'Estado'
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
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.admission_cycle}</TableCell>
                                    <TableCell>{student.admission_cycle_calendar}</TableCell>
                                    <TableCell>{student.average}</TableCell>
                                    <TableCell>{student.campus}</TableCell>
                                    <TableCell>{student.career}</TableCell>
                                    <TableCell>{student.code}</TableCell>
                                    <TableCell>{student.current_credits}</TableCell>
                                    <TableCell>{student.first_name}</TableCell>
                                    <TableCell>{student.last_cycle}</TableCell>
                                    <TableCell>{student.last_cycle_desc}</TableCell>
                                    <TableCell>{student.last_name}</TableCell>
                                    <TableCell>{student.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}