import { fetchMovies } from './api-handler.js';
// POČKÁME, AŽ SE NAČTE CELÁ STRÁNKA (HTML)
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Obsluha roletky a galerie filmů ---
    const movieFilter = document.getElementById('movie-filter');
    const galleryGrid = document.getElementById('movie-gallery');
    if (movieFilter && galleryGrid) {
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
    // --- 2. Registrační formulář ---
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('user-email');
            console.log("Registrace úspěšná pro email:", emailInput.value);
            const successMsg = document.createElement('div');
            successMsg.classList.add('success-message');
            successMsg.innerHTML = `<i class="fa-regular fa-circle-check"></i> Vítejte! Účet pro <strong>${emailInput.value}</strong> byl úspěšně vytvořen.`;
            if (regForm.parentNode) {
                regForm.parentNode.replaceChild(successMsg, regForm);
            }
        });
    }
    // --- 3. Tlačítko pro návrat nahoru ---
    const scrollUpBtn = document.querySelector('.fa-circle-up');
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}); // <--- TADY KONČÍ HLAVNÍ BLOK DOMContentLoaded
/**
 * Funkce pro vykreslení filmů zůstává ležet ZCELA MIMO (to je správně)
 */
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
        const imageUrl = show.image?.medium || 'https://via.placeholder.com/210x295/333333/ffffff?text=Bez+obrázku';
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
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
//# sourceMappingURL=main.js.map