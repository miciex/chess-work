import changePiecesSquare from "./changePiecesSquare";
import findKing from "./findKing";
import underAttack from "./underAttack";
import copy2dArray from "./copy2dArray";
import SquareData from "../components/SquareData";
import absoluteValue from "./absoluteValue";

//function used to check if the king is in check after moving one the pieces
function isThenChecked(board, Sx, Sy, Px, Py, lastMove) {
  let King;
  if (board[Sy][Sx].piece === "") return;
  //create copy of board
  let brd = copy2dArray(board);
  //if pawn took on en pessant in this move remove the taken pawn
  if (
    brd[Sy][Sx].piece === "Pawn" &&
    brd[Py][Px].piece === "" &&
    absoluteValue(Px - Sx) == 1
  ) {
    brd[Sy][Px] = new SquareData(Px, Sy);
  }
  //move the piece
  brd = changePiecesSquare(brd[Sy][Sx], Px, Py, brd);
  King = findKing(brd, brd[Py][Px].pieceColor);
  //check if king is under attack after this move
  return underAttack(
    brd,
    King[1],
    King[0],
    brd[Py][Px].pieceColor,
    false,
    lastMove
  );
}

export default isThenChecked;
