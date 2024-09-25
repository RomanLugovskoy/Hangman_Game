import { LANGUAGES } from "./consts";

export const darkModeHandle = () => {
  const darkModeSwitcher = document.getElementById("toggleDarkMode");
  const htmlElement = document.documentElement;

  if (localStorage.getItem("mode") === "dark") {
    htmlElement.classList.add("dark");
    darkModeSwitcher.checked = true;
  }

  darkModeSwitcher.addEventListener("input", () => {
    htmlElement.classList.toggle("dark");

    if (htmlElement.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });
};

export function normalizeWord(word) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const languageHandle = () => {
  const dropContent = document.getElementById("dropdownContent");
  const logoElem = document.getElementById("logo");
  const startGameBtn = document.getElementById("startGame");
  const darkModeText = document.getElementById("darkModeText");
  const dropImg = document.getElementById("dropImg");

  let currLang = localStorage.getItem("language");

  if (!currLang) {
    currLang = "en";
    localStorage.setItem("language", "en");
  }
  if (dropImg) {
    dropImg.src = `images/${currLang}.svg`;
  }
  if (logoElem) {
    logoElem.textContent = LANGUAGES[currLang].logo;
  }

  if (startGameBtn) {
    startGameBtn.textContent = LANGUAGES[currLang].start;
  }

  if (darkModeText) {
    darkModeText.textContent = LANGUAGES[currLang].mode;
  }

  if (dropContent) {
    dropContent.addEventListener("click", (e) => {
      const targetLink = e.target.closest("a");
      if (targetLink) {
        const selectedLang = targetLink.id;
        localStorage.setItem("language", selectedLang);
        window.location.reload();
      }
    });
  }
};
