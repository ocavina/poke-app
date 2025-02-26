import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

beforeAll(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes("pokemon?limit=151")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              results: [
                { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
                { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
              ],
            }),
        });
      } else if (url.includes("/pokemon/")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: 1,
              name: "bulbasaur",
              sprites: { 
                front_default: "bulbasaur.png",
                other: { "official-artwork": { front_default: "bulbasaur-art.png" } }
              },
              types: [{ type: { name: "grass" } }],
              stats: [{ stat: { name: "hp" }, base_stat: 45 }],
              moves: [{ move: { name: "tackle" } }],
            }),
        });
      }
      return Promise.reject(new Error("Unknown API Call"));
    });
  });
  

it("returns to the main page when clicking the back button", async () => {
    render(<App />);
  
    // Wait for loading screen to disappear
    await waitFor(() => expect(screen.queryByText(/Loading Pokémon/i)).not.toBeInTheDocument());
  
    // Wait for Bulbasaur to appear
    await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());
  
    // Click on Bulbasaur
    fireEvent.click(screen.getByText(/bulbasaur/i));
  
    // Wait for the details page to appear
    await waitFor(() => expect(screen.getByText(/Base Stats:/i)).toBeInTheDocument());
  
    // Click Back Button
    fireEvent.click(screen.getByText(/← Back to Pokedex/i));
  
    // Wait for Bulbasaur to appear back on the main page
    await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());
  });
  