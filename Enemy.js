import { isOutsideCanvas, isCircleAndRectColliding } from "./utility.js";
import { Entity, Position, Velocity } from "./entity.js";
import { width, height } from "./game.js";
import { addsImageToCanvas } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 10;
    this.color = "white";
    this.velocity = velocity;
    //for keeping track of collision time
    this.timeOfCollision = 0;
  }
  draw(game, ctx) {
    this.appearence(game, ctx);
    addsImageToCanvas(
      ctx,
      "asteroid",
      new Position(this.position.x - 20, this.position.y - 20)
    );
  }
  appearence(game, ctx) {
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
    game.player1.position = new Position(width / 2 - 50 * 2, height + 50);
  }

  resetPositionOfPlayer2(game) {
    /*  if (game.player2.position.y !== height - 100) {
      game.player2.position.y += game.player1.velocity.dy * game.deltaTime;
    } */
    //if the player instead should reset to starting position on collision with enemy, run line below
    game.player2.position = new Position(width / 2 + 70, height + 50);
  }
}
