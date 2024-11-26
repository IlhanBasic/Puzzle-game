const API_URL = 'https://puzzle-backend-aij3.onrender.com/api';

const solvePuzzle = async (initialState, algorithm, heuristic) => {
  try {
    const response = await fetch(`${API_URL}/solve/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        initial_state: initialState, 
        algorithm,
        heuristic,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); 
    return {'moves':data.moves,'nodes_evaluated':data.nodes_evaluated,'nodes_generated':data.nodes_generated}; 
  } catch (error) {
    console.error('Error solving puzzle:', error);
    throw error; 
  }
};

export default solvePuzzle;
