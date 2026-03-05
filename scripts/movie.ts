/**
 * Třída reprezentující jeden seriál/film získaný z TVMaze API.
 */
export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null; // Některé filmy nemusí mít obrázek, proto "null"
}

/**
 * Struktura odpovědi z TVMaze API, kde každý objekt má 'score' a 'show'.
 */
export interface ApiResponse {
  score: number;
  show: Show;
}
