//Normally data is stored in DB, when app sends a request to DB, it return an array of data as below:
//Link: https://www.imdb.com/chart/top/

//--- CONTACT US, CHARACTER LIMIT

//const contentBox = document.getElementById('content');
//const contentCounter = document.getElementById('content-counter');
//const maxChars = parseInt(contentBox.getAttribute('maxlength'), 10);

//contentBox.addEventListener('input', () => {
//  const length = contentBox.value.length;
//  contentCounter.textContent = `${length} / ${maxChars}`;
//});

document.addEventListener("DOMContentLoaded", () => {
  const allFields = document.querySelectorAll("input[maxlength], textarea[maxlength]");

  allFields.forEach(field => {
    const counterId = `${field.id}-counter`;
    const counter = document.getElementById(counterId);

    if (!counter) return;

    const max = parseInt(field.getAttribute("maxlength"), 10);
    const updateCount = () => {
      counter.textContent = `${field.value.length} / ${max}`;
    };

    field.addEventListener("input", updateCount);
    updateCount();
  });

    // === TRANSLATIONS ===
  const translations = {
    en: {
      welcome_message: "Welcome to Studylife HB!"
    },
    es: {
      welcome_message: "¡Bienvenido a Studylife HB!"
    },
    mi: {
      welcome_message: "Nau mai ki Studylife HB!"
    }
  };

  // === LANGUAGE SWITCHER ===
  function switchLanguage() {
    const selectedLang = document.getElementById("languageSelect").value;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = translations[selectedLang][key] || el.textContent;
    });
  }

  // === INITIAL LOAD ===
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    document.getElementById("languageSelect").value = savedLang;
    switchLanguage();
  });

  document.getElementById("languageSelect").addEventListener("change", () => {
    const lang = document.getElementById("languageSelect").value;
    localStorage.setItem("lang", lang);
    switchLanguage();
  });

  // === MOBILE NUMBER VALIDATION ===
  const mobileInput = document.getElementById('mobile');
  if (mobileInput) {
    mobileInput.addEventListener('input', () => {
      mobileInput.value = mobileInput.value.replace(/\D/g, '');
    });
  }
});
