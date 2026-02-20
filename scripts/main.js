//Hlavní skript, který vše spouští
import { fetchMovies } from './api-handler.js';
// Počkáme, až se načte celá stránka
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Obsluha roletky a galerie filmů ---
    const movieFilter = document.getElementById('movie-filter');
    const galleryGrid = document.getElementById('movie-gallery');
    if (movieFilter && galleryGrid) {
        movieFilter.addEventListener('change', async (event) => {
            const select = event.target;
            const query = select.value;
            // Pokud uživatel vybere prázdnou možnost, nic neděláme
            if (!query)
                return;
            // Zobrazení načítání (UX vylepšení)
            galleryGrid.innerHTML = '<p class="loading-text">Načítám filmy...</p>';
            // Získání dat z API
            const moviesData = await fetchMovies(query);
            // Vykreslení dat
            renderMovies(moviesData, galleryGrid);
        });
    }
    // --- 2. Tlačítko pro návrat nahoru ---
    const scrollUpBtn = document.querySelector('.fa-circle-up');
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
/**
 * Funkce vytvoří HTML elementy pro každý film a vloží je do stránky
 */
function renderMovies(movies, container) {
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
// --- 3. Registrační formulář ---
const regForm = document.getElementById('registration-form');
if (regForm) {
    regForm.addEventListener('submit', (event) => {
        // ZABRÁNÍME VÝCHOZÍMU CHOVÁNÍ! (Prohlížeč by jinak celou stránku obnovil)
        event.preventDefault();
        // Získáme hodnoty, které uživatel vyplnil
        const emailInput = document.getElementById('user-email');
        // Pro kontrolu si to vypíšeme do konzole (F12)
        console.log("Registrace úspěšná pro email:", emailInput.value);
        // Vytvoříme nový HTML element pro zprávu o úspěchu
        const successMsg = document.createElement('div');
        successMsg.classList.add('success-message');
        // Zobrazíme tam i zadaný e-mail pro lepší pocit
        successMsg.innerHTML = `<i class="fa-regular fa-circle-check"></i> Vítejte! Účet pro <strong>${emailInput.value}</strong> byl úspěšně vytvořen.`;
        // Nahradíme celý formulář touhle krásnou zprávou
        if (regForm.parentNode) {
            regForm.parentNode.replaceChild(successMsg, regForm);
        }
    });
}
//# sourceMappingURL=main.js.map