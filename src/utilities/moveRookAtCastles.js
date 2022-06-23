import copy2dArray from "./copy2dArray";
import ChangePiecesSquare from "./changePiecesSquare";
import absoluteValue from "./absoluteValue";

//function to move rook if king castled
function moveRookAtCastles(board, lastMove) {
  //create copy of the board
  let brd = copy2dArray(board);
  // move the Rook if the king castled short or long
  if (absoluteValue(lastMove.endX - lastMove.startX) === 2) {
    brd = ChangePiecesSquare(
      brd[lastMove.startY][lastMove.endX - lastMove.startX === 2 ? 7 : 0],
      (lastMove.endX - lastMove.startX === 2 ? 1 : -1) + lastMove.startX,
      lastMove.startY,
      brd
    );
  }
  //move the rook if the king castled with the pawn that promoted into a rook
  else if (absoluteValue(lastMove.endY - lastMove.startY) === 2) {
    brd = ChangePiecesSquare(
      board[absoluteValue(7 - lastMove.startY)][lastMove.startX],
      lastMove.startX,
      absoluteValue(absoluteValue(lastMove.startY - 7) - 6),
      brd
    );
  }
  return brd;
}

export default moveRookAtCastles;
