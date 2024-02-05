import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Button, TextField, MenuItem, Paper, Typography, CardContent, Card, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';

import axios from 'axios';
import { useAuth } from '../../../../hooks/useAuth';
import { useCookies } from 'react-cookie';
import { useNavigate, Outlet } from 'react-router-dom';


export default function Reports() {
    const [reports, setReports] = useState<any[]>([] as any[]);
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

        const url = `${process.env.REACT_APP_API_URL}/reports/available`;
        console.log(`url: ${url}`)
        console.log(`config: ${config.headers.Authorization}`)
        const fetchReports = async () => {
            const res = await (await axios.get(url, config)).data;
            setReports(res.reports);
        }

        fetchReports();
    }, [])

    // useEffect(() => {

    //     const url = `${process.env.REACT_APP_API_URL}/reports/available`;
    //     console.log(`url: ${url}`)
    //     console.log(`config: ${config.headers.Authorization}`)
    //     const fetchStudents = async () => {
    //         const res = await (await axios.get(url, config)).data;
    //         setStudents(res.students);
    //     }

    //     fetchStudents();
    // }, [])

    const handleCardClick = (id: number) => {
        navigate(`report/${id}`);
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
                <Grid container spacing={3}>
                        {reports.map(report => (
                            <Grid item key={report.id} xs={12} sm={6} md={4}>
                                <Card
                                    className="cursor-pointer"
                                    onClick={() => handleCardClick(report.id)}
                                >
                                    <CardContent>
                                        <Typography variant="h6" className="mb-2 font-semibold">
                                            {report.name}
                                        </Typography>
                                        <Typography variant="body2" className="mb-2">
                                            Descripcion: {report.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>


            </Box>

            <Outlet />
        </>
    )
}