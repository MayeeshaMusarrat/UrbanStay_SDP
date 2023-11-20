import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from '../pages/Review/ShowReviews.module.css';

const ReviewComponent = ({ review, openReviewDetailsPopup }) => (
  <div className={styles.reviewcomponent}>
    <img className={styles.usericon} alt="" src="/usericon1@2x.png" />
    <div className={styles.mayeeshaMusarrat}>
      <span className={styles.urbanstayTxt}>
        <p className={styles.mayeeshaMusarrat1}>{review.guestFullName}</p>
      </span>
    </div>
    <div className={styles.nov2023}>{review.created}</div>
    <div
      className={styles.asSoonAsContainer}
      onClick={openReviewDetailsPopup}
    >
      <span className={styles.urbanstayTxt}>
        <span>{review.comment}</span>
        <span className={styles.seeMore}>See More</span>
      </span>
    </div>
    <div className={styles.ratingstar}>
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Rating
          name="simple-controlled"
          readOnly
          value={review.overall}
        />
      </Box>
    </div>
  </div>
);

export default ReviewComponent;
