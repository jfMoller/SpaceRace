import { ctx, canvas, height, width, player1, player2 } from "./game.js";
import { Entity, Velocity } from "./entity.js";

class Keys {
  constructor() {
    this.up = false;
    this.down = false;
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
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    //ctx.rect(100, 100, 40, 40);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  tick() {
    if (this.keys.up && this.position.y > 0) {
      this.position.y -= this.velocity.dy;
    } // < 800 -100 = 700
    if (this.keys.down && this.position.y < height - this.height) {
      this.position.y += this.velocity.dy;
    }
    //om spelaren kommer hela vägen upp på canvas, score++
    if (player1.position.y === 0) {
      player1.score++;
      //player1.position = new Position(width / 4, height - 100);
      player1.position.x = width * 0.25 + 100;
      player1.position.y = height - 100;
    }

    if (player2.position.y === 0) {
      player2.score++;
      //player2.position = new Position((width * 3) / 4, height - 100)
      player2.position.x = width * 0.75 - 130;
      player2.position.y = height - 100;
    }
   
    //console.log(this.score)
  }
}
