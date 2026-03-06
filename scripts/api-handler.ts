// Funkce pro tahání dat o filmech
// Důležité: Při importech v prohlížeči (ES Modules) musíme uvádět koncovku .js!

import type { ApiResponse } from "./movie.js";
/**
 * Funkce stáhne filmy z TVMaze API podle hledaného výrazu
 * @param {string} query Hledaný výraz (např. "batman", "zombie", "comedy" apod.)
 * @returns {Promise<ApiResponse[]>} Pole výsledků nebo prázdné pole v případě chyby
 */
export const fetchMovies = async (query: string): Promise<ApiResponse[]> => {
  try {
   const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error(`Chyba serveru: ${response.status}`);
    }

    const data: ApiResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("Chyba při stahování dat z API:", error);
    return []; // Vracíme prázdné pole, aby nám nespadl zbytek aplikace
  }
};
