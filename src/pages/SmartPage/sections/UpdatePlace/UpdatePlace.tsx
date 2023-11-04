import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Grid, Button, TextField, MenuItem} from '@mui/material';
import {placeTypes, locations} from '../../../../data';

interface IFormData {
  name: string;
  address: string;
  openingHours: string;
  phone: string;
  placeCode: string;
  manager?: string;
  price: number;
  adminCode: string;
  placeType: string;
  description: string;
  photos: string[];
}

export default function UpdatePlace() {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    address: '',
    openingHours: '',
    phone: '',
    placeCode: '',
    manager: '',
    price: 0,
    adminCode: '',
    placeType: '',
    description: '',
    photos: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState: IFormData) => ({
      ...prevState,
      [name]: name === "price" ? parseInt(value) : value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    navigate('/home')
  };

  return (
    <>
      <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Código del lugar"
                  name="placeCode"
                  value={formData.placeCode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Horario"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Telefono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Gerente"
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                select
                label="Tipo de lugar"
                name="placeType"
                value={formData.placeType}
                onChange={handleInputChange}
                fullWidth
              >
                {placeTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  fullWidth
                  label="Costo"
                  value={formData.price}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  multiline
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Actualizar Informacion
            </Button>
      </Box>
    </>
  )
}
