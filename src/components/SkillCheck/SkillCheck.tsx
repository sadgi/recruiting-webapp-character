import React, { useState } from "react";
import { SKILL_LIST } from "../../consts";
import "./SkillCheck.css";

interface Props {
  skills: Record<string, number>;
  attributes: Record<string, Record<string, number>>;
}

const SkillCheck: React.FC<Props> = ({ skills, attributes }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState(10);
  const [result, setResult] = useState<string | null>(null);

  const handleRoll = () => {
    const roll = Math.ceil(Math.random() * 20);
    const skill = SKILL_LIST.find((skill) => skill.name === selectedSkill);
    const modifier = skill.attributeModifier;
    const skillValue =
      (skills[selectedSkill] || 0) + attributes[modifier].modifier;
    const success = roll + skillValue >= dc;
    setResult(
      `Rolled: ${roll}, DC: ${dc}, Skill: ${selectedSkill} : ${skillValue}, ${
        success ? "Success!" : "Failure."
      }`
    );
  };

  return (
    <div className="skill-check-container">
      <h2>Skill Check</h2>
      <div>
        <label>Skill: </label>
        <select onChange={(e) => setSelectedSkill(e.target.value)}>
          {SKILL_LIST.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label> DC: </label>
        <input
          type="number"
          value={dc}
          onChange={(e) => setDC(Number(e.target.value))}
          min="1"
        />
        <button onClick={handleRoll}>Roll</button>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default SkillCheck;
