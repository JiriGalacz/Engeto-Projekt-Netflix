//Hlavní skript, který vše spouští

import { fetchMovies } from './api-handler.js';
import type { ApiResponse } from './movie.js';

// Počkáme, až se načte celá stránka
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Obsluha roletky a galerie filmů ---
    const movieFilter = document.getElementById('movie-filter') as HTMLSelectElement | null;
    const galleryGrid = document.getElementById('movie-gallery') as HTMLElement | null;

    if (movieFilter && galleryGrid) {
        movieFilter.addEventListener('change', async (event) => {
            const select = event.target as HTMLSelectElement;
            const query = select.value;

            // Pokud uživatel vybere prázdnou možnost, nic neděláme
            if (!query) return;

            // Zobrazení načítání (UX vylepšení)
            galleryGrid.innerHTML = '<p class="loading-text">Načítám filmy...</p>';

            // Získání dat z API
            const moviesData = await fetchMovies(query);
            
            // Vykreslení dat
            renderMovies(moviesData, galleryGrid);
        });
    }

    // --- 2. Tlačítko pro návrat nahoru ---
    const scrollUpBtn = document.querySelector('.fa-circle-up') as HTMLElement | null;
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/**
 * Funkce vytvoří HTML elementy pro každý film a vloží je do stránky
 */
function renderMovies(movies: ApiResponse[], container: HTMLElement): void {
    container.innerHTML = ''; // Vyčištění obsahu před novým vykreslením

    if (movies.length === 0) {
        container.innerHTML = '<p>Žádné filmy nebyly nalezeny.</p>';
        return;
    }

    movies.forEach(item => {
        const show = item.show;
        
        // Vytvoření kontejneru pro jeden film
        const movieCard = document.createElement('article');
        movieCard.classList.add('movie-card'); // Používáme třídy místo inline stylů!

        // Vytvoření obrázku s fallbackem, pokud obrázek na API chybí
        const imageUrl = show.image?.medium || 'https://via.placeholder.com/210x295/333333/ffffff?text=Bez+obrázku';
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Plakát k filmu ${show.name}`;
        imgElement.classList.add('movie-poster');

        // Vytvoření titulku
        const titleElement = document.createElement('h3');
        titleElement.textContent = show.name;
        titleElement.classList.add('movie-title');

        // Vložení prvků do karty a následně do mřížky
        movieCard.appendChild(imgElement);
        movieCard.appendChild(titleElement);
        container.appendChild(movieCard);
    });
}