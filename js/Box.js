function Box(x, y, w, h){
var options = {
friction: 0.3,
restitution:0.6,
frictionStatic:0
}
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.offScreen = function (){
	var pos = this.body.position;
	return (pos.y > height + 100)
}

this.removeFromWorld = function (){
	World.remove(world,this.body);

}


  this.show = function(){
    var pos = this.body.position;
    var angle =this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke(0);
    tint(255, 127);
    fill(255,9,70);



    rect(0, 0, this.w, this.h);
    pop();
 }
}
