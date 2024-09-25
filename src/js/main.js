import "../css/style.css";
import { darkModeHandle, languageHandle } from "./utils";
import { startGame } from "./game";
import { LANGUAGES } from "./consts";

darkModeHandle();
languageHandle();

const startGameButton = document.getElementById("startGame");
startGameButton.addEventListener("click", startGame);
