import pieceToValue from "./pieceToValue";
// function used to represent given position as FEN string and not as a 2d array with object inside of it
function boardToFEN(board) {
  //counter variable counts how many empy squares there are in a row
  let counter = 0;
  //fen variable will represent teh given position in FEN string
  let fen = "";
  //this loop loops through all of the squares in board
  for (let i = 0; i < board.length; i++) {
    //if the loop is at the last square of the row add counter to fen
    fen += (counter !== 0 && String(counter)) || "";
    counter = 0;
    //'/' in FEN string means that the new row starts
    fen += i > 0 ? "/" : "";
    for (let j = 0; j < board.length; j++) {
      //if on the new squre there is a piece and couter is bigger than 0 we add counter to fen else add nothing
      fen +=
        (board[i][j].piece !== "" && counter !== 0 && String(counter)) || "";
      //add the piece to fen represented by a single letter
      fen += pieceToValue(board[i][j].piece);
      //if square is empty add 1 to counter else reset counters value
      counter = board[i][j].piece === "" ? (counter += 1) : 0;
    }
  }
  return fen;
}

export default boardToFEN;
