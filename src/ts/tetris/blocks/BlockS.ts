import { Block, BlockState } from "./Block";
import { BlockBase } from "./BlockBase";
import { Move, Pos } from "../gridGeometry";
import Immutable from "../../dependencies/immutable";

export class BlockS extends BlockBase {
  private static makeCells(state: BlockState, base: Pos) {
    const cellExists = [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ];
    const cells = Immutable.Set<Pos>().withMutations((mutable) => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (cellExists[state]![i]![j]) {
            mutable.add(base.move(new Move(i, j)));
          }
        }
      }
    });
    return cells;
  }

  constructor(state: BlockState, base: Pos) {
    super(state, base, "S", BlockS.makeCells(state, base));
  }
  protected with({ state, base }: { state: BlockState; base: Pos }): Block {
    return new BlockS(state, base);
  }
}
