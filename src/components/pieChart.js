import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const ratingPieChart = ({ id, value, label }) => {
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id, value, label },
            ],
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 180,
            cx: 150,
            cy: 95,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default ratingPieChart;
