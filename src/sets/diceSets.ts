import { DiceSet } from "../types/DiceSet";
import { DiceStyle } from "../types/DiceStyle";
import { Die } from "../types/Die";

import * as boonPreviews from "../previews/boon";
import * as banePreviews from "../previews/bane";

const standardPreviews: Record<DiceStyle, string> = {
  BOON: boonPreviews.D20,
  BANE: banePreviews.D20
};

function createStandardSet(style: DiceStyle): DiceSet {
  const id = `${style}_STANDARD`;
  return {
    id,
    name: `${style.toLowerCase()} dice`,
    dice: [
      { id: `${id}_D20`, type: "D20", style },
      { id: `${id}_D20bane`, type: "D20", style: "BANE" },
      { id: `${id}_D12`, type: "D12", style },
      { id: `${id}_D10`, type: "D10", style },
      { id: `${id}_D8`, type: "D8", style },
      { id: `${id}_D6`, type: "D6", style },
      { id: `${id}_D4`, type: "D4", style },
    ],
    previewImage: standardPreviews[style],
  };
}

const standardSets = [
  createStandardSet("BOON"),
];

export const diceSets: DiceSet[] = [...standardSets];
