import { initGallery } from './gallery.js';
import { initFormValidation } from './form.js';
import { initScrollUpButton } from './utils.js';

// POČKÁME, AŽ SE NAČTE CELÁ STRÁNKA (HTML)
document.addEventListener('DOMContentLoaded', () => {
    
    // Spustíme moduly. Vykonají se jen ty, které najdou na aktuální stránce své HTML elementy.
    initGallery();
    initFormValidation();
    initScrollUpButton();
    
});