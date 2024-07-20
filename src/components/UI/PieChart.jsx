// src/components/PieChart.js

import React from 'react';

const PieChart = ({ progress }) => {
  return (
    <div className="relative inline-block w-10 h-10">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-200 stroke-current"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-green-500 stroke-current"
          strokeWidth="3"
          strokeDasharray={`${progress}, 100`}
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-green-500 text-xs font-semibold">
        {progress}%
      </div>
    </div>
  );
};

export default PieChart;
