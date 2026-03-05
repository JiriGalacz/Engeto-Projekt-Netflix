//Třída reprezentující jeden film

// Definice struktury pro samotný seriál/film
export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null; // Některé filmy nemusí mít obrázek, proto "null"
}

// TVMaze API vrací pole objektů, kde každý má 'score' a 'show'
export interface ApiResponse {
  score: number;
  show: Show;
}
