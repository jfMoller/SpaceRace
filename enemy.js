import { isOutsideCanvas, isCircleAndRectColliding } from "./utility.js";
import { Entity, Position } from "./entity.js";
import { width, height } from "./game.js";
import { addsImageToCanvas } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 10;
    this.color = "white";
    this.velocity = velocity;
    //for keeping track of time of collision with players
    this.timeOfCollision = null;
  }

  draw(game, ctx) {
    this.hitBox(game, ctx);

    this.appearance(game, ctx);
  }

  hitBox(game, ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  appearance(game, ctx) {
    addsImageToCanvas(
      ctx,
      "asteroid",
      new Position(this.position.x - 20, this.position.y - 20)
    );
  }

  tick(game) {
    this.moves(game);

    if (isOutsideCanvas(this)) {
      this.isDeleted(game);
    }

    if (this.isCollidingWithPlayer(game)) {
      game.enemy = this;
    }
  }
  moves(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }

  isDeleted(game) {
    game.entities.splice(game.index--, 1);
  }
  isCollidingWithPlayer(game) {
    if (
      (this !== null && isCircleAndRectColliding(this, game.player1)) ||
      isCircleAndRectColliding(this, game.player2)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
