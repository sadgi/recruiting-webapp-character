import React, { useState, useEffect } from "react";
import CharacterAttributes from "./components/CharacterAttributes/CharacterAttributes";
import CharacterSkills from "./components/CharacterSkills/CharacterSkills";
import CharacterClasses from "./components/CharacterClasses/CharacterClasses";
import SkillCheck from "./components/SkillCheck/SkillCheck";
import { fetchCharacter, saveCharacter } from "./api/api";
import { CLASS_LIST, ATTRIBUTE_LIST } from "./consts";
import { useNotification } from "./context/NotificationContext";
import "./App.css";

const App = () => {
  const { showNotification } = useNotification();
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const calculateAbilityModifier = (value: number) =>
    Math.floor((value - 10) / 2);

  const attributeInitialList = ATTRIBUTE_LIST.reduce((attribList, list) => {
    attribList[list] = {
      value: 10,
      modifier: calculateAbilityModifier(10),
    };
    return attribList;
  }, {});

  useEffect(() => {
    fetchCharacter().then((data) => {
      if (data) {
        setCharacters(
          data.body.characters || [
            { attributes: attributeInitialList, skills: {} },
          ]
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAttributeChange = (
    index: number,
    attr: string,
    change: number
  ) => {
    const updatedCharacters = [...characters];

    const totalPoints = Object.values(
      updatedCharacters[index].attributes
    ).reduce(
      (acc: number, val: Record<string, number>) => acc + val.value,
      0
    ) as number;

    if (totalPoints + change > 70) {
      showNotification(
        "A character can have up to 70 delegated attribute points",
        "error"
      );
      return;
    }

    updatedCharacters[index].attributes[attr].value = Math.max(
      0,
      updatedCharacters[index].attributes[attr].value + change
    );
    updatedCharacters[index].attributes[attr].modifier =
      calculateAbilityModifier(updatedCharacters[index].attributes[attr].value);
    setCharacters(updatedCharacters);
  };

  const handleSkillChange = (index: number, skill: string, change: number) => {
    const availablePoints = getAvailableSkillPoints(index);
    const totalSpentPoints = Object.values(
      characters[index].skills || {}
    ).reduce((acc: number, val: number) => acc + val, 0) as number;

    if (totalSpentPoints + change > availablePoints) {
      showNotification("Maximum Points are Spent already", "error");
      return;
    }

    const updatedCharacters = [...characters];
    updatedCharacters[index].skills[skill] = Math.max(
      0,
      (updatedCharacters[index].skills[skill] || 0) + change
    );
    setCharacters(updatedCharacters);
  };

  const getAvailableSkillPoints = (index: number) => {
    const max = Object.keys(characters[index].attributes).reduce(
      (result, attrib) => {
        return Math.max(result, characters[index].attributes[attrib].modifier);
      },
      0
    );
    return 10 + 4 * max;
  };

  const saveCharacterData = () => {
    saveCharacter({ characters });
    showNotification("Characters are saved at the backend", "success");
  };

  const resetCharacterData = () => {
    setCharacters([{ attributes: attributeInitialList, skills: {} }]);
    saveCharacter(characters);
    showNotification("Characters are reset", "success");
  };

  return (
    <div className="app-container">
      <h1>Character Sheet</h1>
      <div>
        <button
          onClick={() => {
            setCharacters([
              ...characters,
              { attributes: attributeInitialList, skills: {} },
            ]);
            showNotification("New Character is added at the bottom", "success");
          }}
        >
          Add Character
        </button>
        <button onClick={saveCharacterData}>Save Characters</button>
        <button onClick={resetCharacterData}>Reset Characters</button>
      </div>
      <div className="characters-container">
        {characters.map((character, index) => (
          <div key={index} className="character-card">
            <h2>Character {index + 1}</h2>
            <SkillCheck
              skills={character.skills}
              attributes={character.attributes}
            />
            <div className="characters-data">
              <CharacterAttributes
                attributes={character.attributes}
                onChange={(attr, change) =>
                  handleAttributeChange(index, attr, change)
                }
              />
              <CharacterClasses
                attributes={character.attributes}
                onSelect={setSelectedClass}
              />
              {selectedClass && (
                <div className="class-requirements">
                  <h2>{selectedClass} Requirements</h2>
                  <ul>
                    {Object.entries(CLASS_LIST[selectedClass]).map(
                      ([attr, value]) => (
                        <li key={attr}>
                          {attr}: {value as number}
                        </li>
                      )
                    )}
                  </ul>
                  <button onClick={() => setSelectedClass(null)}>
                    Close Requirement View
                  </button>
                </div>
              )}
              <CharacterSkills
                skills={character.skills}
                onChange={(skill, change) =>
                  handleSkillChange(index, skill, change)
                }
                availablePoints={getAvailableSkillPoints(index)}
                attributes={character.attributes}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
