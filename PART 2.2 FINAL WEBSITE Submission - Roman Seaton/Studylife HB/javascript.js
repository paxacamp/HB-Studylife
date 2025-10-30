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
    // Select all fields with maxlength
    const fields = document.querySelectorAll("input[maxlength], textarea[maxlength]");

    fields.forEach(field => {
        const counterId = `${field.id}-counter`;
        const counter = document.getElementById(counterId);

    if (!counter) return; // skip if counter not found

    const max = parseInt(field.getAttribute("maxlength"), 10);

    const updateCount = () => {
      counter.textContent = `${field.value.length} / ${max}`;
    };

    field.addEventListener("input", updateCount);
    updateCount(); // initialize count
    });

    // Allow only digits for NZ Mobile
    const mobileInput = document.getElementById('mobile');
    mobileInput.addEventListener('input', () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, '');
    });

});