import { ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";

export const ImageGallery = ({ imageUrls }) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {imageUrls.map((image, index) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`Imagen ${index + 1} de la nota`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
