export function initScrollUpButton() {
    const scrollUpBtn = document.querySelector('.fa-circle-up') as HTMLElement | null;

    if (!scrollUpBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollUpBtn.classList.add('visible');
        } else {
            scrollUpBtn.classList.remove('visible');
        }
    });

    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}