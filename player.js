
import { height, width } from "./game.js";
import { Entity, Velocity, Position } from "./entity.js";
import { Projectile } from "./projectile.js";

class Keys {
  constructor() {
    this.up = false;
    this.down = false;
    this.shoot1 = false;
    this.shoot2 = false;
  }
}
export class Player extends Entity {
  constructor(position) {
    super(position);
    this.color = "white";
    this.width = 50;
    this.height = 100;
    this.keys = new Keys();
    this.velocity = new Velocity(700, 700);
    this.score = 0;
    this.shoot = false;

    this.player1TickTime = 0;
    this.Player2TickTime = 0;

    this.player1ShotReady = true;
    this.player2ShotReady = true;
  }

  draw(game, ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();

    //PLAYER SCORE PROTOTYPE
    ctx.font = "90px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (this.position.x < width / 2) {
      ctx.fillText(this.score, this.position.x - this.width, height * 0.9);
    } else {
      ctx.fillText(this.score, this.position.x + this.width * 2, height * 0.9);
    }

    //PLAYER RELOAD STATUS PROTOTYPE
    ctx.font = "40px serif";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (this.position.x < width / 2) {
      ctx.fillText(
        this.player1ShotReady,
        this.position.x - this.width,
        height * 0.83
      );
    } else {
      ctx.fillText(
        this.player2ShotReady,
        this.position.x + this.width * 2,
        height * 0.83
      );
    }
  }
  tick(game) {
    if (this.keys.up && this.position.y > 0) {
      this.position.y -= this.velocity.dy * game.deltaTime;
    } // < 800 -100 = 700
    if (this.keys.down && this.position.y < height - this.height) {
      this.position.y += this.velocity.dy * game.deltaTime;
    }
    //om spelaren kommer hela vägen upp på canvas, score++

    if (game.player1.position.y <= 0) {
      game.player1.score++;
      //game.player1.position = new Position(width / 4, height - 100);
      game.player1.position = new Position(width / 2 - 50 * 2, height - 100);
    }

    if (game.player2.position.y <= 0) {
      game.player2.score++;
      //game.player2.position = new Position((width * 3) / 4, height - 100)
      game.player2.position = new Position(width / 2 + 70, height - 100);
    }
    //SHOOTING AND RELOADING PLAYER1

    if (this.keys.shoot1 && this.player1ShotReady === false) {
      console.log("Can't shoot yet; reloading");
      this.keys.shoot1 = false;
    }

    if (this.keys.shoot1 && this.player1ShotReady) {
      this.player1TickTime = game.tickTime;
      game.entities.push(
        new Projectile(
          new Position(
            game.player1.position.x + this.width + 8,
            game.player1.position.y + this.height / 2
          ),
          new Velocity(300, 0)
        )
      );
      this.keys.shoot1 = false;
      this.player1ShotReady = false;
      console.log(this.player1TickTime);
    }
    if (game.tickTime - this.player1TickTime >= 3) {
      this.player1ShotReady = true;
    }

    //SHOOTING AND RELOADING PLAYER2
    if (this.keys.shoot2 && this.player2ShotReady === false) {
      console.log("Can't shoot yet; reloading");
      this.keys.shoot2 = false;
    }

    if (this.keys.shoot2 && this.player2ShotReady) {
      this.player2TickTime = game.tickTime;
      game.entities.push(
        new Projectile(
          new Position(
            game.player2.position.x - 8,
            game.player2.position.y + this.height / 2
          ),
          new Velocity(-300, 0)
        )
      );
      this.keys.shoot2 = false;
      this.player2ShotReady = false;
      console.log(this.player2TickTime);
    }
    if (game.tickTime - this.player2TickTime >= 3) {
      this.player2ShotReady = true;
    }
  }
}
