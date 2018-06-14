function Item(x, y, w, h, scroll){
  this.w = w;
  this.h = h;
  this.x = x;
  this.y = y;
  this.scroll = scroll;
  //this.escrolleo = scroll;

  this.show = function( escrolleo ){

    push();
    //translate(x, escrolleo);
    this.y = y + (escrolleo - scroll);
    rectMode(CENTER);

    image(sushi1, x - 40, this.y - 65, w+63, h +50);



    pop();
 }
}
