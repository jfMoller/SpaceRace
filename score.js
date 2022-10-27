import { Entity } from "./entity.js";
import {ctx, height, width } from "./game.js";

export class Score extends Entity{
    constructor(position, subject, score){
        super(position)
        this.subject = subject;
        this.score = score;
    }

    draw(game, ctx) {
    ctx.font = "90px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.score , this.position.x, this.position.y);  
    }

    tick() {

    }
    
}


