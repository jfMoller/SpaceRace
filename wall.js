import { Entity } from "./entity.js";
import { addsImageToCanvas } from "./utility.js";
import { Position } from "./entity.js";

export class Wall extends Entity {
  constructor(position) {
    super(position);
    this.width = 20;
    this.height = 200;
    this.color = "rgba(147, 250, 165, 0.0)";
  }

  draw(game, ctx) {
    addsImageToCanvas(ctx, "background", new Position(0, 0));
    this.appearance(ctx);
    addsImageToCanvas(ctx, "tower", new Position(this.position.x -10, this.position.y - 13));

  }
  appearance(ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  tick() {}
}
