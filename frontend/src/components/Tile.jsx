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
        opacity: value === 0 ? 0.4  : 1,
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {value === 0 ? null : (
        <div className="tile-value">
          {value}
        </div>
      )}
    </div>
  );
};

export default Tile;
