import SquareData from "./SquareData";
import createPiece from "../utilities/createPiece";

function CreateBoard() {
  //creating array which will be retured
  let board = [];
  //array with the different pieces
  const pieces = [
    "Rook",
    "Knight",
    "Bishop",
    "Queen",
    "King",
    "Bishop",
    "Knight",
    "Rook",
  ];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      //first creating squares only with coordinates, pieces names, and colors
      board[i].push(
        new SquareData(
          j + 1,
          i + 1,
          (i < 2 && "black") || (i > 5 && "white") || "",
          ((i === 6 || i === 1) && "Pawn") ||
            ((i === 7 || i === 0) && pieces[j]) ||
            ""
        )
      );
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      //if the piece value of the square with the coordinates in the current iterations is different than '' creating there a appropriate piece with methods
      if (board[i][j].piece !== "")
        board[i][j] = createPiece(
          board[i][j].piece,
          j,
          i,
          (i < 2 && "black") || (i > 5 && "white")
        );
    }
  }
  // returning created board
  return board;
}

export default CreateBoard;
