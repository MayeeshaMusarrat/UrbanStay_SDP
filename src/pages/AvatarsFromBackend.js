// AvatarsFromBackend.js
import React, { useState, useEffect } from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

const AvatarsFromBackend = ({ userId, firstname }) => {
  const [avatars, setAvatars] = useState([]);

  console.log(firstname);

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }


  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 30.55,
        height: 30.55,
        marginTop: 5.5,
        marginLeft: 179.99,
        position: 'relative', 
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }


  useEffect(() => {
    
    const fetchAvatars = async () => {
      try {
        const response = await fetch(`http://localhost:5001/getAvatars/${userId}`);
        const data = await response.json();
        setAvatars(data.avatars); 
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, [userId]);

  console.log("len: ", avatars.length); //what happens if there are no profile pics?? think!!
  

  return (
    <AvatarGroup
    renderSurplus={(surplus) => <span>+</span>}
      total={avatars.length}
      max = {6}
    >
      {avatars.map((avatar, index) => (
        avatar !== "" ? (
          <Avatar key={index} alt={`Avatar ${index + 1}`} src={avatar} />
        ) : (
          <Avatar key={index} {...stringAvatar(firstname)} />
        )
      ))}
    </AvatarGroup>
  );
};

export default AvatarsFromBackend;