import { ctx, game, height, width } from "./game.js";
import { handleKeyDown, handleKeyUp } from "./event.js";
import { Entity, Position} from "./entity.js";
import {Menu} from "./menu.js";


window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);


//introskärm - menu
game.entities.push(new Menu(new Position(0,0), "S P A C E 🚀 R A C E ", "Start Game"))
export let startMenu = game.entities[game.index];
//game over skärm