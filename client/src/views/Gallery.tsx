import React, { useState } from "react";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import { Box, ImageList, ImageListItem } from "@mui/material";
import hagada from "../imges/Hagada.jpg";
import masoret from "../imges/masoret.jpg";
import teva from "../imges/teva.jpg";
import img1 from "../imges/gallery_6A0A5226.jpg";
import img2 from "../imges/6A0A9532 copy.jpg";
import img3 from "../imges/6A0A5428 copy.jpg";
import img4 from "../imges/6A0A9056 copy.jpg";
import img5 from "../imges/6A0A5428 copy.jpg";
import img6 from "../imges/6A0A9552 copy.jpg";
import img7 from "../imges/gallery_6A0A3213.jpg";
import img8 from "../imges/gallery_6A0A3245.jpg";
import img9 from "../imges/gallery_6A0A5153.jpg";
import img10 from "../imges/gallery_6A0A3300.jpg";
import img11 from "../imges/gallery_6A0A3336.jpg";
import img12 from "../imges/gallery_6A0A4866.jpg";
import img13 from "../imges/gallery_6A0A4870.jpg";
import img14 from "../imges/gallery_6A0A4940.jpg";
import img15 from "../imges/gallery_6A0A4945.jpg";
import img16 from "../imges/gallery_6A0A4996.jpg";
import img17 from "../imges/gallery_6A0A5272.jpg";
import img18 from "../imges/gallery_6A0A5192.jpg";
const fadeImages = [
    {
      url: hagada,
    },
    {
      url: masoret,
    },
    {
      url: img1,
    },
    {
      url: img2,
    },
    {
      url: img3,
    },
    {
      url: img4,
    },
    {
      url: img5,
    },
    {
      url: img6,
    },
    {
      url: img7,
    },
    {
      url: img8,
    },
    {
      url: img9,
    },
    {
      url: img10,
    },
    {
      url: img11,
    },
    {
      url: img12,
    },
    {
      url: img13,
    },
    {
      url: img14,
    },
    {
      url: img15,
    },
    {
      url: img16,
    },
    {
      url: img17,
    },
    {
      url: img18,
    },
  ];
function Gallery() {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageList sx={{ width: 900, height: 600 }} cols={3} rowHeight={164}>
          {fadeImages.map((item) => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.url}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default Gallery;
