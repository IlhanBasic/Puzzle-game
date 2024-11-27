import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../components/Board';
import { Controls } from '../components/Control';
import { createInitialState, makeMove, isSolvable } from '../utils/puzzleUtils';
import solvePuzzle from '../services/solvePuzzle';
import { Brain } from 'lucide-react';
import Cookies from 'js-cookie';

const GamePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || Cookies.get('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  useEffect(() => {
    const handleCookieChange = () => {
      const token = localStorage.getItem('token') || Cookies.get('access_token');
      if (!token) {
        navigate('/login');
      }
    };

    const intervalId = setInterval(handleCookieChange, 1000); 

    return () => clearInterval(intervalId); 
  }, [navigate]);

  const [config, setConfig] = useState({
    size: 3,
    algorithm: 'bfs',
    heuristic: 'manhattan'
  });

  const [state, setState] = useState(() => {
    let initialState;
    do {
      initialState = createInitialState(config.size);
    } while (!isSolvable(initialState, config.size));
    return initialState;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nodesEvaluated, setNodesEvaluated] = useState(0);
  const [nodesGenerated, setNodesGenerated] = useState(0);

  // Reset the game
  const resetGame = useCallback(async () => {
    let newState;
    do {
      newState = createInitialState(config.size);
    } while (!isSolvable(newState, config.size));
    setState(newState);
    setMoves([]);
    setCurrentMoveIndex(0);
    setIsPlaying(false);

    try {
      setIsLoading(true);
      const solutionMoves = await solvePuzzle(newState, config.algorithm, config.heuristic);
      setNodesEvaluated(solutionMoves.nodes_evaluated);
      setNodesGenerated(solutionMoves.nodes_generated);
      setMoves(solutionMoves.moves);
    } catch (error) {
      console.error('Failed to get solution:', error);
    } finally {
      setIsLoading(false);
    }
  }, [config.size, config.algorithm, config.heuristic]);

  const handleMove = (index) => {
    setState(makeMove(state, index));
  };

  const handleAlgorithmChange = (algorithm) => {
    setConfig((prev) => ({ ...prev, algorithm }));
  };

  const handleHeuristicChange = (heuristic) => {
    setConfig((prev) => ({ ...prev, heuristic }));
  };

  const applyAllMoves = () => {
    const solvedState = Array.from({ length: config.size * config.size }, (_, i) => i + 1); // Kreiraj niz od 1 do 8
    solvedState[solvedState.length - 1] = 0; 
  
    setState(solvedState);
    setCurrentMoveIndex(moves.length); 
    setIsPlaying(false); 
  };
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.code) {
        case 'Space':
          setIsPlaying((prev) => !prev);
          break;

        case 'Enter':
          applyAllMoves();
          break;

        case 'Escape':
          resetGame();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moves.length, resetGame]);

  useEffect(() => {
    if (isPlaying && currentMoveIndex < moves.length) {
      const timer = setTimeout(() => {
        setState((prev) => makeMove(prev, moves[currentMoveIndex]));
        setCurrentMoveIndex((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    } else if (currentMoveIndex >= moves.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentMoveIndex, moves]);

  // Reset the game when component mounts
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <Brain size={32} className="text-blue-600" />
          <h1 className="header-title">Pyzzle</h1>
        </div>
        <p className="header-description">
          A visual simulation of search algorithms solving the k-Puzzle problem
        </p>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <Board state={state} size={config.size} onMove={handleMove} />
      )}

      <Controls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
        onReset={resetGame}
        onSkip={applyAllMoves}
        algorithm={config.algorithm}
        heuristic={config.heuristic}
        onAlgorithmChange={handleAlgorithmChange}
        onHeuristicChange={handleHeuristicChange}
      />

      <div className="step-info">
        Step: {currentMoveIndex} / {moves.length}
      </div>
      <div className="nodes-info">
        <p>Nodes Evaluated: {nodesEvaluated}</p>
        <p>Nodes Generated: {nodesGenerated}</p>
      </div>

      <div className="instructions">
        <p>
          Press SPACE to play/pause • ENTER for final solution • ESC to reset and close the application
        </p>
      </div>
    </div>
  );
};

export default GamePage;
