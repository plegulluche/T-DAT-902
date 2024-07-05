import React from 'react';

interface ProgressBarProps {
  value: number; // Valeur de progression entre 0 et 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  // Clamp the value between 0 and 100
  // Calculate the color based on the value (0% = red, 100% = green)
  const getColor = (value: number) => {
    const red = Math.max(0, 255 - (value * 2.55));
    const green = Math.min(255, value * 2.55);
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="w-full h-5 bg-gray-200 rounded overflow-hidden">
      <div
        className="h-full transition-all ease-in-out duration-300"
        style={{
          width: `${value}%`,
          backgroundColor: getColor(value),
        }}
      />
    </div>
  );
};

export default ProgressBar;
