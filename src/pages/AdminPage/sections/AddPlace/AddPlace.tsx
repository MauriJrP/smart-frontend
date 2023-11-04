// import {FormEvent, ChangeEvent, useState, useEffect} from 'react';
// import {Box, Grid, Button, TextField, MenuItem} from '@mui/material';
// import {useForm} from '../../../../hooks/useForm';
// // import {usePlaceOptions} from '../../../../hooks/usePlaceOptions';
// import Gallery from '../../components/Gallery'

// import {IGalleryUpload, IPlaceType, ILocation} from '../../../../types';
// import axios from 'axios';

// interface IFormData {
//   name: string;
//   address: string;
//   openingHours: string;
//   phone: string;
//   manager?: string;
//   price: number;
//   placeType: string;
//   location: string;
//   description: string;
// }

// const initialState = {
//   name: '',
//   address: '',
//   openingHours: '',
//   phone: '',
//   manager: '',
//   price: 0,
//   placeType: '',
//   location: '',
//   description: '',
// }

// export default function AddPlace() {
//   const {formData, handleInputChange, resetState} = useForm<IFormData>(initialState);
//   const [galleries, setGalleries] = useState<IGalleryUpload[]>([] as IGalleryUpload[]);

//   const {placeTypes, locations} = usePlaceOptions();

  
//   const addNewGallery = () => {
//     setGalleries((prevState: IGalleryUpload[]) => [...prevState, {name:"", images: []}]);
//   }
  
//   const handleGalleryChange = (index: number, gallery: IGalleryUpload) => {
//     setGalleries((prevState: IGalleryUpload[]) => {
//       const newState = [...prevState];
//       newState[index] = gallery;
//       return newState;
//     });
//   }
  
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     removeVoidGalleries();
//     if (getTotalImages() < 3) {
//       alert("Almenos 3 fotos deben ser registradas")
//       return;
//     }

//     const placeId = await createPlace();
//     if (placeId !== -1) {
//       await uploadGalleries(placeId); // Place inserted on db correctly
//       // resetState(initialState);
//       // setGalleries([]);
//     }
//   }
  
//   const removeVoidGalleries = () =>
//     setGalleries((prevState) => prevState.filter((gallery) => gallery.images.length >= 1));

//   const getTotalImages = () =>
//     galleries.reduce((n, gallery) => n += gallery.images.length, 0);

//   const createPlace = async () => {
//     const url = `${process.env.REACT_APP_API_URL}/places/place/create`;
//     const config = {
//       headers: {
//         'Content-type': 'application/json'
//       }
//     }

//     const res = await (await axios.post(url, formData, config)).data;
//     if (res.message) {
//       alert(res.message);
//       return -1; 
//     }
//     else return res.insertedId;
//   }

//   const uploadGalleries = async (placeId: number) => {
//     const url = `${process.env.REACT_APP_API_URL}/places/place/addGallery`;
//     const config = {
//       headers: {
//         'Content-type': 'multipart/form-data'
//       }
//     }

//     galleries.forEach(async (gallery) => {
//       const formData: FormData = new FormData();
//       gallery.images.forEach((image: any) => formData.append('images', image.file));
//       formData.append('name', gallery.name);
//       formData.append('placeId', placeId.toString());
//       const data = await (await axios.post(url, formData, config)).data;
//     })
//     // const formData: FormData = new FormData();
//     // galleries[0].images.forEach((image: any) => formData.append('images', image.file));
//     // formData.append('name', galleries[0].name);
//     // formData.append('placeId', placeId.toString());
//     // const data = await (await axios.post(url, formData, config)).data;
//   }

//   return (
//     <>
//       <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   name="name"
//                   required
//                   fullWidth
//                   label="Nombre"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Dirección"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Horario"
//                   name="openingHours"
//                   placeholder='00:00-00:00'
//                   value={formData.openingHours}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Telefono"
//                   name="phone"
//                   placeholder='Numero a 10 digitos'
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Gerente"
//                   name="manager"
//                   value={formData.manager}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                 select
//                 label="Tipo de lugar"
//                 name="placeType"
//                 value={formData.placeType}
//                 onChange={handleInputChange}
//                 fullWidth
//                 >
//                   {placeTypes.map((placeType) => (
//                     <MenuItem key={placeType.idPlaceType} value={placeType.placeType}>
//                       {placeType.placeType}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                 select
//                 label="Municipio"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 fullWidth
//                 >
//                   {locations.map((location) => (
//                     <MenuItem key={location.idLocation} value={location.location}>
//                       {location.location}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="price"
//                   fullWidth
//                   label="Costo promedio por visita"
//                   value={formData.price}
//                   onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'number')}
//                   type="number"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Descripción"
//                   multiline
//                   required
//                   rows={4}
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={addNewGallery}> Agregar Galeria   </Button>
//               </Grid>
//               {galleries.map((gallery, index) => <Gallery key={index} gallery={gallery} setGallery={(gallery) => handleGalleryChange(index, gallery)}/>)}
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Agregar Lugar
//             </Button>
//       </Box>
//     </>
//   )
// }