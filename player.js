import { height, width } from "./game.js";
import { Entity, Velocity, Position } from "./entity.js";
import { Projectile } from "./projectile.js";

class Keys {
  constructor() {
    this.up = false;
    this.down = false;
    this.shoot = false;
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

    this.timeOfShotFired = 0;
    this.shotReady = true;
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
      ctx.fillText(this.shotReady, this.position.x - this.width, height * 0.83);
    } else {
      ctx.fillText(
        this.shotReady,
        this.position.x + this.width * 2,
        height * 0.83
      );
    }
  }
  tick(game) {
    this.movesDown(game);
    this.movesUp(game);

    //om spelaren kommer hela vägen upp på canvas, score++
    this.player1ScoresAndResetsPosition(game);
    this.player2ScoresAndResetsPosition(game);

    this.shootsAndReloads(game);
  }

  movesUp(game) {
    if (this.keys.up && this.position.y > 0) {
      this.position.y -= this.velocity.dy * game.deltaTime;
    }
  }

  movesDown(game) {
    if (this.keys.down && this.position.y < height - this.height) {
      this.position.y += this.velocity.dy * game.deltaTime;
    }
  }

  player1ScoresAndResetsPosition(game) {
    if (game.player1.position.y <= 0) {
      game.player1.score++;
      game.player1.position = new Position(width / 2 - 50 * 2, height - 100);
    }
  }

  player2ScoresAndResetsPosition(game) {
    if (game.player2.position.y <= 0) {
      game.player2.score++;
      game.player2.position = new Position(width / 2 + 70, height - 100);
    }
  }
  shootsAndReloads(game) {
    //SHOOTING AND RELOADING FOR PLAYERS

    //if a player tries to shoot, but the shot is not ready
    if (this.keys.shoot && this.shotReady === false) {
      this.keys.shoot = false;
    }
    //if player shoots, and shot is ready
    if (this.keys.shoot && this.shotReady) {
      //creates a time value of WHEN the player shoots
      this.timeOfShotFired = game.tickTime;
      //PLAYER1; if the player is on the left side of the screen, the projectile will travel to the right
      if (this.position.x < width / 2) {
        // game.player1.position
        game.entities.push(
          new Projectile(
            new Position(
              this.position.x + this.width + 8,
              this.position.y + this.height / 2
            ),
            new Velocity(300, 0),
            game.player1
          )
        );
      }
      //PLAYER2; if the player is on the right side of the screen, the projectile will travel left
      else {
        game.entities.push(
          new Projectile(
            new Position(
              this.position.x - 8,
              this.position.y + this.height / 2
            ),
            new Velocity(-300, 0),
            game.player2
          )
        );
      }
      //when the projectile has been shot, the shot is not ready anymore
      this.shotReady = false;
    }
    /* in words: if the (total amount of time that HAS elapsed in the game 
          - the time that HAD elapsed in the game when the player shot) is more than 3 seconds,
          THEN the shot will be ready again.
          practial example: total amount of time elapsed in the game = 10 sec, time when the player shot = 10 sec
          10 sec - 10 sec = 0, -> NOT READY to shoot again
          11 sec - 10 sec = 1 -> NOT READY to shoot again
          12 sec - 10 sec = 2 -> NOT READY to shoot again
          13 sec - 10 sec = 3 -> READY to shoot again */
    if (game.tickTime - this.timeOfShotFired >= 3) {
      this.shotReady = true;
    }
  }
}
