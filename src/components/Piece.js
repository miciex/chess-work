import SquareData from "./SquareData";
import isThenChecked from "../utilities/isThenChecked";
import copy2dArray from "../utilities/copy2dArray";

//class created so that there code in pieces is shorter and the afterCheck method doesn't have to be in everyone of them. If afterCheck would be function you would have to put more arguments in it so it's  bit easier to use it.
//Maybe later it will be changed into function if we want to make the code more efficient.
class Piece extends SquareData {
  constructor(x, y, pieceColor = "", piece = "") {
    super(x, y, pieceColor, piece);
  }

  //method which returns possible moves but without the moves after which the king of the same color as the checked piece would be in check
  afterCheck(possibleMoves, board, lastMove) {
    if (this.piece === "") return;
    //creating copy of board
    let brd = copy2dArray(board);
    //array with rows to which this piece can go
    let possibledr = [];
    //array with columns to which this piece can go
    let possibledc = [];
    // checking if after each move the king would be in check
    for (let i = 0; i < possibleMoves[0].length; i++) {
      if (
        isThenChecked(
          brd,
          this.x,
          this.y,
          possibleMoves[1][i],
          possibleMoves[0][i],
          lastMove
        )
      )
        continue;
      // keeping the move if after it the king isn't in check
      possibledr.push(possibleMoves[0][i]);
      possibledc.push(possibleMoves[1][i]);
    }
    // returning the coordinates of possible moves
    return [possibledr, possibledc];
  }
}

export default Piece;
