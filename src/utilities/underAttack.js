import copy2dArray from "./copy2dArray";

//function to check if the square with coordinates x and y is underAttack
//this is the main function which needs to be rewritten because it is not efficient
function underAttack(board, x, y, color, king = false, lastMove) {
  let Pm;
  let brd = copy2dArray(board);
  for (let i = 0; i < brd.length; i++) {
    for (let j = 0; j < brd.length; j++) {
      if (brd[i][j].piece === "") continue;
      if (brd[i][j].pieceColor === color) continue;
      if (brd[i][j].piece === "King" && king === true) continue;
      Pm = brd[i][j].possibleMoves(brd, lastMove);
      for (let k = 0; k < Pm[0].length; k++) {
        if (Pm[0][k] === y && Pm[1][k] === x) {
          return true;
        }
      }
    }
  }
  return false;
}

export default underAttack;
