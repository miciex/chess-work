import inBounds from "../../utilities/inBounds";
import doMove from "../../utilities/doMove";
import moveUt from "../../utilities/moveUt";
import Piece from "../Piece";
import underAttack from "../../utilities/underAttack";
import absoluteValue from "../../utilities/absoluteValue";
import inBetweenPieces from "../../utilities/inBetweenPieces";

class King extends Piece {
  constructor(x, y, pieceColor, didMove = 0) {
    super(x, y, pieceColor, "King");
    //directions in which king can go
    this.dr = [1, -1, 9, -9, 8, 10, -8, -10, -2, 2, 18, -18];
    this.didMove = didMove;
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
    let didMove = this.didMove;
    let pieceColor = this.pieceColor;
    // debugger;
    for (let i = 0; i < this.dr.length; i++) {
      //calculating coordinates of the next possible square
      Py = y + Math.floor((x + dr[i]) / 9);
      Px =
        x +
        (absoluteValue(dr[i]) <= 2
          ? dr[i] % 9
          : (dr[i] > 0 ? dr[i] - 9 : dr[i] + 9) % 9);

      //checking if the new square wouldn't be out of the board range if so this move isn't possible
      if (inBounds(Px, Py) === false) continue;
      //checking if on the new square doesn't stand piece of the same color if so the piece isn't able to move there
      if (board[y][x].pieceColor === board[Py][Px].pieceColor) continue;
      //checking if king is currently in check if it is it can't castle
      if (
        (didMove > 0 ||
          underAttack(board, x, y, pieceColor, true, lastMove) === true) &&
        i > 7
      )
        break;
      //checking if in the way to final way to castle one of the enemy pieces could capture the king if so castles isn't possible
      if (
        i > 7 &&
        underAttack(
          board,
          (i === 8 && x - 1) || (i === 9 && x + 1) || x,
          (i === 10 && y + 1) || (i === 11 && y - 1) || y,
          pieceColor,
          true,
          lastMove
        ) === true
      )
        continue;

      //for castles moves checking if there are none pieces between the rook and king. It's checked there if this function returns 1 because the rook is also counted in there
      if (i === 9 && inBetweenPieces(board, x, y, 7, Py) !== 1) continue;
      if (i === 8 && inBetweenPieces(board, x, y, 0, Py) !== 1) continue;
      if (i > 9 && inBetweenPieces(board, x, y, x, absoluteValue(y - 7)) !== 1)
        continue;
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

export default King;
