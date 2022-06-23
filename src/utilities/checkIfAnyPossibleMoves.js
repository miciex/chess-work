//function which returns true if there are any possible moves for someone whose turn it is and if so returns true else returns false

function checkIfAnyPossibleMoves(board, color, lastMove) {
  //variable used to save the possible moves of the currently checked piece
  let moves;
  //looping through all the squares in the board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // if on the currently checked square there is a piece which has the color given in the argument check if
      //there are any possible moves for this piece if so return true else go to the next square
      if (board[i][j].pieceColor === color && board.piece !== "") {
        moves = board[i][j].allPossibleMoves(board, lastMove);
        if (moves[0].length > 0) {
          return true;
        }
      }
    }
  }
  // if for any of the pieces of the given color in the argument there weren't found any possible moves return false
  return false;
}

export default checkIfAnyPossibleMoves;
