import { Entity, Position } from "./entity.js";
import { isCircleAndRectColliding, isOutsideCanvas } from "./utility.js";
import { width, height } from "./game.js";
import { addsImageToCanvas } from "./utility.js";

export class Projectile extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 10;
    this.color = "rgba(147, 250, 165, 0.0)";
    this.velocity = velocity;
  }
  draw(game, ctx) {
    this.appearance(ctx);
  
  if (this.velocity.dx === 600 ) {
  addsImageToCanvas(ctx, "laserBall", new Position(this.position.x - 20, this.position.y - 20));

}
else if (this.velocity.dx === - 600) {
  addsImageToCanvas(ctx, "laserBall2", new Position(this.position.x - 20, this.position.y - 20));
}
 
  }

  appearance(ctx) {
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
    game.player1.position = new Position(width / 2 - 50 * 2, height + 50);
  }

  resetPositionOfPlayer2(game) {
    game.player2.position = new Position(width / 2 + 70, height + 50);
  }
}
