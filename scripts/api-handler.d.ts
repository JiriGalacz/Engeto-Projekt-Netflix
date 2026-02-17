import type { ApiResponse } from './movie.js';
/**
 * Funkce stáhne filmy z TVMaze API podle hledaného výrazu
 * @param query Hledaný výraz (např. "girl", "boy")
 * @returns Pole výsledků nebo prázdné pole v případě chyby
 */
export declare const fetchMovies: (query: string) => Promise<ApiResponse[]>;
//# sourceMappingURL=api-handler.d.ts.map