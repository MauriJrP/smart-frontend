import { MenuItem, Rating, TextField, Grid, Button } from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';
import {useForm} from '../../../hooks/useForm';
import { IFilters } from '../types';

interface IFormData {
  type?: string;
  location?: string;
  price?: number;
  rating?: number;
}

const initialState: IFormData = {
  type: '',
  location: '',
  price: 0,
  rating: 0,
}

interface IProps {
  search: (filters: IFilters) => void
}

export default function Searcher({search}: IProps) {
  const {formData, handleInputChange, handleRatingChange} = useForm<IFormData>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData === initialState) return; //No filters applied
    // console.log(formData);
    const filters: IFilters = {};
    if (formData.price !== initialState.price) filters.price = formData.price
    if (formData.rating !== initialState.rating) filters.rating = formData.rating
    // console.log(filters)
    search(filters);
  }

  return (
    <form onSubmit={handleSubmit}  >
      <TextField
        select
        label="Tipo de lugar"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        fullWidth
      >
      </TextField>
      <TextField
        select
        label="Ubicación"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        fullWidth
        className="mt-3"
      >
      </TextField>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="price"
            className="mt-3"
            fullWidth
            label="Precio Máximo"
            value={formData.price}
            onChange={(e:ChangeEvent<HTMLInputElement>)=> handleInputChange(e, 'number')}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <div className="mt-3 px-2">
            <p>Valoración</p>
            <Rating
              name="simple-controlled"
              value={formData.rating}
              onChange={handleRatingChange}
            />
          </div>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" className="mt-3" fullWidth>
        Buscar
      </Button>
    </form>
  )
}