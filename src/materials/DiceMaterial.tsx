import { DiceStyle } from "../types/DiceStyle";
import { BoonMaterial } from "./boon/BoonMaterial";
import { BaneMaterial } from "./bane/BaneMaterial";

export function DiceMaterial({ diceStyle }: { diceStyle: DiceStyle }) {
  switch (diceStyle) {
    case "BOON":
      return <BoonMaterial />;
    case "BANE":
      return <BaneMaterial />;
    default:
      throw Error(`Dice style ${diceStyle} error: not implemented`);
  }
}
