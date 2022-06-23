import King from "../components/Pieces/King";
import Pawn from "../components/Pieces/Pawn";
import Queen from "../components/Pieces/Queen";
import Knight from "../components/Pieces/Knight";
import Rook from "../components/Pieces/Rook";
import Bishop from "../components/Pieces/Bishop";
import SquareData from "../components/SquareData";

//function which returns specific piece based on arguments it receives
function createPiece(piece, x, y, color, howManyMoves = 0) {
  if (piece === "") return new SquareData(x, y);
  switch (piece) {
    case "Pawn" || "P":
      if (y > 0 && y < 7) {
        return new Pawn(x, y, color, howManyMoves);
      }
      break;
    case "Rook" || "R":
      return new Rook(x, y, color, howManyMoves);
    case "Bishop" || "B":
      return new Bishop(x, y, color);
    case "Queen" || "Q":
      return new Queen(x, y, color);
    case "Knight" || "N":
      return new Knight(x, y, color);
    case "King" || "K":
      return new King(x, y, color, howManyMoves);
    default:
      return;
  }
}

export default createPiece;
