import createPiece from "./createPiece";
import SquareData from "../components/SquareData";
import copy2dArray from "./copy2dArray";

//function used to change where the piece is standing on the board
function ChangePiecesSquare(piece, newX, newY, board, whichPromotion = null) {
  // if the empty square is given return
  if (piece === "") return;
  //create copy of board
  let brd = copy2dArray(board);
  //create piece in the new spot on the board
  brd[newY][newX] = createPiece(
    whichPromotion ? whichPromotion : piece.piece,
    newX,
    newY,
    piece.pieceColor,
    piece.howManyMoves
  );
  // remove the piece from it's old place on the board
  brd[piece.y][piece.x] = new SquareData(piece.x, piece.y);
  //return board with moved piece
  return brd;
}

export default ChangePiecesSquare;
