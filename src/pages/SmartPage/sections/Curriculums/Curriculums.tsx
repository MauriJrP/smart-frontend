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
            'Authorization': `Bearer ${cookies.token}`
        }
    }

    useEffect(() => {

        const url = `${process.env.REACT_APP_API_URL}/curriculums/all`;
        const fetchCurriculums = async () => {
            const res = await (await axios.get(url, config)).data;
            setCurriculums(res.curriculums);
        }

        fetchCurriculums();
    }, [])

    const handleCardClick = (id: number) => {
        navigate(`/curriculum/${id}`);
    };

    return (
        <>
            <Box component="form" sx={{ mt: 3 }}>
                {/* show curriculums */}
                <Grid container spacing={3}>
                    {curriculums.map(curriculum => (
                        <Grid item key={curriculum.id} xs={12} sm={6} md={4}>
                            <Card
                                className="cursor-pointer bg-light shadow-sm hover:shadow-lg transition-shadow"
                                onClick={() => handleCardClick(curriculum.id)}
                            >
                                <CardContent>
                                    <Typography variant="h6" className="mb-2 font-semibold">
                                        {curriculum.name}
                                    </Typography>
                                    <Typography variant="body2" className="mb-2">
                                        Clave: {curriculum.clave}
                                    </Typography>
                                    <Typography variant="body2" className="mb-2">
                                        Creditos totales: {curriculum.total_credits}
                                    </Typography>
                                    <Typography variant="body2" className="mb-2">
                                        Fecha {curriculum.date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Agregar Malla
                </Button> */}
            </Box>
        </>
    )
}