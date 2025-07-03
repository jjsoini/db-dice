import React from "react";
import { Die } from "../types/Die";
import { Group } from "three";
import { DiceMesh } from "../meshes/DiceMesh";
import { DiceMaterial } from "../materials/DiceMaterial";

type DiceProps = JSX.IntrinsicElements["group"] & { die: Die };

export const Dice = React.forwardRef<Group, DiceProps>(
  ({ die, children, ...props }, ref) => {
    return (
      <DiceMesh
        diceType={die.type}
        {...props}
        ref={ref}
      >
        <DiceMaterial diceStyle={die.style} />
        {children}
      </DiceMesh>
    );
  }
);
