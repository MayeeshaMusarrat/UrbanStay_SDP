import React from 'react';
import Avatar from '@mui/material/Avatar';
import styles from "../pages/LandingPage.module.css";

const avatar = ({ name}) => {

    console.log("name: ", name);
    
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
        zIndex: 1, 
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const [popupLogin, setPopupLogin] = useState(false);
  const toggleLogin = () => {
    setPopupLogin(!popupLogin);
  };




return (
    <>
{
     
         
          <div onClick={toggleLogin}>
            <Avatar {...stringAvatar(name)} />
          </div>
        
}
      
        <img
          className={styles.profileIcon}
          alt=""
          src="/profile-icon3@2x.png"
          onClick = {toggleLogin}
        />

 

    </>

    );
    

};

export default avatar;
