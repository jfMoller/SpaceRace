
import { width, height} from "./game.js"

export function isColliding(circle, rect) {
  var distX = Math.abs(circle.position.x - rect.position.x - rect.width / 2);
  var distY = Math.abs(circle.position.y - rect.position.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.radius) {
    return false;
  }
  if (distY > rect.height / 2 + circle.radius) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.width / 2) {
    return true;
  }
  // also test for corner collisions
  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

export function isOutsideCanvas(circle) {
    //vänster
if (circle.position.x < - circle.radius) {
    return true;
}
    //höger
else if (circle.position.x > width + circle.radius) {
    return true;
    }
else { return false;}

/*
return (circle.position.x < - circle.radius) ||
  circle.position.x > width + circle.radius)

*/
}

export function showsScore(player, number, ctx) {
    ctx.font = "90px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(player.score , width * number, height * 0.90);
}