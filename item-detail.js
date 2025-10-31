// item-detail.js

// === ITEMS ARRAY ===
const items = [
  {
    id: 1,
    title: "Mastering Study Skills",
    author: "Alice Nguyen",
    year: 2022,
    category: "Studyskills",
    image_url: "Images/ArticleImage.jpg"
  },
  {
    id: 2,
    title: "Budgeting Basics",
    author: "Ben Smith",
    year: 2023,
    category: "Budgeting",
    image_url: "Images/ArticleImage.jpg"
  },
  {
    id: 3,
    title: "Group Study Hacks",
    author: "Carla Jones",
    year: 2021,
    category: "Groups",
    image_url: "Images/ArticleImage.jpg"
  },
  {
    id: 4,
    title: "Fitness Fundamentals",
    author: "David Lee",
    year: 2023,
    category: "Fitness",
    image_url: "Images/ArticleImage.jpg"
  },
  {
    id: 5,
    title: "Cooking Made Easy",
    author: "Emma Watson",
    year: 2022,
    category: "Cooking",
    image_url: "Images/ArticleImage.jpg"
  },
  {
    id: 6,
    title: "Effective Note-Taking",
    author: "Frank Harris",
    year: 2021,
    category: "Studyskills",
    image_url: "Images/ArticleImage.jpg"
  }
];

// === TRANSLATIONS ===
const translations = {
  en: {
    "Author": "Author",
    "Year": "Year",
    "Category": "Category",
    "No items found.": "No items found.",
    "Mastering Study Skills": "Mastering Study Skills",
    "Budgeting Basics": "Budgeting Basics",
    "Group Study Hacks": "Group Study Hacks",
    "Fitness Fundamentals": "Fitness Fundamentals",
    "Cooking Made Easy": "Cooking Made Easy",
    "Effective Note-Taking": "Effective Note-Taking",
    "Studyskills": "Study Skills",
    "Budgeting": "Budgeting",
    "Groups": "Groups",
    "Fitness": "Fitness",
    "Cooking": "Cooking"
  },
  mi: {
    "Author": "Kaituhi",
    "Year": "Tau",
    "Category": "Kāwai",
    "No items found.": "Kāore he tuemi i kitea.",
    "Mastering Study Skills": "Te Whakaako i Ngā Pūnaha Akoranga",
    "Budgeting Basics": "Ngā Mātāpono Pūtea",
    "Group Study Hacks": "Ngā Tohutohu Akoranga Rōpū",
    "Fitness Fundamentals": "Ngā Mātāpono Whakapakari Tinana",
    "Cooking Made Easy": "Te Ngāwari o te Tunua Kai",
    "Effective Note-Taking": "Te Tuhituhi Kōrero Whaihua",
    "Studyskills": "Pūkenga Akoranga",
    "Budgeting": "Whakarite Pūtea",
    "Groups": "Rōpū",
    "Fitness": "Whakapakari Tinana",
    "Cooking": "Tunu Kai"
  },
  es: {
    "Author": "Autor",
    "Year": "Año",
    "Category": "Categoría",
    "No items found.": "No se encontraron artículos.",
    "Mastering Study Skills": "Dominar las Habilidades de Estudio",
    "Budgeting Basics": "Conceptos Básicos de Presupuesto",
    "Group Study Hacks": "Trucos para el Estudio en Grupo",
    "Fitness Fundamentals": "Fundamentos del Fitness",
    "Cooking Made Easy": "Cocinar Hecho Fácil",
    "Effective Note-Taking": "Toma de Notas Efectiva",
    "Studyskills": "Habilidades de Estudio",
    "Budgeting": "Presupuestación",
    "Groups": "Grupos",
    "Fitness": "Ejercicio",
    "Cooking": "Cocina"
  }
};

// === RENDER FUNCTION ===
function renderItems(filteredItems = items) {
  const container = document.getElementById("itemList");
  if (!container) return console.error("Container #itemList not found!");

  const selectedLang = localStorage.getItem("lang") || "en";
  const t = translations[selectedLang] || translations.en;

  if (filteredItems.length === 0) {
    container.innerHTML = `<p style='text-align:center; font-weight:bold;'>${t["No items found."]}</p>`;
    return;
  }

  container.innerHTML = "";
  filteredItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.title}" />
      <h3>${t[item.title] || item.title}</h3>
      <p><strong>${t["Author"]}:</strong> ${item.author}</p>
      <p><strong>${t["Year"]}:</strong> ${item.year}</p>
      <p><strong>${t["Category"]}:</strong> ${t[item.category] || item.category}</p>
    `;
    container.appendChild(card);
  });
}

// === SEARCH FUNCTION ===
function displayFilteredItems() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase();
  const filtered = items.filter(item => item.title.toLowerCase().includes(query));
  renderItems(filtered);
}

// === SORT FUNCTIONS ===
function sortByTitle() {
  const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title));
  renderItems(sorted);
}

function sortByAuthor() {
  const sorted = [...items].sort((a, b) => a.author.localeCompare(b.author));
  renderItems(sorted);
}

function sortByYear() {
  const sorted = [...items].sort((a, b) => a.year - b.year);
  renderItems(sorted);
}

// === FILTER BY TOPIC ===
function sortedByTopic() {
  const dropdown = document.getElementById("topicDropDown");
  if (!dropdown) return;
  const topic = dropdown.value;
  if (topic === "0") return renderItems(items);
  const filtered = items.filter(item => item.category === dropdown.options[dropdown.selectedIndex].text);
  renderItems(filtered);
}

// === LANGUAGE HANDLING ===
function initLanguageSupport() {
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.addEventListener("change", e => {
      localStorage.setItem("lang", e.target.value);
      renderItems();
    });
  }
}

// === INITIAL RENDER ===
document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  initLanguageSupport();
});
