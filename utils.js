export function getCellNeighboursIdxs(i, j, boardSize) {
  let neighbours = [];
  // TOP LEFT CORNER
  if (i === 0 && j === 0) {
    neighbours.push([0, 1], [1, 0], [1, 1]);
  }
  // TOP RIGHT CORNER
  if (i === 0 && j === boardSize - 1) {
    neighbours.push([0, boardSize - 2], [1, boardSize - 2], [1, boardSize - 1]);
  }
  // BOTTOM LEFT CORNER
  if (i === boardSize - 1 && j === 0) {
    neighbours.push([boardSize - 2, 0], [boardSize - 2, 1], [boardSize - 1, 1]);
  }
  // BOTTOM RIGHT CORNER
  if (i === boardSize - 1 && j === boardSize - 1) {
    neighbours.push([boardSize - 1, boardSize - 2], [boardSize - 2, boardSize - 2], [boardSize - 2, boardSize - 1]);
  }
  // TOP EDGE
  if (i === 0 && j > 0 && j < boardSize - 1) {
    neighbours.push([i, j - 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1], [i, j + 1]);
  }
  // BOTTOM EDGE
  if (i === boardSize - 1 && j > 0 && j < boardSize - 1) {
    neighbours.push([i, j - 1], [i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j + 1]);
  }
  // LEFT EDGE
  if (j === 0 && i > 0 && i < boardSize - 1) {
    neighbours.push([i - 1, j], [i - 1, j + 1], [i, j + 1], [i + 1, j + 1], [i + 1, j]);
  }
  // RIGHT EDGE
  if (j === boardSize - 1 && i > 0 && i < boardSize - 1) {
    neighbours.push([i - 1, j], [i - 1, j - 1], [i, j - 1], [i + 1, j - 1], [i + 1, j]);
  }
  // DEFAULT CASE
  if (i > 0 && (i < boardSize - 1) & (j > 0) && j < boardSize - 1) {
    neighbours.push([i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1], [i, j + 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]);
  }
  return neighbours;
}
