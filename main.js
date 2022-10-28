import { game } from "./game.js";
import { handleKeyDown, handleKeyUp } from "./event.js";


window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);



//introskärm - menu

//starta spelet
game.start();

//game over skärm
