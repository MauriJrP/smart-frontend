import {FormEvent, useEffect} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';


const theme = createTheme();

interface IFormData {
  code: string;
  password: string;
}

export default function SignIn() {
  const {formData, handleInputChange} = useForm<IFormData>({
    code: '',
    password: '',
  });

  const {auth, login} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loggedIn) navigate('/curriculum');
  }, []);

  useEffect(() => {
    if (auth.loggedIn) navigate('/curriculum');
  } , [auth.loggedIn]);

  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await login(formData);
    if (result !== "") alert(result);
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
              label="Codigo"
              name="code"
              autoComplete="code"
              autoFocus
              onChange={handleInputChange}
              value={formData.code}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="NIP"
              type="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={formData.password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}