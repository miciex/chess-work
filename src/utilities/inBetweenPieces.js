import absoluteValue from "./absoluteValue";

//function used to check how many pieces there are between the given coordinates it works on diagonalls and in straight lines
//The piece on the end coordinate is also counted
//It most likely is possible to make it more readable nad efficient but I hadn't idea for that
function inBetweenPieces(board, x, y, Px, Py) {
  let counter = 0;
  let dx = Px - x;
  let dy = Py - y;
  let max = absoluteValue(dx);
  if (dy !== 0 && dx !== 0 && dx - dy !== 0) return null;
  if (absoluteValue(dy) > absoluteValue(max)) max = absoluteValue(dy);
  for (let i = 0; i < max; i++) {
    if (dx < 0 && dy < 0) {
      if (board[y - i - 1][x - i - 1].piece !== "") counter++;
    } else if (dx < 0 && dy === 0) {
      if (board[y][x - i - 1].piece !== "") counter++;
    } else if (dx > 0 && dy === 0) {
      if (board[y][x + i + 1].piece !== "") counter++;
    } else if (dx < 0 && dy > 0) {
      if (board[y + i + 1][x - i - 1].piece !== "") counter++;
    } else if (dx > 0 && dy > 0) {
      if (board[y + i + 1][x + i + 1].piece !== "") counter++;
    } else if (dx === 0 && dy > 0) {
      if (board[y + i + 1][x].piece !== "") counter++;
    } else if (dx === 0 && dy < 0) {
      if (board[y - i - 1][x].piece !== "") counter++;
    } else if (dx > 0 && dy < 0) {
      if (board[y - i - 1][x + i + 1].piece !== "") counter++;
    }
  }
  return counter;
}

export default inBetweenPieces;
