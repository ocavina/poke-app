# Pokédex React App

## Description
This is a **Pokédex Single Page Application (SPA)** built with **React Hooks and Vite**. The app allows users to:  
- View all 151 original Pokémon with images.  
- Search Pokémon by name using a search bar.  
- Filter Pokémon by type with a dropdown menu.  
- Click on a Pokémon to see detailed information, including:  
  - Type, Height, Weight, Experience  
  - Base Stats (HP, Attack, Defense, etc.)  
  - First 10 Moves  
  - Pokédex Flavor Text  

## UI/UX Design
The UI/UX design for this project is planned using **Figma**.  
[View the Figma Board](https://www.figma.com/board/FYRlHB74pfJpP5gUYvbJkh/React-Hooks-Workshop?node-id=0-1&t=eBRni8ippPUreaQf-1)  

## Technologies Used
- React (useState, useEffect)  
- Vite (for a fast development setup)  
- PokeAPI (Fetching Pokémon data)  
- CSS Flexbox & Grid (For responsive layout)  
- JavaScript ES6+  

## File Structure
/pokedex-app 
├── /public 
│ ├── favicon.png 
│ ├── images/pokedex.png
├── /src 
│ ├── App.jsx 
│ ├── main.jsx 
│ ├── index.css 
│ ├── App.css 
├── /components 
│ ├── PokemonCard.jsx 
│ ├── PokemonDetails.jsx 
├── package.json 
├── vite.config.js 
├── README.md
## Installation & Setup
### 1. Clone the Repository
- ```sh
- git clone https://github.com/YOUR_GITHUB_USERNAME/pokedex-app.- git
- cd pokedex-app
### 2. Install Dependencie
- npm install
### 3. Start the Development Server
- npm run dev
- Open http://localhost:5173/ in your browser.
## Features to Add

- Evolution Chain
- Favorite Pokémon List
- More Pokémon Generations Support
- License

## Tested Features
We created five core tests to validate different functionalities of the Pokédex application.

### Rendering the Pokedex Title
- Ensures the <h1> title "Pokedex" is correctly displayed on the main page.

### Search Functionality
- Simulates user input in the search bar.
- Filters Pokémon by name.
- Verifies that only matching Pokémon are shown.

### Type Filtering
- Selects a type from the dropdown (e.g., "Fire").
- Ensures only Pokémon of that type are displayed.
- Checks that filtering does not break the UI.

### Pokémon Details View
- Simulates clicking a Pokémon card.
- Checks that the details page appears.
- Ensures Pokémon stats and type are displayed correctly.

### Back Button Functionality
- Clicks the Back to Pokedex button.
- Verifies that the Pokémon list reappears.

This project is open-source and free to use.
Feel free to contribute.