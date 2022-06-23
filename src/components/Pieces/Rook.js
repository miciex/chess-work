import inBounds from "../../utilities/inBounds";
import moveUt from "../../utilities/moveUt";
import Piece from "../Piece";
import doMove from "../../utilities/doMove";

class Rook extends Piece {
  constructor(x, y, pieceColor, didMove = 0) {
    super(x, y, pieceColor, "Rook");
    //directions in which rook can go
    this.dr = [1, -1, 9, -9];
    this.didMove = didMove;
    this.points = 5;
  }

  possibleMoves(board, lastMove) {
    //array with columns to which this piece can go
    let possibledc = [];
    //array with rows to which this piece can go
    let possibledr = [];
    //variables representing coordinates of current candidate square to being one of the possible moves
    let Py, Px;
    //variables created to make code easier to read
    let y = this.y;
    let x = this.x;
    let dr = this.dr;
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= this.dr.length; j++) {
        //calculating coordinates of the next possible square
        Py = y + Math.floor((x + dr[i] * j) / 9);
        Px = x + (dr[i] % 9) * j;
        //checking if the new square wouldn't be out of the board range if so this move isn't possible
        if (inBounds(Px, Py) === false) break;
        //checking if on the new square doesn't stand piece of the same color if so the piece isn't able to move there
        if (board[y][x].pieceColor === board[Py][Px].pieceColor) break;
        //adding coordinates of the possible square
        possibledr.push(Py);
        possibledc.push(Px);
        //if on the square checked in this iteration stands piece of different color than yours because you can't jump over pieces unless it's a knight
        if (board[Py][Px].pieceColor !== "") break;
      }
    }
    //returning coordinates of possible moves for this piece
    return [possibledr, possibledc];
  }

  allPossibleMoves(board, lastMove) {
    let possibleMoves = this.possibleMoves(board, lastMove);
    possibleMoves = this.afterCheck(possibleMoves, board, lastMove);
    return possibleMoves;
  }

  move(x, y, board, moves, possibleMoves) {
    //check if the clicked square is one of the possible to move to for this piece
    if (moveUt(possibleMoves, y, x) === false) return false;
    //move the piece
    return doMove(this, x, y, board, moves);
  }
}

export default Rook;
