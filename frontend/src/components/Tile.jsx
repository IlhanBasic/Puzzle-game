const Tile = ({ value,index, size, onClick, className, imageUrl }) => {
  const tileClasses = `tile ${className || ""}`;
  const tileSize = 80;

  const row = Math.floor(value / size);
  const col = value % size;

  const tileStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${size * tileSize}px ${size * tileSize}px`,
    backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
    width: `${tileSize}px`,
    height: `${tileSize}px`,
  };

  if (value === 0) {
    return (
      <div
        className={`${tileClasses} tile-empty`}
        onClick={onClick}
        style={{ ...tileStyle, opacity: 0.2 }}
      />
    );
  }

  return (
    <div
      className={`${tileClasses} tile-filled`}
      onClick={onClick}
      style={tileStyle}
    >
      <span className="tile-value">{value}</span>
    </div>
  );
};
export default Tile;
