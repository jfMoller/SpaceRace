export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const width = canvas.width;
export const height = canvas.height;

import { Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";
import { Enemy } from "./Enemy.js";
import { isColliding, isOutsideCanvas, showsScore } from "./utility.js";
/* import { spawnEnemies } from "./Enemy.js"; */

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.entities = [
      new Player(new Position(width / 4 + 100, height - 100)),
      new Player(new Position((width * 3) / 4 - 130, height - 100)),
      new Wall(new Position(width, height + 400)),

      //player2
      //enemies
      //wall
    ];
    this.player1 = this.entities[0];
    this.player2 = this.entities[1];
  }
  start() {
    tick();
  }
  spawnEnemies() {
    let randomDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    if (randomDirection === 0) {
      // ffrom left
      this.entities.push(
        new Enemy(
          new Position(0, Math.random() * 500),
          new Velocity(Math.random() * 3, 0)
        )
      );
    } else if (randomDirection === 1) {
      // from right
      this.entities.push(
        new Enemy(
          new Position(800, Math.random() * 500),
          new Velocity(Math.random() * -3, 0)
        )
      );
    }
  }
}
function enemyTimer() {
  // nya fiender varje 1 sekund från både sidorna
  game.spawnEnemies();
}
setInterval(enemyTimer, 1000); // 0,5 sek

export const game = new Game(canvas, ctx);
export let player1 = game.player1;
export let player2 = game.player2;

function tick() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    entity.draw(game);
    entity.tick(game);

    if (entity instanceof Enemy) {
      let enemy = entity;
      // 0  1 2 3
      if (isOutsideCanvas(enemy)) {
        game.entities.splice(i--, 1);
      }
      if (isColliding(enemy, player1)) {
        player1.position = new Position(width / 4, height - 100);
      } else if (isColliding(enemy, player2)) {
        player2.position = new Position((width * 3) / 4, height - 100);
      }
    }
    //scores
showsScore(player1, 0.25, ctx)
showsScore(player2, 0.75, ctx)
  }

  requestAnimationFrame(tick);
}

tick();
