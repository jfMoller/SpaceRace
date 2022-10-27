import { Entity, Position, Velocity } from "./entity.js";
import {ctx, player1 } from "./game.js";
import { Enemy } from "./enemy.js"

class Cannonball extends Entity {
    constructor(position, velocity){
        super(position);
        this.radius = 10;
        this.color = "yellow";
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

export class Cannon extends Entity {
    constructor(position) {
    super(position)
    this.radius = 15;
    this.color = "red"
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    tick(game) {
        this.position.x = game.player1.position.x + game.player1.width / 2;
        this.position.y = game.player1.position.y + game.player1.height / 2;

        //We need to fire only ONE cannonball
        for (let i = 0; i < game.entities.length; ++i) {
            let entity = game.entities[i];
            if (game.player1.keys.shoot && entity instanceof Cannonball === false) {
                game.entities.push(new Cannonball(new Position(this.position.x, this.position.y), 
                new Velocity(5, 0)))
        }

      /*   if (game.player1.keys.shoot) {
        
            game.entities.push(new Cannonball(new Position(this.position.x, this.position.y), 
            new Velocity(5, 0)))
    
            
        } */
    }
            }
    }

