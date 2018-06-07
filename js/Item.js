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
    fill(255,9,70);
    ellipse( x, this.y, w, h );
    pop();
 }
}
