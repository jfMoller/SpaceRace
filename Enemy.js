import { isOutsideCanvas, isCircleAndRectColliding } from "./utility.js";
import { Entity, Position, Velocity } from "./entity.js";
import { width, height } from "./game.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 10;
    this.color = "white";
    this.velocity = velocity;
  }
  draw(game, ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  tick(game) {
    this.moves(game);

    if (isOutsideCanvas(this)) {
      this.isDeleted(game);
    }

    if (isCircleAndRectColliding(this, game.player1)) {
      this.resetPositionOfPlayer1(game);
    }
    if (isCircleAndRectColliding(this, game.player2)) {
      this.resetPositionOfPlayer2(game);
    }
  }
  moves(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }
  isDeleted(game) {
    game.entities.splice(game.index--, 1);
  }

  resetPositionOfPlayer1(game) {
    game.player1.position = new Position(width / 2 - 50 * 2, height - 100);
  }

  resetPositionOfPlayer2(game) {
    game.player2.position = new Position(width / 2 + 70, height - 100);
  }
}
