import { WORDS } from "./consts"
import { KEYBOARD_LETTERS } from "./consts"

const gameDiv = document.getElementById('game')
const createPlaceholders = () => {
	const wordToGuess = sessionStorage.getItem('word')
	const wordArray = Array.from(wordToGuess)

	const result = wordArray.reduce((acc, curr, i) => {
	return acc + `<p class="word-placeholder" id="letter_${i}"> _ </p>`
	}, '')

	return `<div id="placeholders" class="placeholders-wrapper">${result}</div>`
}

export const startGame = () => {
	const randomIndex = Math.floor(Math.random() * WORDS.length)
	const word = WORDS[randomIndex];
	sessionStorage.setItem('word', word);
	gameDiv.innerHTML = createPlaceholders()
}

// console.log(KEYBOARD_LETTERS);