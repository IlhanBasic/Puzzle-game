import React from 'react';
import  Tile  from './Tile';
import { getValidMoves } from '../utils/puzzleUtils';

export const Board = ({ state, size, onMove }) => {
  const validMoves = getValidMoves(state, size);
  const imageUrl = "https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
  return (
    <div 
      className="board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        width: `${size * 80}px`,
        height: `${size * 80}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {state.map((value, index) => (
        <Tile
          key={index}
          index={index}
          value={value}
          size={size}
          onClick={() => validMoves.includes(index) && onMove(index)}
          className="tile" 
          imageUrl={imageUrl} 
        />
      ))}
    </div>
  );
};
