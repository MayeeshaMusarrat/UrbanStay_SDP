import { TextField, Box, Rating } from "@mui/material";
import * as React from 'react'; 
import styles from "./GivePropertyReview.module.css";


const GivePropertyReview = ({ onClose }) => 
{
  const [value, setValue] = React.useState(1);

  return 
  ( 
    <div className={styles.reviewform}>
      <img
        className={styles.reviewformChild}
        alt=""
        src="/rectangle-1083.svg"
      />
      <div className={styles.frame}>
        <button className={styles.leaveAReview}>Leave a review!</button>
      </div>
      <div className={styles.frame1}>
        <button className={styles.theOverallProperty}>
          The overall property rating will be calculated based on the given
          ratings.
        </button>
      </div>
      <div className={styles.frame2}>
        <TextField
          className={styles.reviewbox}
          color="info"
          rows={3}
          required={true}
          fullWidth={true}
          sx={{ width: 985 }}
          variant="outlined"
          multiline
        />
      </div>
      <div className={styles.frame3}>
        <div className={styles.rateThePropertyParent}>
          <button className={styles.rateTheProperty}>Rate the property</button>
          <div className={styles.frame4}>
            <div className={styles.sceneryParent}>
              <button className={styles.scenery}>Scenery</button>
              <div className={styles.sceneryrating} > 
              
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
              
              </div>
            </div>
            <div className={styles.locationParent}>
              <button className={styles.location}>Location</button>
              <div className={styles.locationrating} >
                 <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value2}
                      onChange={(event, newValue) => {
                        setValue2(newValue2);
                      }}
                    />
                  </Box>


              </div>
            </div>
          </div>
          <div className={styles.frame5}>
            <div className={styles.sceneryParent}>
              <button className={styles.accuracy}>Accuracy</button>
              <div className={styles.sceneryrating} >
              <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>

              </div>
            </div>
            <div className={styles.receptionParent}>
              <button className={styles.reception}>Reception</button>
              <div className={styles.receptionrating} > 
              <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
              </div>
            </div>
          </div>
          <div className={styles.frame6}>
            <div className={styles.sceneryParent}>
              <button className={styles.cleanliness}>Cleanliness</button>
              <div className={styles.sceneryrating} > 
              <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
              </div>
            </div>
            <div className={styles.receptionParent}>
              <button className={styles.location}>Services</button>
              <div className={styles.receptionrating} > 
              <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frame7}>
        <div className={styles.confirmpaymentbtn}>
          <button className={styles.submitReview}>Submit Review</button>
        </div>
      </div>
      <div className={styles.lineParent}>
        <div className={styles.frameChild} />
        <div className={styles.frame8}>
          <img className={styles.frameIcon} alt="" src="/frame1.svg" />
          <button className={styles.reviewForm}>Review Form</button>
        </div>
      </div>
    </div>
  );
};

export default GivePropertyReview;
