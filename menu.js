import { Entity } from "./entity.js";
import { height, width } from "./game.js";

export class Menu extends Entity {
    constructor(position) {
    super(position);
    this.color = "black";
    this.width = width;
    this.height = height;
    this.enterIsPressed = false;
    }
    // "e.g. Controls: Player 1: W = Move up, S = Move down, Q = Shoot projectile"
    draw(game, ctx) {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        //TITLE
        ctx.font = "70px serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("S P A C E 🚀 R A C E" , width / 2, height / 2 /3);
 
        //INSTRUCTION
        ctx.font = "50px Monospace";
        ctx.fillText("Controls" , width / 2, height / 2 /3 + 150);
       
        ctx.font = "40px Monospace";
        ctx.textAlign = "left";
        ctx.fillText("Player ❶", width / 2 / 4 + 50, height / 2 - 50);
        ctx.font = "30px Monospace";
        ctx.fillText("W: Move up", width / 2 / 4 + 50, height / 2);
        ctx.fillText("S: Move down", width / 2 / 4 + 50, height / 2 + 40);
        ctx.fillText("Q: Shoot", width / 2 / 4 + 50, height / 2  + 80);
        
        
        ctx.font = "40px Monospace";
        ctx.fillText("Player ❷", width / 2 + width / 4 - 100, height / 2 - 50);
        ctx.font = "30px Monospace";
        ctx.fillText("O: Move up", width / 2 + width / 4 - 100, height / 2);
        ctx.fillText("L: Move down", width / 2 + width / 4 - 100,height / 2 + 40);
        ctx.fillText("P: Shoot", width / 2 + width / 4 - 100, height / 2  + 80);
        //PROMPT (Press enter)
        ctx.textAlign = "center";
        ctx.font = "50px serif";
        ctx.fillText("Press ENTER to Start Game", width / 2, height - 100);
    }
    
    tick(game) {
        if (this.enterIsPressed) {
   this.isRemovedAndGameStarts(game);
        }
}
isRemovedAndGameStarts(game) {
        game.entities.splice(game.index, 1)
        game.start();
}
    }



    


    


    /*
object.onclick = function(){myScript};
In JavaScript, using the addEventListener() method:

object.addEventListener("click", myScript);

    */