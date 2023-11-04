import { Button, ImageList } from "@mui/material";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {IoIosCloseCircle} from 'react-icons/io'
import axios from 'axios'

interface IProps {
  images: never[];
  setImages: (images: never[]) => void;
}

export default function ImageUploader({ images, setImages }: IProps) {
  // const [images, setImages] = React.useState([]);
  const maxNumber = 12;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  // const upload = async () => {
  //   if (images.length === 0) return;

  //   const url = `${process.env.REACT_APP_API_URL}/places/create`;
  //   const config = {
  //     headers: {
  //       'Content-type': 'multipart/form-data'
  //     }
  //   }

  //   const formData: FormData = new FormData();
  //   images.forEach((image: any) => formData.append('images', image.file));
  //   const data = await (await axios.post(url, formData, config)).data;
  // }

  return (
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 items-center justify-center p-2 overflow-x-auto">
              {imageList.map((image, index) => (
                <div key={index} className="image-item relative w-max mx-auto p-3 bg-slate-50 drop-shadow-lg rounded-lg justify-center">
                  <img src={image.dataURL} alt="" width="100" height="100" className="" />
                  <IoIosCloseCircle className=" text-red-600 cursor-pointer text-xl absolute top-0 right-0" onClick={() => onImageRemove(index)}/>
                </div>
              ))}
            </div>
            <Button 
              variant="contained"
              color="success" 
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}>
              Click o Arastra aqui
            </Button>
            <Button variant="contained" color="error" onClick={onImageRemoveAll}>Eliminar todas las imagenes</Button>
            {/* <Button variant="contained" color="success" onClick={upload}>Subir</Button> */}
          </div>
        )}
      </ImageUploading>
  );
}
