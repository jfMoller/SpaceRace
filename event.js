import { player1, player2 } from "./game.js";

export function handleKeyDown(event) {
  if (event.repeat) return;

  if (event.key === "w") {
    player1.keys.up = true;
  } else if (event.key === "s") {
    player1.keys.down = true;
  }

  if (event.key === "o") {
    player2.keys.up = true;
  } else if (event.key === "l") {
    player2.keys.down = true;
  }
}

export function handleKeyUp(event) {
  if (event.repeat) return;
  else if (event.key === "w") {
    player1.keys.up = false;
  } else if (event.key === "s") {
    player1.keys.down = false;

  }

  if (event.key === "o") {
    player2.keys.up = false;
  } else if (event.key === "l") {
    player2.keys.down = false;
  }
}
