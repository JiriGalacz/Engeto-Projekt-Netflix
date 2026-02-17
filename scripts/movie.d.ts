export interface Show {
    id: number;
    name: string;
    image: {
        medium: string;
        original: string;
    } | null;
}
export interface ApiResponse {
    score: number;
    show: Show;
}
//# sourceMappingURL=movie.d.ts.map