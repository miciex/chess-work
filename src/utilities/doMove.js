import SquareData from "../components/SquareData";
import Move from "./Move";
import Last2Moves from "./Last2Moves";
import moveRookAtCastles from "./moveRookAtCastles";
import ChangePiecesSquare from "./changePiecesSquare";
import absoluteValue from "./absoluteValue";

//function which moves the piece and does things connected to moving it
function doMove(piece, x, y, board, allmoves, whichPromotion) {
  let brd = [...board];
  let moves = allmoves;
  //adding the newest move to the variable Moves

  //if it's whites turn adding new last2Moves object to moves array
  if (piece.pieceColor === "white") {
    moves.push(new Last2Moves());
  }
  //adding this move to the moves variable
  moves[moves.length - 1][piece.pieceColor] = new Move(
    piece.pieceColor,
    piece.piece,
    piece.x,
    piece.y,
    x,
    y,
    board[y][x].piece,
    piece.didMove !== undefined ? piece.didMove : ""
  );
  //updating lastMove
  let lastMove = moves[moves.length - 1][piece.pieceColor];
  //If the pawn reached last rank changing it to the piece chosen by the player else just moving the piece
  if (piece.howManyMoves !== undefined) piece.howManyMoves += 1;
  brd = ChangePiecesSquare(piece, x, y, board, whichPromotion);
  //removing the taken pawn of the board if en pessant happened and changing the didtaken value in the last move in variable 'moves' to the taken pawn

  //if the king moved move the rook if it castled
  if (piece.piece === "King") {
    brd = moveRookAtCastles(brd, lastMove);
  }
  //Check if en pessant happened if it did take out the pawn of the board which was taken and update the value in last move in variable 'moves' to the taken pawn
  if (piece.piece !== "Pawn")
    return { board: brd, moves: moves, lastMove: lastMove };
  if (lastMove.didTaken !== "")
    return { board: brd, moves: moves, lastMove: lastMove };

  if (absoluteValue(lastMove.startX - lastMove.endX) !== 1) {
    return { board: brd, moves: moves, lastMove: lastMove };
  }
  brd[piece.y][x] = new SquareData(x, piece.y);
  moves[moves.length - 1][piece.pieceColor].didTaken = "Pawn";
  lastMove.didTaken = "Pawn";
  return { board: brd, moves: moves, lastMove: lastMove };
}

export default doMove;
