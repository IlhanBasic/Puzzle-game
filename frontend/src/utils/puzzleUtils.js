export const createInitialState = (size) => {
  const tiles = Array.from({ length: size * size }, (_, i) => i);
  return shuffleArray(tiles);
};

export const getGoalState = (size) => {
  return Array.from({ length: size * size }, (_, i) => (i + 1) % (size * size));
};

export const isSolvable = (state, size) => {
  let inversions = 0;
  const flatState = [...state];
  const zeroIndex = flatState.indexOf(0);
  flatState.splice(zeroIndex, 1);

  for (let i = 0; i < flatState.length - 1; i++) {
    for (let j = i + 1; j < flatState.length; j++) {
      if (flatState[i] > flatState[j]) inversions++;
    }
  }

  if (size % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    const zeroRow = Math.floor(zeroIndex / size);
    return (inversions + zeroRow) % 2 === 0;
  }
};

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getValidMoves = (state, size) => {
  const zeroIndex = state.indexOf(0);
  const row = Math.floor(zeroIndex / size);
  const col = zeroIndex % size;
  const moves = [];

  if (row > 0) moves.push(zeroIndex - size); // Move up
  if (row < size - 1) moves.push(zeroIndex + size); // Move down
  if (col > 0) moves.push(zeroIndex - 1); // Move left
  if (col < size - 1) moves.push(zeroIndex + 1); // Move right

  return moves;
};

export const makeMove = (state, index) => {
  const newState = [...state];
  const zeroIndex = newState.indexOf(0);
  [newState[zeroIndex], newState[index]] = [
    newState[index],
    newState[zeroIndex],
  ];
  return newState;
};
