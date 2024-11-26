import React from 'react';
import { Settings, Play, Pause, RotateCcw, FastForward } from 'lucide-react';

export const Controls = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onSkip,
  algorithm,
  heuristic,
  onAlgorithmChange,
  onHeuristicChange,
}) => {
  return (
    <div className="controls">
      <div className="control-buttons">
        <button
          onClick={onTogglePlay}
          className="control-button"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={onReset}
          className="control-button reset-button"
        >
          <RotateCcw size={20} />
          Reset
        </button>
        <button
          onClick={onSkip}
          className="control-button skip-button"
        >
          <FastForward size={20} />
          Skip to Solution
        </button>
      </div>
      
      <div className="flex gap-4 items-center">
        <Settings size={20} className="settings-icon" />
        <select
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          className="select"
        >
          <option value="bfs">Breadth First Search</option>
          <option value="bestFirst">Best First Search</option>
          <option value="aStar">A* Search</option>
        </select>
        
        <select
          value={heuristic}
          onChange={(e) => onHeuristicChange(e.target.value)}
          className="select"
          disabled={algorithm === 'bfs'}
        >
          <option value="hamming">Hamming Distance</option>
          <option value="manhattan">Manhattan Distance</option>
        </select>
      </div>
    </div>
  );
};
