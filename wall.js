import { Entity } from "./entity.js";

export class Wall extends Entity {
  constructor(position) {
    super(position);
    this.width = 20;
    this.height = 200;
    this.color = "white";
  }

  draw(game, ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  tick() {}
}
