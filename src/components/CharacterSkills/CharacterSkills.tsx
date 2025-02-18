import React from "react";
import { SKILL_LIST } from "../../consts";
import "./CharacterSkills.css";

interface Props {
  skills: Record<string, number>;
  availablePoints: number;
  onChange: (skill: string, change: number) => void;
  attributes: Record<string, any>;
}

const CharacterSkills: React.FC<Props> = ({
  skills,
  availablePoints,
  onChange,
  attributes,
}) => {
  return (
    <div className="skills-container">
      <h2>Skills ( Total Available Points: {availablePoints})</h2>
      {SKILL_LIST.map(({ name, attributeModifier }: any) => {
        const points = skills[name] || 0;
        const modifier =
          attributes &&
          Object.keys(attributes).length > 0 &&
          attributes[attributeModifier].modifier;
        const total = points + modifier;

        return (
          <div key={name} className="skill-row">
            <span>
              {name} - points: {points}{" "}
            </span>
            <button
              onClick={() => onChange(name, 1)}
              disabled={availablePoints <= 0}
            >
              +
            </button>
            <button onClick={() => onChange(name, -1)} disabled={points <= 0}>
              -
            </button>
            <span>
              modifier ({attributeModifier}): {modifier}
            </span>
            <span>total: {total}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterSkills;
