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
		winCounter += 1;
		if (winCounter === word.length) {
			stopGame('win')
			return
		}
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
	if (triesLeft === 0) {
		stopGame('lose');
	}
  }
};

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries-p").remove();
  document.getElementById("keyboard").remove();
  document.getElementById('quit').remove()

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangmanImg").src = "images/hg-win.png";

    document.getElementById("game").innerHTML +=
      `<h2 class="result-text win">You won</h2>`;

  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      `<h2 class="result-text lose">You lost</h2>`;

  } else if (status === "quit") {
	logoElem.classList.remove('logo-sm')
	document.getElementById('hangmanImg').remove()
  }
  
  document.getElementById("game").innerHTML +=
    `<p class="result-word-p">The word was <span class="word">${word}</span></p><button class="primary-btn px-5 py-2 mt-8" id="play-again">Play again</button>`;
	
	document.getElementById('play-again').onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCounter = 0;
  logoElem.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const word = WORDS[randomIndex];
  sessionStorage.setItem("word", word);

  gameDiv.innerHTML = createPlaceholders();

  gameDiv.innerHTML += `<p id="tries-p" class="tries-left font-medium mt-8">TRIES LEFT: <span class="text-red-600 font-medium" id="tries-counter">10</span></p>`;

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

  gameDiv.insertAdjacentHTML('beforeend', '<button class="quit-btn" id="quit">Quit</button>')
  document.getElementById('quit').onclick = () => {
	const isSure = confirm('Are you sure you want to quit and lose your progress')
	if (isSure) {
		stopGame('quit')
	}
  }
};
