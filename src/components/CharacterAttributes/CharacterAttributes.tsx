import React from "react";
import { ATTRIBUTE_LIST } from "../../consts";
import "./CharacterAttributes.css";

interface Props {
  attributes: Record<string, Record<string, number>>;
  onChange: (attr: string, change: number) => void;
}


const CharacterAttributes: React.FC<Props> = ({ attributes, onChange }) => {
  const calculateAbilityModifier = (value: number) =>
    Math.floor((value - 10) / 2);

  return (
    <div className="attributes-container">
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attr) => {
        const value =
          (attributes &&
            Object.keys(attributes).length > 0 &&
            attributes[attr].value) ||
          10;
        const modifier = calculateAbilityModifier(value);
        return (
          <div key={attr} className="attribute-row">
            <span className="attribute-name">
              {attr}: {value}
            </span>
            <span className="attribute-modifier">
              Modifier: {modifier >= 0 ? `+${modifier}` : modifier}
            </span>
            <button onClick={() => onChange(attr, -1)}>-</button>
            <button onClick={() => onChange(attr, 1)}>+</button>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterAttributes;
