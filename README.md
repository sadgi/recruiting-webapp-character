# recruiting-webapp-character
This is a React TypeScript application for managing tabletop RPG character sheets. It allows users to create characters, assign attributes, manage skills, select classes, and perform skill checks.


# Run the application
- Clone the newly created repo locally
- Run the following command to install node modules
```
npm i
```
- Run the following command to start web app
```
npm start
```

# What is a character sheet?
Character sheets are defined by the following high-level concepts

- Attributes: This represents a character's raw abilities
- Attribute Modifier: calculated using the related Attribute, this value affects a character's skills
- Skills: A character's ability to perform a specific action

# Usage
- Manage Attributes: Adjust attributes within a total cap of 70.
- Assign Skills: Distribute available skill points.
- Select Classes: Choose from available classes based on attribute requirements.
- Perform Skill Checks: Simulate dice rolls with skill modifiers.
- Save & Load Characters: Persist character data using API calls.


# API Integration

The app fetches and saves character data via following api url and make sure to change your github username in api.ts file under ./src/api

const API_URL = "https://recruiting.verylongdomaintotestwith.ca/api/{{github_username}}/character";

