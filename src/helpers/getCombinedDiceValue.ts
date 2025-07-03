import { Dice, isDice } from "../types/Dice";
import { isDie } from "../types/Die";

/**
 * Check if the dice is a classical D100 roll with a D100
 * for the 10s unit and a D10 for the single digit.
 * If it is return the combined result.
 */
function checkD20Combination(
  dice: Dice,
  values: Record<string, number>
): number | null {
  // Check if all dice are D20s
  if (
    dice.dice.length > 0 &&
    dice.dice.every((d) => isDie(d) && d.type === "D20")
  ) {
    // Collect all rolled values and styles for D20s
    const d20s = dice.dice.filter((d) => isDie(d) && d.type === "D20");
    const d20Values = d20s
      .map((d) => (isDie(d) ? values[d.id] : undefined))
      .filter((v) => v !== undefined) as number[];
    const hasBane = d20s.some((d) => isDie(d) && d.style === "BANE");
    if (d20Values.length === dice.dice.length) {
      return hasBane ? Math.max(...d20Values) : Math.min(...d20Values);
    }
  }
  return null;
}

/**
 * Recursively get the final result for a roll of dice
 * @param dice
 * @param values A mapping of Die ID to their rolled value
 * @returns
 */
export function getCombinedDiceValue(
  dice: Dice,
  values: Record<string, number>
): number | null {
  const skillRollValue = checkD20Combination(dice, values);
  if (skillRollValue !== null) {
    return skillRollValue;
  }

  let currentValues: number[] = [];
  for (const dieOrDice of dice.dice) {
    if (isDie(dieOrDice)) {
      const value = values[dieOrDice.id];
      if (value !== undefined) {
        if (value === 0 && dieOrDice.type === "D10") {
          currentValues.push(10);
        } else {
          currentValues.push(value);
        }
      }
    } else if (isDice(dieOrDice)) {
      const value = getCombinedDiceValue(dieOrDice, values);
      if (value !== null) {
        currentValues.push(value);
      }
    }
  }

  const bonus = dice.bonus || 0;

  if (currentValues.length === 0 || dice.combination === "NONE") {
    if (dice.bonus === undefined) {
      return null;
    } else {
      return dice.bonus;
    }
  } else if (dice.combination === "HIGHEST") {
    return Math.max(...currentValues) + bonus;
  } else if (dice.combination === "LOWEST") {
    return Math.min(...currentValues) + bonus;
  } else {
    return currentValues.reduce((a, b) => a + b) + bonus;
  }
}
