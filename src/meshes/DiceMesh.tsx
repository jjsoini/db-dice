import React from "react";
import { DiceType } from "../types/DiceType";
import { RoundedDiceMesh } from "./rounded/RoundedDiceMesh";
import { SharpDiceMesh } from "./sharp/SharpDiceMesh";
import { Group } from "three";

type DiceMeshProps = JSX.IntrinsicElements["group"] & {
  diceType: DiceType;
  sharp?: boolean;
};

export const DiceMesh = React.forwardRef<Group, DiceMeshProps>(
  ({ sharp, ...props }, ref) => {
    if (sharp) {
      return <SharpDiceMesh ref={ref} {...props} />;
    } else {
      return <RoundedDiceMesh ref={ref} {...props} />;
    }
  }
);
