import Promote from "./Promote";

//react element which consist of 4 other react elements which show pieces to which pawn can promote.
function AllPromotion({ x, y, click, state }) {
  let a = [];
  const pieces = ["Queen", "Rook", "Knight", "Bishop"];
  for (let i = 0; i < 4; i++) {
    a.push(
      <Promote
        x={x}
        y={(y === 0 && y + i) || (y === 7 && y - i)}
        value={pieces[i]}
        key={pieces[i]}
        state={state}
        click={click}
      />
    );
  }
  return <>{a}</>;
}

export default AllPromotion;
