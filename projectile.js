import { Entity, Position } from "./entity.js";
import { isCircleAndRectColliding, isOutsideCanvas } from "./utility.js";
import { width, height } from "./game.js";

export class Projectile extends Entity {
  constructor(position, velocity, owner) {
    super(position);
    this.radius = 10;
    this.color = "yellow";
    this.velocity = velocity;
    this.owner = owner;
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
      this.isDeleted(game);
      this.resetPositionOfPlayer1(game);
    }

    if (isCircleAndRectColliding(this, game.player2)) {
      this.isDeleted(game);
      this.resetPositionOfPlayer2(game);
    }

    if (isCircleAndRectColliding(this, game.wall)) {
      this.isDeleted(game);

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
