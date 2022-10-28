import { ctx, canvas, height, width } from "./game.js";
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
    this.velocity = new Velocity(5, 5);
    this.score = 0;
    this.shoot = false;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    //ctx.rect(100, 100, 40, 40);
    ctx.fillStyle = this.color;
    ctx.fill();
    //
  }
  tick(game) {
    if (this.keys.up && this.position.y > 0) {
      this.position.y -= this.velocity.dy;
    } // < 800 -100 = 700
    if (this.keys.down && this.position.y < height - this.height) {
      this.position.y += this.velocity.dy;
    }
    //om spelaren kommer hela vägen upp på canvas, score++
    if (game.player1.position.y === 0) {
      game.player1.score++;
      //game.player1.position = new Position(width / 4, height - 100);
      game.player1.position.x = width * 0.25 + 100;
      game.player1.position.y = height - 100;
    }

    if (game.player2.position.y === 0) {
      game.player2.score++;
      //game.player2.position = new Position((width * 3) / 4, height - 100)
      game.player2.position.x = width * 0.75 - 130;
      game.player2.position.y = height - 100;
    }
    //SHOOTING PLAYER1
    if (game.player1.keys.shoot) {
      game.entities.push(
        new Projectile(
          new Position(
            game.player1.position.x + this.width,
            game.player1.position.y + this.height / 2
          ),
          new Velocity(5, 0)
        )
      );
      game.player1.keys.shoot = false;
    }
    //SHOOTING PLAYER2
    if (game.player2.keys.shoot) {
      game.entities.push(
        new Projectile(
          new Position(
            game.player2.position.x,
            game.player2.position.y + this.height / 2
          ),
          new Velocity(-5, 0)
        )
      );
      game.player2.keys.shoot = false;
    }
  }
}
