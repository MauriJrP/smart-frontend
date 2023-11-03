import {FormEvent, ChangeEvent} from 'react';
import { MenuItem, Container, Typography, Box, Grid, Link, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {useForm} from '../../hooks/useForm';

import { useAuth } from '../../hooks/useAuth';

const theme = createTheme();

interface IFormData {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number
}

const genders = ["Hombre", "Mujer", "No especificar"];

const initialState: IFormData = {
  name: '',
  email: '',
  password: '',
  gender: '',
  age: 0,
}


// type

export default function SignUp() {
  const {formData, handleInputChange} = useForm<IFormData>(initialState);
  const {signup} = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await signup({...formData, gender: getGender(formData.gender)});
    if (result === "") navigate('/sign-in'); //logged in
    else alert(result);
    // alert(result);
  }

  const getGender = (gender: string) => {
    if (gender === 'Hombre') return "M"
    else if (gender === "Mujer") return "F"
    return "U"
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="Nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                select
                label="Sexo"
                name="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                fullWidth
              >
                {genders.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="age"
                  required
                  fullWidth
                  label="Edad"
                  value={formData.age}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'number')}
                  type="number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to='/sign-in' variant="body2">
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}