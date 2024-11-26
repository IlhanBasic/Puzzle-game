import React from "react";

const Tile = ({ value, onClick, className, imageUrl }) => {
  return (
    <div
      className={className}
      style={{
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {value === 0 ? null : (
        <div
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Tile;