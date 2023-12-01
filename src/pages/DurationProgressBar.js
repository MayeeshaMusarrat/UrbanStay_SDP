import React from 'react';

const DurationProgressBar = ({ checkInDate, checkOutDate }) => {

  function calculateDurationPercentage(checkInDate, checkOutDate) {
    const currentDate = new Date();
    const checkInTime = checkInDate.getTime();
    const checkOutTime = checkOutDate.getTime();
    const currentTime = currentDate.getTime();
    const totalDuration = checkOutTime - checkInTime;
    const elapsedDuration = currentTime - checkInTime;
    const percentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(100, Math.max(0, percentage));
  }
  
  const duration = calculateDurationPercentage(checkInDate, checkOutDate);

  const getColor = () => {
    if (duration <= 20) {
      return 'orange';
    } else if (duration <= 50) {
      return 'lightblue';
    } else {
      return 'green';
    }
  };

  return (
    <div style={{ position: 'relative', width: '120px' }}>
      <div style={{ width: `${duration}%`, backgroundColor: getColor(), height: '20px'}} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        {`${duration.toFixed(2)}%`}
      </div>
    </div>
  );
};

export default DurationProgressBar;
