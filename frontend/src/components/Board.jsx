import Tile from "./Tile";
import { getValidMoves } from "../utils/puzzleUtils";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";
import fullPhoto from "../assets/example.png";

const imageMap = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  0: img9,
};

export const Board = ({ state, size, onMove }) => {
  const validMoves = getValidMoves(state, size);
  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        width: `${size * 80}px`,
        height: `${size * 80}px`,
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${fullPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {state.map((value, index) => {
        const imageUrl = imageMap[value] || null;
        return (
          <Tile
            key={index}
            index={index}
            value={value}
            onClick={() => validMoves.includes(index) && onMove(index)}
            className="tile"
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
};

export default Board;