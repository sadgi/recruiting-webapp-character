import React from "react";
import { CLASS_LIST } from "../../consts";
import "./CharacterClasses.css";

interface Props {
  attributes: Record<string,  Record<string, number>>;
  onSelect: (className: string) => void;
}

const CharacterClasses: React.FC<Props> = ({ attributes, onSelect }) => {
  return (
    <div className="classes-container">
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((className) => {
        const meetsRequirements = Object.entries(CLASS_LIST[className]).every(
          ([attr, minVal]) => (attributes[attr].value   || 10)  >= (minVal as number)
        );
        return (
          <div
            key={className}
            className={`class-row ${
              meetsRequirements ? "eligible" : "ineligible"
            }`}
            onClick={() => onSelect(className)}
          >
            {className}
          </div>
        );
      })}
    </div>
  );
};

export default CharacterClasses;
