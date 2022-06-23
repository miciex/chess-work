import moveUt from "../../utilities/moveUt";
import inBounds from "../../utilities/inBounds";
import Piece from "../Piece";
import doMove from "../../utilities/doMove";

class Knight extends Piece {
  constructor(x, y, pieceColor) {
    super(x, y, pieceColor, "Knight");
    //directions in which knight can go
    this.dr = [7, 17, 19, 11, -7, -17, -19, -11];
    this.points = 3;
  }

  possibleMoves(board) {
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
    for (let i = 0; i < this.dr.length; i++) {
      //calculating coordinates of the next possible square
      Py = y + Math.floor((x + dr[i]) / 9);
      Px = x + ((dr[i] - 9 * Math.round(dr[i] / 9)) % 9);
      //checking if the new square wouldn't be out of the board range if so this move isn't possible
      if (inBounds(Px, Py) === false) continue;
      //checking if on the new square doesn't stand piece of the same color if so the piece isn't able to move there
      if (board[y][x].pieceColor === board[Py][Px].pieceColor) continue;
      //adding coordinates of the possible square
      possibledr.push(Py);
      possibledc.push(Px);
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

export default Knight;
