export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const width = canvas.width;
export const height = canvas.height;

import { Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";
import { Enemy } from "./Enemy.js";
import { isColliding, isOutsideCanvas, showsScore } from "./utility.js";
import { Projectile } from "./projectile.js";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.entities = [
      new Wall(new Position(width, height * 1.5)),
      new Player(new Position(width / 2 - 50 * 2, height - 100)),
      new Player(new Position(width / 2 + 70, height - 100)),
    ];
    this.wall = this.entities[0];
    this.player1 = this.entities[1];
    this.player2 = this.entities[2];
    //ENEMY SETTINGS
    this.enemiesOn = true;
    this.enemiesSpawnRate = 1000; //ms
  }
  start() {
    tick();
    /*     if (this.enemiesOn) {
      setInterval(() => {
        this.spawnEnemies();
      }, this.enemiesSpawnRate);
    } */
  }
  spawnEnemies() {
    let randomDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    if (randomDirection === 0) {
      // from the left side
      this.entities.push(
        new Enemy(
          new Position(0, Math.random() * 500),
          new Velocity(Math.random() * 3, 0)
        )
      );
    } else if (randomDirection === 1) {
      // from the right side
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
setInterval(enemyTimer, 1000); // ms

export const game = new Game(canvas, ctx);

function tick() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    entity.draw(game, ctx);
    entity.tick(game);

    //COLLISION FOR ENEMY
    if (entity instanceof Enemy) {
      let enemy = entity;

      if (isOutsideCanvas(enemy)) {
        game.entities.splice(i--, 1);
      }
      if (isColliding(enemy, game.player1)) {
        game.player1.position = new Position(width / 2 - 50 * 2, height - 100);
      } else if (isColliding(enemy, game.player2)) {
        game.player2.position = new Position(width / 2 + 70, height - 100);
      }
    }
    //COLLISION FOR PROJECTILE
    if (entity instanceof Projectile) {
      let projectile = entity;
      if (isOutsideCanvas(projectile)) {
        game.entities.splice(i--, 1);
      }
    }
    //PLAYER SCORE PROTOTYPE
    showsScore(game.player1, ctx);
    showsScore(game.player2, ctx);
  }

  requestAnimationFrame(tick);
}

tick();
