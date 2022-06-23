import underAttack from "./underAttack";
import checkIfAnyPossibleMoves from "./checkIfAnyPossibleMoves";
import findKing from "./findKing";

// function used to check if the player with the pieces of color given in the argument is check-mated
function isCheckMate(color, board, lastMove) {
  // variable with the king's coordinates of a given color
  let king;
  king = findKing(board, color);
  //if the king is under attack and the side of given color haven't any possible moves it means that this side is check-mated
  if (
    underAttack(board, king[1], king[0], color, false, lastMove) === true &&
    checkIfAnyPossibleMoves(board, color, lastMove) === false
  ) {
    return true;
  } else return false;
}

export default isCheckMate;
