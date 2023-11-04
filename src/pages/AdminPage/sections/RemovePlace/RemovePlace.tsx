// import {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import {Box, Grid, Button, TextField, MenuItem} from '@mui/material';
// import {placeTypes, locations} from '../../../../data';

// interface IFormData {
//   placeCode: string;
//   adminCode: string;
//   cause: string;
// }

// export default function RemovePlace() {
//   const [formData, setFormData] = useState<IFormData>({
//     placeCode: '',
//     adminCode: '',
//     cause: '',
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData((prevState: IFormData) => ({
//       ...prevState,
//       [name]: name === "price" ? parseInt(value) : value
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(formData)
//     navigate('/home')
//   };

//   return (
//     <>
//       <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   name="placeCode"
//                   required
//                   fullWidth
//                   label="Código del lugar"
//                   value={formData.placeCode}
//                   onChange={handleInputChange}
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Razón de la baja"
//                   multiline
//                   rows={4}
//                   name="cause"
//                   value={formData.cause}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Eliminar Lugar
//             </Button>
//       </Box>
//     </>
//   )
// }
