import { Entity, Position} from "./entity.js";
import { height, width } from "./game.js";

class Screen {
    constructor() {
    this.start = false;
    this.restart = false;
    }
    }
export class Menu extends Entity {
    constructor(position, title, text) {
    super(position);
    this.color = "black";
    this.width = width;
    this.height = height;
    this.title = title;
    this.text = text;
    this.screen = new Screen()
    }
    
    draw(game, ctx) {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    
        //MENU TEXT
        ctx.font = "70px serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.title, width / 2, height / 2 /3);
        ctx.fillText(this.text, width / 2, height / 2);
    }
    tick(game) {
   
    if (this.screen.start) {
    game.entities.splice(game.index, 1)
    game.running = true;
    }
    if (game.running) {
        game.start();
    }

    if (this.screen.start && game.running === false) {
    game.entities.splice(game.index, 1)
    }

}
    }



    


    


    /*
object.onclick = function(){myScript};
In JavaScript, using the addEventListener() method:

object.addEventListener("click", myScript);

    */