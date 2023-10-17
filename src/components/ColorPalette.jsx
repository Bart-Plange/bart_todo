import React from 'react';

const ColorPalette = ({ selectedColor, onColorSelect }) => {
  const colors = [
    'red',
    'blue',
    'green',
    'purple',
    'orange',
    'pink',
    'teal',
    'brown',
    'yellow',
    'gray',
    'cyan',
  ];

  const getColorStyle = (color) => {
    return {
      backgroundColor: color,
      border: selectedColor === color ? '2px solid black' : 'none',
      width: '40px', // Adjust the width to your preference
      height: '40px', // Adjust the height to your preference
      margin: '5px', // Add some spacing between color options
      cursor: 'pointer', // Change the cursor to a pointer on hover
      borderRadius: '50%', // Make it round
    };
  };

  return (
    <div className="color-palette" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {colors.map((color) => (
        <div
          key={color}
          className={`color-palette__color ${selectedColor === color ? 'selected' : ''}`}
          style={getColorStyle(color)}
          onClick={() => onColorSelect(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPalette;
