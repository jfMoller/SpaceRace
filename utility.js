
import { width, height} from "./game.js"

export function isCircleAndRectColliding(circle, rect) {
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
}


export function isCircleAndCircleColliding(circle1, circle2) {

let distance = Math.sqrt(
Math.pow( circle1.position.x - circle2.position.x, 2) 
+
Math.pow( circle1.position.y - circle2.position.y, 2) 
)
if (distance < circle1.radius + circle2.radius) {
  return true;
}
else {return false;}

 /*  let dx = circle1.position.x - circle2.position.x;
  let dy = circle1.position.y - circle2.position.y;
  let distance = Math.sqrt((dx * dx) + (dy * dy));

  if (distance < circle1.radius + circle2.radius) {
    return true;
  }
  else { return false;} */
}