import { WORDS } from "./consts";
import { KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoElem = document.getElementById("logo");
let triesLeft;
let winCounter;

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.alt = "hangman image";
  image.id = "hangmanImg";
  image.src = "/images/hg-0.png";
  image.classList.add("hangman-img");
  return image;
};

const createPlaceholders = () => {
  const wordToGuess = sessionStorage.getItem("word");
  const wordArray = Array.from(wordToGuess);

  const result = wordArray.reduce((acc, curr, i) => {
    return acc + `<p class="word-placeholder" id="letter_${i}"> _ </p>`;
  }, "");

  return `<div id="placeholders" class="placeholders-wrapper">${result}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr, i) => {
    return (
      acc +
      `<button class="primary-btn keyboard-btn" id="${curr}">${curr}</button>`
    );
  }, "");
  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();
  if (word.includes(inputLetter)) {
    const wordArr = Array.from(word);
    wordArr.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  } else {
    const triesCounter = document.getElementById("tries-counter");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;
    const image = document.getElementById("hangmanImg");
    image.src = `/images/hg-${10 - triesLeft}.png`;
  }
};

export const startGame = () => {
  triesLeft = 10;
  logoElem.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const word = WORDS[randomIndex];
  sessionStorage.setItem("word", word);

  gameDiv.innerHTML = createPlaceholders();

  gameDiv.innerHTML += `<p class="tries-left font-medium mt-5">TRIES LEFT: <span class="text-red-600 font-medium" id="tries-counter">10</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.target.disabled = true;
      checkLetter(e.target.id);
    }
  });
  gameDiv.appendChild(keyboardDiv);
  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);
};
