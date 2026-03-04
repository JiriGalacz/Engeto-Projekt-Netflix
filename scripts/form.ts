export function initFormValidation() {
    const regForm = document.getElementById('registration-form') as HTMLFormElement | null;
    if (!regForm) return; // Pokud nejsme na stránce s formulářem, rovnou skončíme
    
    const passwordInput = document.getElementById('user-password') as HTMLInputElement;
    const repeatPasswordInput = document.getElementById('user-repeat-password') as HTMLInputElement;
    const passwordErrorMsg = document.getElementById('password-error') as HTMLSpanElement;

    const validatePasswords = () => {
        if (repeatPasswordInput.value === '') {
            passwordErrorMsg.classList.add('hidden');
            repeatPasswordInput.classList.remove('input-error');
            repeatPasswordInput.setCustomValidity("");
            return;
        }

        if (passwordInput.value !== repeatPasswordInput.value) {
            passwordErrorMsg.classList.remove('hidden');
            repeatPasswordInput.classList.add('input-error');
            repeatPasswordInput.setCustomValidity("Zadaná hesla se neshodují!"); 
        } else {
            passwordErrorMsg.classList.add('hidden');
            repeatPasswordInput.classList.remove('input-error');
            repeatPasswordInput.setCustomValidity("");
        }
    };

    if (passwordInput && repeatPasswordInput) {
        passwordInput.addEventListener('input', validatePasswords);
        repeatPasswordInput.addEventListener('input', validatePasswords);
    }

    regForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const emailInput = document.getElementById('user-email') as HTMLInputElement;
        
        const successMsg = document.createElement('div');
        successMsg.classList.add('success-message');
        // Připravíme si šablonu s prázdným <strong>
        successMsg.innerHTML = `✅ Vítejte! Účet pro <strong class="user-email-display"></strong> byl úspěšně vytvořen.`;
        // Zabezpečení proti XSS - text se vloží čistě jako text, ne jako HTML
        const emailStrongElement = successMsg.querySelector('.user-email-display');
        if (emailStrongElement) {
            emailStrongElement.textContent = emailInput.value;
        }
        
        if (regForm.parentNode) {
            regForm.parentNode.replaceChild(successMsg, regForm);
        }
    });
}