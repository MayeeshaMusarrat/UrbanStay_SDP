import styles from "./ReviewDetails.module.css";
import Avatar from '@mui/material/Avatar';
import { BarChart } from '@mui/x-charts/BarChart';

const ReviewDetails = ({ onClose, review }) => {

  console.log("review data of popup: ", review);
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


  return (
    <div className={styles.reviewdetails}>
      <img
        className={styles.reviewdetailsChild}
        alt=""
        src="/rectangle-108.svg"
      />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img
          className={styles.crossIcon}
          alt=""
          src="/cross.svg"
          onClick={onClose}
        />
        <div className={styles.groupItem} />
        <button className={styles.reviewDetails}>Review Details</button>
      </div>
      <div className={styles.barchart} id="pi" >

      <BarChart
            xAxis={[
              {
                id: 'barCategories',
                data: ['Scenery', 'Accuracy', 'Reception', 'Cleanliness', 'Location', 'Services'],
                scaleType: 'band',
                
              },
            ]}
          
            series={[
              {
                data: [4,3,2,4,5,4],
              },
            ]}
            width={520}
            height={300}
       />



      </div>


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


      <div className={styles.mayeeshaMusarrat23SeptemberContainer}>
        <span className={styles.mayeeshaMusarrat23SeptemberContainer1}>
          <p className={styles.mayeeshaMusarrat}>
            <span>
              <span className={styles.mayeeshaMusarrat1}>
                {review.guestFullName}
              </span>
            </span>
          </p>
          <p className={styles.september2023}>{review.created}</p>
        </span>
      </div>
      <div
        className={styles.asSoonAs}
      >{review.comment}</div>
    </div>
  );
};

export default ReviewDetails;
