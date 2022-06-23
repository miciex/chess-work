//function to check if three fold repetition happened
function isThreeFoldRepetition(fenArray) {
  //fen represents last position which happened in the game by a FEN string
  let fen = fenArray[fenArray.length - 1];
  //counter counts how many positions like this happened in the game
  let counter = 0;
  //we loop through the fenArray and if the i element of fenArray is the same as fen then counter increases
  //if counter equals 3 it means three fold repetitions happened and the fuction returns true if not return false
  for (let i = 0; i < fenArray.length; i++) {
    if (fen === fenArray[i]) counter++;
    if (counter === 3) return true;
  }
  return false;
}

export default isThreeFoldRepetition;
