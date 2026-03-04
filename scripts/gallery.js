import { fetchMovies } from './api-handler.js';
export function initGallery() {
    const movieFilter = document.getElementById('movie-filter');
    const galleryGrid = document.getElementById('movie-gallery');
    if (!movieFilter || !galleryGrid)
        return; // Pokud nejsme na stránce galerie, kód se neprovede
    movieFilter.addEventListener('change', async (event) => {
        const select = event.target;
        const query = select.value;
        if (!query)
            return;
        galleryGrid.innerHTML = '<p class="loading-text">Načítám filmy...</p>';
        const moviesData = await fetchMovies(query);
        renderMovies(moviesData, galleryGrid);
    });
}
function renderMovies(movies, container) {
    container.innerHTML = '';
    if (movies.length === 0) {
        container.innerHTML = '<p>Žádné filmy nebyly nalezeny.</p>';
        return;
    }
    movies.forEach(item => {
        const show = item.show;
        const movieCard = document.createElement('article');
        movieCard.classList.add('movie-card');
        // Odkazujeme přímo na váš jistý lokální obrázek
        const imageUrl = show.image?.medium || 'pictures/no-image.jpg';
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        // Ošetření chyby při načítání obrázku z existujícího (ale nefunkčního) odkazu
        imgElement.onerror = () => {
            imgElement.onerror = null;
            imgElement.src = 'pictures/no-image.jpg';
        };
        imgElement.alt = `Plakát k filmu ${show.name}`;
        imgElement.classList.add('movie-poster');
        const titleElement = document.createElement('h3');
        titleElement.textContent = show.name;
        titleElement.classList.add('movie-title');
        movieCard.appendChild(imgElement);
        movieCard.appendChild(titleElement);
        container.appendChild(movieCard);
    });
}
//# sourceMappingURL=gallery.js.map