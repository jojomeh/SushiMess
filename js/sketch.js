//Creamos nu Engine de física (Matter.js)
var Engine = Matter.Engine,
    //Render = Matter.Render,
    //Creamos el mundo
World = Matter.World,
    //Creamos los bodies ( array )
Bodies = Matter.Bodies;
var engine;
var box;
var boxes = [];
var world;
var elements = [];
var factorIncremento = 1;
var scroll = 0;
var kickstart = false;
var isGameOver;
var meshi;
var floor;
var bg;
var sushiBar;

var mybird;


function preload(){
  // load images
//meshi = loadGif('data/test.gif');
  meshi = loadAnimation("data/comp/standby1.png", "data/comp/standby17.png");
  floor = loadImage("data/base.png");
}

function setup() {
//Crear canvas
    isGameOver = false;
    createCanvas(window.innerWidth, 580);
    //left 35% width 800px margin-left: -200px;
    canvas.style = "position:fixed; left: 0%; width: 100%;";
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    reseSketch();
    bg = loadImage("data/fondo.png");
    sushiBar = loadImage("data/frontbar.png")
    var options = {
      friction: 8,
      restitution:0,
      isStatic: true
    }
    var acciones = {
        isStatic: true
    }

//Plataformas para saltar
    barra1  = Bodies.rectangle(300, 450, 100, 15, options);
    barra1.width = 100;
    barra1.height= 15;
    barra2 = Bodies.rectangle(100, 350, 100, 15, options);
    barra2.width = 100;
    barra2.height= 15;
    barra3 = Bodies.rectangle(300, 250, 100, 15, options);
    barra3.width = 100;
    barra3.height= 15;
    barra4 = Bodies.rectangle(200, 100, 100, 15, options);
    barra4.width = 100;
    barra4.height= 15;
    /*barra5 = Bodies.rectangle(600, 290, 200, 15, options);
    barra5.width = 200;
    barra5.height= 15;*/
    ground = Bodies.rectangle(190, height, width, 100, options);
    ground.width = width;
    ground.height= 100;
    wallLeft = Bodies.rectangle(0, 0, 20, 9000 ,options);
    wallLeft.width = 20;
    wallLeft.height= 15000;
    wallRight = Bodies.rectangle(width, 0, 20, 9000 ,options);
    wallRight.width = 20;
    wallRight.height= 15000;

    //elements.push(barra5);
    elements.push(barra2);
    elements.push(barra3);
    elements.push(barra4);
    elements.push(barra1);
    elements.push(ground);
    elements.push(wallLeft);
    elements.push(wallRight);
    World.add(world, elements);
    box = new Box(160, 509, 50, 100 );
}


$( document ).ready( function(){

  $('#top').on( 'touchstart', function(){

    var posX = box.body.position.x;
    var posY = box.body.position.y;
    Matter.Body.applyForce(box.body, { x:posX , y:posY }, { x: 0, y: -0.1});
  });

  $('#left').on( 'touchstart', function(){
    kickstart = true;
    var posX = box.body.position.x;
    var posY = box.body.position.y;
    Matter.Body.applyForce(box.body, { x: posX, y: posY }, { x: -0.05, y:-0.1 });
  });

  $('#right').on( 'touchstart', function(){
    kickstart = true;
    var posX = box.body.position.x;
    var posY = box.body.position.y;
    Matter.Body.applyForce(box.body, { x: posX, y: posY }, { x: 0.05, y:-0.1});
  });

});//documentready

//reset
function reseSketch(){
}
///fin reset

//Plataformas para saltar
function draw() {
      box.body.angle = 0;
      background(bg);
    //console.log( box.body.position.y );

    box.show();
    push();
    scale(0.5);
    animation(meshi,box.body.position.x +150, box.body.position.y +390, 10, 10);
    pop();


///Eliminar cosas del espacio
for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
    if (boxes[i].offScreen()){

      boxes.splice(i, 1);
      i--;
    }
}
///


//Scroll de toda la hoja
  screenScroll();
    noStroke(0);
    fill(105,1,105);
//Plataformas para saltar
    rectMode(CENTER);

    for( var i = 0; i < elements.length; i++ ){
      rect( elements[ i ].position.x, elements[ i ].position.y, elements[ i ].width, elements[ i ].height );    }

    if( box.offScreen()){
      box.removeFromWorld();
      fill(0);
      rectMode(CORNERS);
      rect(0,0,window.innerWidth,window.innerHeight);
      fill(211,211,211);
      text("Game Over!", 22, 200);
      textSize(60);
      setTimeout( function(){
        window.location.assign("index.html");
      }, 2000);
      console.log("game over");
    }
for( var i = 0; i < elements.length; i++ ){
  rectMode( CORNERS )
  image(floor, elements[i].position.x - 55, elements[i].position.y - 60, 110, 110);
      }
      image(sushiBar, -100, -145);
}


function screenScroll(){
  if( kickstart == true ){
  for( var i = 0; i < elements.length; i++ ){
    Matter.Body.translate(elements[i], {x:0, y:factorIncremento});
  }
    scroll += factorIncremento;
    if( scroll >= 150 ){
      scroll = 0;
      var options = {
        friction: 10,
        restitution:0,
        isStatic: true
      }
      var barra = Bodies.rectangle( Math.random() * width,  0, 100, 15 ,options);
      barra.width = 100;
      barra.height = 15;
      elements.push(barra);
      World.add( world, barra );
    }
  }
}
