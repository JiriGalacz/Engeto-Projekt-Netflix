/**
 * Inicializuje validaci registračního formuláře a ošetřuje jeho odeslání.
 */
export function initFormValidation() {
  const regForm = document.getElementById(
    "registration-form",
  ) as HTMLFormElement | null;
  if (!regForm) return; // Pokud nejsme na stránce s formulářem, rovnou skončíme

  // --- Elementy pro validaci hesel ---
  const passwordInput = document.getElementById(
    "user-password",
  ) as HTMLInputElement;
  const repeatPasswordInput = document.getElementById(
    "user-repeat-password",
  ) as HTMLInputElement;
  const passwordErrorMsg = document.getElementById(
    "password-error",
  ) as HTMLSpanElement;

  /**
   * Kontroluje, zda se zadaná hesla shodují.
   * Nastavuje příslušné CSS třídy a CustomValidity zprávu.
   */
  const validatePasswords = () => {
    if (repeatPasswordInput.value === "") {
      passwordErrorMsg.classList.add("hidden");
      repeatPasswordInput.classList.remove("input-error");
      repeatPasswordInput.setCustomValidity("");
      return;
    }

    if (passwordInput.value !== repeatPasswordInput.value) {
      passwordErrorMsg.classList.remove("hidden");
      repeatPasswordInput.classList.add("input-error");
      repeatPasswordInput.setCustomValidity("Zadaná hesla se neshodují!");
    } else {
      passwordErrorMsg.classList.add("hidden");
      repeatPasswordInput.classList.remove("input-error");
      repeatPasswordInput.setCustomValidity("");
    }
  };

  // Nasazení event listenerů na pole pro hesla
  if (passwordInput && repeatPasswordInput) {
    passwordInput.addEventListener("input", validatePasswords);
    repeatPasswordInput.addEventListener("input", validatePasswords);
  }

  // --- Ošetření odeslání formuláře (Submit) ---
  regForm.addEventListener("submit", (event) => {
    event.preventDefault();// Zabránění obnovení stránky

    const emailInput = document.getElementById(
      "user-email",
    ) as HTMLInputElement;

    const successMsg = document.createElement("div");
    successMsg.classList.add("success-message");
    // Připravíme si šablonu s prázdným <strong>
    successMsg.innerHTML = `✅ Vítejte! Účet pro <strong class="user-email-display"></strong> byl úspěšně vytvořen.`;

    // BEZPEČNOSTNÍ PRAVIDLO (Prevence XSS): 
    // Hodnotu z inputu vkládáme výhradně přes textContent, nikdy přes innerHTML!
    const emailStrongElement = successMsg.querySelector(".user-email-display");
    if (emailStrongElement) {
      emailStrongElement.textContent = emailInput.value;
    }
    
    // Nahrazení formuláře za zprávu o úspěchu
    if (regForm.parentNode) {
      regForm.parentNode.replaceChild(successMsg, regForm);
    }
  });
}
