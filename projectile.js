import { Entity } from "./entity.js";

export class Projectile extends Entity {
    constructor(position, velocity){
        super(position);
        this.radius = 10;
        this.color = "yellow";
        this.velocity = velocity;
    }
    draw(game, ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    tick(game) {
     this.position.x += this.velocity.dx * game.deltaTime;;   
     this.position.y += this.velocity.dy * game.deltaTime;;   
    }
}
