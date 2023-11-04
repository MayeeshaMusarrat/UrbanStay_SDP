import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const PictureGallery = ({ pictures }) => {
  if (!pictures || pictures.length < 5) {
    // Handle the case when the pictures array is missing or doesn't have enough items
    return <div>No pictures available</div>;
  }
  
 console.log("pics: ", pictures);

  const itemData = [
    {
      img: pictures[0].URL || '',
      title: 'Image 1',
    },
    {
      img: pictures[1].URL || '',
      title: 'Image 2',
    },
    {
      img: pictures[2].URL || '',
      title: 'Image 3',
    },
    {
      img: pictures[3].URL || '',
      title: 'Image 4',
    },
    {
      img: pictures[4].URL || '',
      title: 'Image 5',
    },
  ];



  return (
    <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <ImageList sx={{ height: 600, width: 720, marginRight: 0.5}} cols={1} rowHeight={100} >
        <ImageListItem key={itemData[0].img}>
          <img
            src={itemData[0].img}
            alt={itemData[0].title}
            loading="lazy"
          />
        </ImageListItem>
      </ImageList>
    </div>
    <div style={{ flex: 2 }}>
      <ImageList sx={{ width: 640, height: 240, marginBottom: 0.5 }} cols={2}>
        {itemData.slice(1, 3).map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <ImageList sx={{ width: 640, height: 240 }} cols={2}>
        {itemData.slice(-2).map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      
    </div>
  </div>
  );
};

export default PictureGallery;
