import Piece from "../Piece";
import inBounds from "../../utilities/inBounds";
import doMove from "../../utilities/doMove";
import moveUt from "../../utilities/moveUt";

class Pawn extends Piece {
  constructor(x, y, pieceColor, didMove = 0) {
    super(x, y, pieceColor, "Pawn");
    //directions in which pawn can go
    this.dr = pieceColor === "white" ? [-9, -18, -8, -10] : [9, 18, 8, 10];
    this.didMove = didMove;
    this.points = 1;
  }

  //methond which finds possible moves for the clicked Pawn
  possibleMoves(board, lastMove) {
    //array for possible row directions
    let possibledr = [];
    //array for possible column directions
    let possibledc = [];
    //variables for possible row and column coordinates
    let Py, Px;
    //variables created to make code easier to read
    let y = this.y;
    let x = this.x;
    let dr = this.dr;
    let didMove = this.didMove;
    for (let i = 0; i < this.dr.length; i++) {
      //calculating coordinates of the next possible square
      Py = y + Math.floor((x + dr[i]) / 9);
      Px = x + ((dr[i] > 0 ? dr[i] - 9 : dr[i] + 9) % 9);
      //checking if the new square wouldn't be out of the board range if so this move isn't possible
      if (inBounds(Px, Py) === false) continue;
      //checking if on the new square doesn't stand piece of the same color if so the piece isn't able to move there
      if (board[y][x].pieceColor === board[Py][Px].pieceColor) continue;
      //checking if piece ever moved if so it's unable to move 2 squares forward
      if (didMove > 0 && i === 1) continue;
      //checking if the square square in front of the pawn is empty for the move by 2 squares
      if (i === 1 && board[Py - dr[0] / 9][Px].pieceColor !== "") continue;
      //checking for the moves forward if the new square is empty if not then it's not possible to make this move
      if (i < 2 && board[Py][Px].pieceColor !== "") continue;
      //continue on the capture moves on the first move
      if (i > 1 && lastMove === null) continue;
      //checking for the takes moves if it on the new square there is a piece and if you can take on pessant if there is a piece or you can't take on pessant continue
      if (
        i > 1 &&
        (lastMove.piece !== "Pawn" ||
          lastMove.howManyMoves !== 0 ||
          lastMove.endX !== Px ||
          y !== lastMove.endY) &&
        board[Py][Px].piece === ""
      )
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

  move(x, y, board, moves, possibleMoves, promotionSquare, whichPromotion) {
    //check if the clicked square is one of the possible to move to for this piece
    if (moveUt(possibleMoves, y, x) === false) return false;
    //move the piece
    return doMove(this, x, y, board, moves, promotionSquare, whichPromotion);
  }
}

export default Pawn;
