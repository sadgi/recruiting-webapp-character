const API_URL =
  "https://recruiting.verylongdomaintotestwith.ca/api/sadgi/character";

export const fetchCharacter = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch character data.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveCharacter = async (characterData: any) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(characterData),
    });

    if (!response.ok) throw new Error("Failed to save character data.");
  } catch (error) {
    console.error(error);
  }
};
