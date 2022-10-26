
import {Entity, Position, Velocity} from "./entity.js";
import {ctx, game, height, width } from "./game.js";

export class Enemy extends Entity{
    constructor(position, velocity){
        super(position);
        this.radius = 10;
        this.color = "white";
        this.velocity = velocity;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    tick() {
     this.position.x += this.velocity.dx;   
     this.position.y += this.velocity.dy;   
    }
}