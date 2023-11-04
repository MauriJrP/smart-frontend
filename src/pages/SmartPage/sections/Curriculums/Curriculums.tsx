import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Button, TextField, MenuItem } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';

import axios from 'axios';
import { useAuth } from '../../../../hooks/useAuth';


export default function Curriculums() {
    const [curriculums, setCurriculums] = useState<any[]>([] as any[]);
    const { auth } = useAuth();
    console.log(`Bearer ${document.cookie}`)
    const config = {
        headers: {
            'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
        }
    }

    useEffect(() => {

        const url = `${process.env.REACT_APP_API_URL}/curriculums/all`;
        const fetchCurriculums = async () => {
            const res = await (await axios.get(url, config)).data;
            console.log(res);
            // setCurriculums(res.curriculums);
        }

        fetchCurriculums();
    }, [])

    //   const handleGalleryChange = (index: number, gallery: IGalleryUpload) => {
    //     setGalleries((prevState: IGalleryUpload[]) => {
    //       const newState = [...prevState];
    //       newState[index] = gallery;
    //       return newState;
    //     });
    //   }


    //   const removeVoidGalleries = () =>
    //     setGalleries((prevState) => prevState.filter((gallery) => gallery.images.length >= 1));


    return (
        <>
            <Box component="form" sx={{ mt: 3 }}>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Agregar Lugar
                </Button>
            </Box>
        </>
    )
}