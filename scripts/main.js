import { initGallery } from './gallery.js';
import { initFormValidation } from './form.js';
import { initScrollUpButton } from './utils.js';
// POČKÁME, AŽ SE NAČTE CELÁ STRÁNKA (HTML)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Galerie - spustíme jen na stránce, kde je kontejner pro filmy
    // V gallery.ts hledáš ID 'movie-gallery'
    if (document.getElementById('movie-gallery')) {
        initGallery();
    }
    // 2. Registrační formulář - spustíme jen tam, kde se nachází
    // Ve form.ts hledáš ID 'registration-form'
    if (document.getElementById('registration-form')) {
        initFormValidation();
    }
    // 3. Tlačítko nahoru - spustíme jen pokud je prvek přítomen v HTML
    // V utils.ts hledáš třídu '.scroll-up-btn'
    if (document.querySelector('.scroll-up-btn')) {
        initScrollUpButton();
    }
});
//# sourceMappingURL=main.js.map