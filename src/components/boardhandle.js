import changeTurn from "../utilities/changeTurn";
import copy2dArray from "../utilities/copy2dArray";
import isCheckMate from "../utilities/isCheckMate";
import isStaleMate from "../utilities/isStaleMate";
import boardToFEN from "../utilities/boardToFEN";
import isThreeFoldRepetition from "../utilities/isThreeFoldrepetition";

function boardhandle(currData, x, y, whichPromotion = "") {
  let {
    ifPlayable,
    board,
    moves,
    possibleMoves,
    whoseTurn,
    lastMove,
    clickedSquare,
    promote,
    result,
    howManyMovesAnyTook,
    fenArray,
  } = currData;
  if (ifPlayable === false) return null;
  if (board[y][x].pieceColor !== whoseTurn && clickedSquare[0] === "")
    return null;
  if (clickedSquare === [x, y]) return null;
  //creating copy of the board
  let brd = copy2dArray(board);
  //if the clicked piece is the same color as the turn of the pieces which turn it is return changed coordinates of chosen piece, and compute it's possible moves
  if (board[y][x].pieceColor === whoseTurn) {
    //craeating array to which are added the possible moves of the clicked square
    possibleMoves = [];
    possibleMoves = board[y][x].allPossibleMoves(brd, lastMove);
    //returning object which will be set as a new state
    return {
      clickedSquare: [x, y],
      possibleMoves,
      board,
      moves,
      lastMove,
      whoseTurn,
      ifPlayable,
      promote: ["", ""],
      result,
      howManyMovesAnyTook,
      fenArray,
    };
  }

  //don't change anything if there are no possible moves for the chosen piece
  if (possibleMoves[0].length < 1) {
    return null;
  }

  //if the piece on the chosen square is a pawn and on its next move it will promote set promote to the coordinates of clicked square
  if (
    board[clickedSquare[1]][clickedSquare[0]].piece === "Pawn" &&
    (y === 7 || y === 0) &&
    whichPromotion < 2
  ) {
    //returning object which will be set as a new state
    return {
      clickedSquare,
      possibleMoves,
      board,
      moves,
      lastMove,
      whoseTurn,
      ifPlayable,
      promote: [x, y],
      result,
      howManyMovesAnyTook,
      fenArray,
    };
  }

  //variable which will contain changed board, updated moves, and last move if the pieces moves
  let moved = false;

  //if possible there is at least one possible move for the chosen piece moving it if the coordinates of one of the possible moves is the same as the coordinates of the clicked square
  if (possibleMoves[0].length > 0) {
    moved = board[clickedSquare[1]][clickedSquare[0]].move(
      x,
      y,
      brd,
      moves,
      possibleMoves,
      whichPromotion === undefined ? promote : whichPromotion
    );
  }

  //if piece moved return object with apprioprietly changed variables
  if (moved !== false) {
    whoseTurn = changeTurn(whoseTurn);
    //creating FEN string from the current position represented in a moved.board variable and adding it into fenArray
    let fen = boardToFEN(moved.board);
    fenArray.push(fen);
    //checking if the side which is supposed to move next is chekc-mated
    let mate = isCheckMate(whoseTurn, moved.board, moved.lastMove);
    //checking if the side which is supposed to move next is stale-mated
    let staleMate = isStaleMate(whoseTurn, moved.board, moved.lastMove);
    //checking if the three fold repetition happened
    let threeFold = isThreeFoldRepetition(fenArray);
    //variable which counts how many moves there are without any capture or pawn push in a row
    //if there are 100 moves like this the game ends in a draw by fifty move rule
    let add =
      board[clickedSquare[1]][clickedSquare[0]].piece === "Pawn" ||
      moved.lastMove.didTaken !== "";
    howManyMovesAnyTook = add ? 0 : howManyMovesAnyTook + 1;
    //checking if it's possible to play the game
    ifPlayable =
      threeFold === false &&
      mate === false &&
      staleMate === false &&
      howManyMovesAnyTook < 100;
    //returning object which will be set as a new state
    return {
      clickedSquare: ["", ""],
      possibleMoves: [],
      board: moved.board,
      moves: moved.moves,
      lastMove: moved.lastMove,
      whoseTurn,
      ifPlayable,
      promote: ["", ""],
      result:
        (threeFold === true && "draw by Three fold repetition") ||
        (howManyMovesAnyTook === 100 && "draw by 50 move rule") ||
        (mate && "check-mate") ||
        (staleMate && "stale-mate") ||
        null,
      howManyMovesAnyTook,
      fenArray,
    };
  }

  return null;
}

export default boardhandle;
