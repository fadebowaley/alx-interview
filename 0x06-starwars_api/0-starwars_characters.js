#!/usr/bin/env node

const request = require("request");

// Check if a movie ID is provided as a command-line argument
if (process.argv.length !== 3) {
  console.error("Usage: ./0-starwars_characters.js <Movie ID>");
  process.exit(1);
}

const movieId = process.argv[2];
// Define the Star Wars API URL for fetching movie data
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Function to fetch and display characters
function fetchCharacters(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.error("Error:", error);
      process.exit(1);
    }
    if (response.statusCode !== 200) {
      console.error("API Error. Status code:", response.statusCode);
      process.exit(1);
    }

    const movieData = JSON.parse(body);

    // Display characters
    movieData.characters.forEach((characterUrl) => {
      request(characterUrl, (charError, charResponse, charBody) => {
        if (charError) {
          console.error("Error:", charError);
          process.exit(1);
        }
        if (charResponse.statusCode !== 200) {
          console.error("API Error. Status code:", charResponse.statusCode);
          process.exit(1);
        }

        const characterData = JSON.parse(charBody);
        console.log(characterData.name);
      });
    });
  });
}

// Fetch characters for the specified movie
fetchCharacters(apiUrl);
