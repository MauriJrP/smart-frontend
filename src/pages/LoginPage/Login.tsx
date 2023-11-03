import {FormEvent} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';


const theme = createTheme();

interface IFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const {formData, handleInputChange} = useForm<IFormData>({
    email: '',
    password: '',
  });

  const {auth, login} = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await login(formData);
    if (result === "") navigate('/home'); //logged in
    else alert(result);
  };


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
            Iniciar sesión
          </Typography>
          {/* <Box component="form" onSubmit={(e: FormEvent<HTMLFormElement>) => { login(formData) }} noValidate sx={{ mt: 1 }}> */}
          <Box component="form" onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              value={formData.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={formData.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"¿No tienes cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}