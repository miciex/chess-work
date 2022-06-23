import underAttack from "./underAttack";
import checkIfAnyPossibleMoves from "./checkIfAnyPossibleMoves";
import findKing from "./findKing";

// function used to check if the player with the pieces of color given in the argument is check-mated
function isStaleMate(color, board, lastMove) {
  // variable with the king's coordinates of a given color
  let king;
  king = findKing(board, color);
  //if the king isn't under attack and the side with the pieces of given color has no possible moves it means that there is a stale-mate
  if (
    underAttack(board, king[1], king[0], color, false, lastMove) === false &&
    checkIfAnyPossibleMoves(board, color, lastMove) === false
  ) {
    return true;
  } else return false;
}

export default isStaleMate;
