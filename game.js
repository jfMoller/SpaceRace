import { Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";
import { Enemy } from "./Enemy.js";
import { Menu } from "./menu.js";
import { startMenu } from "./main.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const width = canvas.width;
export const height = canvas.height;

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.entities = [
      new Wall(new Position(width / 2, 600)),
      new Player(new Position(width / 2 - 50 * 2, height - 100)),
      new Player(new Position(width / 2 + 70, height - 100)),
    ];
    this.wall = this.entities[0];
    this.player1 = this.entities[1];
    this.player2 = this.entities[2];

    //ENEMY SETTINGS
    this.enemiesOn = true;
    this.enemiesSpawnRate = 800; //ms
    //TIME
    this.deltaTime = 0;
    this.tickTime = 0;
    //for handling index values when splicing in tick method of different classes
    this.index = 0;
    //GAME STATES FOR HANDLING MENU
    this.running = false;
    this.over = false;
  }

  start() {
    tick();
    if (this.enemiesOn) {
      setInterval(() => {
        this.spawnEnemies();
      }, this.enemiesSpawnRate);
    }
  }

  spawnEnemies() {
    let randomDirection = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    if (randomDirection === 0) {
      // from the left side
      this.entities.push(
        new Enemy(
          new Position(0, Math.random() * 500),
          new Velocity(Math.random() * 400, 0)
        )
      );
    } else if (randomDirection === 1) {
      // from the right side
      this.entities.push(
        new Enemy(
          new Position(800, Math.random() * 500),
          new Velocity(Math.random() * -400, 0)
        )
      );
    }
  }
}

export const game = new Game(canvas, ctx);

let lastTick = Date.now();

game.index;

function tick() {
  let currentTick = Date.now();

  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  game.tickTime += game.deltaTime; //game.totalTimePassed

  ctx.clearRect(0, 0, width, height);

  for (game.index = 0; game.index < game.entities.length; ++game.index) {
    let entity = game.entities[game.index];
    entity.draw(game, ctx);
    entity.tick(game);
  }
  //GAME OVER PROTOTYPE
  if (game.player1.score >= 1 && game.running) {
    game.entities.push(new Menu(new Position(0,0), "Player 1 won!", "Restart Game"))
    game.running = false;
    game.over = true;    
    }
    if (game.player2.score >= 1 && game.running) {
    game.entities.push(new Menu(new Position(0,0), "Player 2 won!", "Restart Game"))
    game.running = false;
    game.over = true;     
    }




  requestAnimationFrame(tick);
}

tick();
