import { fetchMovies } from './api-handler.js';
import type { ApiResponse } from './movie.js';

// POČKÁME, AŽ SE NAČTE CELÁ STRÁNKA (HTML)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Obsluha roletky a galerie filmů ---
    const movieFilter = document.getElementById('movie-filter') as HTMLSelectElement | null;
    const galleryGrid = document.getElementById('movie-gallery') as HTMLElement | null;

    if (movieFilter && galleryGrid) {
        movieFilter.addEventListener('change', async (event) => {
            const select = event.target as HTMLSelectElement;
            const query = select.value;
            if (!query) return;

            galleryGrid.innerHTML = '<p class="loading-text">Načítám filmy...</p>';
            const moviesData = await fetchMovies(query);
            renderMovies(moviesData, galleryGrid);
        });
    }

    // --- 2. Registrační formulář ---
    const regForm = document.getElementById('registration-form') as HTMLFormElement | null;
    if (regForm) {
        
        // Políčka pro heslo
        const passwordInput = document.getElementById('user-password') as HTMLInputElement;
        const repeatPasswordInput = document.getElementById('user-repeat-password') as HTMLInputElement;
        const passwordErrorMsg = document.getElementById('password-error') as HTMLSpanElement;

        // Funkce pro dynamickou kontrolu shody hesel
    const validatePasswords = () => {
            // KROK 1: Pokud je druhé políčko úplně prázdné, chybu schováme
            if (repeatPasswordInput.value === '') {
                passwordErrorMsg.classList.add('hidden');
                repeatPasswordInput.classList.remove('input-error');
                repeatPasswordInput.setCustomValidity("");
                return;
            }

            // KROK 2: Porovnání
            if (passwordInput.value !== repeatPasswordInput.value) {
                // CHYBA! Odebereme 'hidden' (ukážeme text) a přidáme červený rámeček
                passwordErrorMsg.classList.remove('hidden');
                repeatPasswordInput.classList.add('input-error');
                repeatPasswordInput.setCustomValidity("Zadaná hesla se neshodují!"); 
            } else {
                // VŠE V POŘÁDKU! Přidáme 'hidden' (schováme text) a odebereme rámeček
                passwordErrorMsg.classList.add('hidden');
                repeatPasswordInput.classList.remove('input-error');
                repeatPasswordInput.setCustomValidity("");
            }
        };

        // Kontrolovat při každém psaní do políčka
        if (passwordInput && repeatPasswordInput) {
            passwordInput.addEventListener('input', validatePasswords);
            repeatPasswordInput.addEventListener('input', validatePasswords);
        }

        regForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const emailInput = document.getElementById('user-email') as HTMLInputElement;
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
    const scrollUpBtn = document.querySelector('.fa-circle-up') as HTMLElement | null;

    if (scrollUpBtn) {
        // Funkce pro kontrolu pozice scrollu
        window.addEventListener('scroll', () => {
            // Pokud odscrolujeme více než 300px odshora, přidáme třídu 'visible'
            if (window.scrollY > 300) {
                scrollUpBtn.classList.add('visible');
            } else {
                scrollUpBtn.classList.remove('visible');
            }
        });

        // Původní funkce pro kliknutí zůstává
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
}); // <--- TADY KONČÍ HLAVNÍ BLOK DOMContentLoaded

/**
 * Funkce pro vykreslení filmů zůstává ležet ZCELA MIMO (to je správně)
 */
function renderMovies(movies: ApiResponse[], container: HTMLElement): void {
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