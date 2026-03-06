/**
 * Inicializuje tlačítko pro návrat na začátek stránky (Scroll Up).
 * Tlačítko se zobrazí až po odscrollování o 300px dolů.
 */
export function initScrollUpButton() {
    const scrollUpBtn = document.querySelector(".scroll-up-btn");
    if (!scrollUpBtn)
        return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollUpBtn.classList.add("visible");
        }
        else {
            scrollUpBtn.classList.remove("visible");
        }
    });
    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
//# sourceMappingURL=utils.js.map