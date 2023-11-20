import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from '../pages/Review/ShowReviews.module.css';
import Avatar from '@mui/material/Avatar';

const ReviewComponent = ({ review, openReviewDetailsPopup }) => {

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
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      

      console.log("Guest pic: ", guestPic);
  return (
    <div className={styles.reviewcomponent} >
      {review.guestPic ? (
      <Avatar
        alt={review.guestFullName}
        className={styles.usericon}
        src={review.guestPic}
        sx={{ width: 56, height: 56 }}
      />
    ) : (
      <Avatar
        alt="Default User"
        className={styles.usericon}
        {...stringAvatar(review.guestFullName)}
        
      />
    )}
      <div className={styles.mayeeshaMusarrat}>
        <span className={styles.urbanstayTxt}>
          <p className={styles.mayeeshaMusarrat1}>{review.guestFullName}</p>
        </span>
      </div>
      <div className={styles.nov2023}>{review.created}</div>
      <div className={styles.asSoonAsContainer}>
        <span className={styles.urbanstayTxt}>
          <span>{review.comment}  </span>
          <span className={styles.seeMore} onClick={() => openReviewDetailsPopup(review)} >
            See More
          </span>
        </span>
      </div>
      <div className={styles.ratingstar}>
        <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
          <Rating name="simple-controlled" readOnly value={review.overall} />
        </Box>
      </div>
    </div>
  );
};

export default ReviewComponent;
