//Creamos nu Engine de física (Matter.js)
var Engine = Matter.Engine,
    //Render = Matter.Render,
    //Creamos el mundo
    World = Matter.World,
    //Creamos los bodies ( array )
    Bodies = Matter.Bodies;

//Lista de variables
var engine;
var box;
var boxes = [];
var items = [];
var itemsY = [];
var world;
var elements = [];
var factorIncremento = 1;
var scroll = 0;
var scrollTotal = 0;
var kickstart = false;
var isGameOver;
var meshi;
var leftJump;
var rightJump;
var floor;
var food;
//var sky;
var bg;
var bgi;
var amp;
var sushiBar;
var mybird;
var score;
var sounds = [];
var lose;
var soundLeft;
var soundRight;
var a;


function preload() {
    // Load PNG, GIF.
    //meshi = loadGif('data/test.gif');
    meshi = loadAnimation("data/comp/standby1.png", "data/comp/standby17.png");
    floor = loadImage("data/base.png");
    leftJump = loadAnimation("data/leftSprite/leftSprite0.png", "data/leftSprite/leftSprite9.png");
    rightJump = loadAnimation("data/rightSprite/rightSprite0.png", "data/rightSprite/rightSprite9.png");
    lose = loadSound("audio/lose.mp3");
    soundLeft = loadSound("audio/left.mp3");
    soundRight = loadSound("audio/right.mp3");
    for (var i = 1; i < 8; i++) {
        var path = "audio/t" + i + ".mp3";
        sounds.push(loadSound(path));
    }
}

function setup() {
  //MUSICA
    //Termina MUSICA

   alert("WELLCOME TO SUSHIMESS");
   alert("TAP LEFT TO JUMP LEFT");
   alert("TAP RIGHT TO JUMP RIGHT");
   alert("START!");

    amp = new p5.Amplitude();
    sounds[1].loop();
    sounds[2].loop();
    sounds[1].setVolume(0.4);
    sounds[2].setVolume(0.4);

    sounds[1].addCue(5.3,soundPack1);
    sounds[2].addCue(10.6,soundPack2);
    isGameOver = false;
    score = 0;
    createCanvas(window.innerWidth, 580);
    canvas.style = "position:fixed; left: 0%; width: 100%;";
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    reseSketch();
    bgi = loadImage("data/retrato.png");

    bg = loadImage("data/fondo.png");

    sushiBar = loadImage("data/frontbar.png");
    var options = {
        friction: 8,
        restitution: 0,
        isStatic: true
    }
    var acciones = {
        isStatic: true
    }

    //Plataformas para saltar
    barra1 = Bodies.rectangle(300, 450, 100, 15, options);
    barra1.width = 100;
    barra1.height = 15;
    barra2 = Bodies.rectangle(100, 350, 100, 15, options);
    barra2.width = 100;
    barra2.height = 15;
    barra3 = Bodies.rectangle(300, 250, 100, 15, options);
    barra3.width = 100;
    barra3.height = 15;
    barra4 = Bodies.rectangle(200, 100, 100, 15, options);
    barra4.width = 100;
    barra4.height = 15;

    barra5 = Bodies.rectangle(0, 0, 100, 15, options);
    barra5.width = 100;
    barra5.height = 15;

    barra6 = Bodies.rectangle(375, 0, 100, 15, options);
    barra6.width = 100;
    barra6.height = 15;

    sky = Bodies.rectangle(width / 2, 0, width, 50, {
        isStatic: true
    });
    sky.width = width;
    sky.height = 15;
    World.add(world, sky);

    ground = Bodies.rectangle(190, height, width, 100, options);
    ground.width = width;
    ground.height = 100;

    wallLeft = Bodies.rectangle(0, 0, 20, 90000, options);
    wallLeft.width = 20;
    wallLeft.height = 15000;
    wallRight = Bodies.rectangle(width, 0, 20, 90000, options);
    wallRight.width = 20;
    wallRight.height = 15000;

    elements.push(barra6);
    elements.push(barra5);
    elements.push(barra4);
    elements.push(barra3);
    elements.push(barra2);
    elements.push(barra1);
    elements.push(ground);
    //elements.push(sky);
    elements.push(wallLeft);
    elements.push(wallRight);
    World.add(world, elements);
    box = new Box(160, 509, 50, 100);
}

$(document).ready(function() {

    $('#left').on('touchstart', function() {
        kickstart = true;
        var posX = box.body.position.x;
        var posY = box.body.position.y;

        Matter.Body.applyForce(box.body, {
            x: posX,
            y: posY
        }, {
            x: -0.05,
            y: -0.1
        });
        soundLeft.setVolume(0.1);
        soundLeft.play();


    });

    $('#right').on('touchstart', function() {
        kickstart = true;

        var posX = box.body.position.x;
        var posY = box.body.position.y;
        Matter.Body.applyForce(box.body, {
            x: posX,
            y: posY
        }, {
            x: 0.05,
            y: -0.1
        });
        soundRight.setVolume(0.1);
        soundRight.play();


    });

}); //documentready

//reset NO BORRAR
function reseSketch() {}
///fin reset

function soundPack1(){
  sounds[4].loop();
  sounds[4].setVolume(0.4);
  sounds[5].loop();
  sounds[5].setVolume(0.4);
}

function soundPack2(){


  sounds[3].loop();
  sounds[3].setVolume(0.4);
  sounds[6].loop();
  sounds[6].setVolume(0.4);

}

function death(){
  if (box.offScreen()) {

      box.removeFromWorld();


      sounds[4].stop();
      sounds[5].stop();
      sounds[6].stop();
      lose.play();
      lose.setVolume(0.4);
      lose.stop();
      fill(0);
      rectMode(CORNERS);
      rect(0, 0, window.innerWidth, window.innerHeight);
      fill(211, 211, 211);
      textSize(40);
      textFont('Helvetica');
      textStyle(BOLD);
      text("Game Over!", 80, 300);
      textSize(20);
      text(("Score: " + a), 60, 350);
      setTimeout(function() {
          window.location.assign("index.html");
      }, 4500);
      console.log("game over");
  }


}

//Plataformas para saltar
function draw() {

    score = score + 1;
    box.body.angle = 0;
    background(bg);

//MUSICA e imagen
    push();
    var vol = amp.getLevel();
    var diam = map(vol, 0, 0.4, 1, 10);
    image(bgi, 0, 0 - diam, bgi.width / 2, bgi.height / 2 - diam );
    pop();
// termina MUSICA
    vel = box.body.velocity.x;
    push();
    if (vel < -.6) {
        animation(leftJump, box.body.position.x - 120, box.body.position.y + 20, 10, 10);
    } else if (vel > .6) {
        animation(rightJump, box.body.position.x - 30, box.body.position.y + 20, 10, 10);
    } else {

        animation(meshi, box.body.position.x - 4, box.body.position.y - 45, 10, 10);

    }
    pop();

    box.show();

    ///Eliminar cosas del espacio
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
        if (boxes[i].offScreen()) {
            boxes.splice(i, 1);
            i--;
        }
    }
    //Scroll de toda la hoja
    screenScroll();
    noStroke(0);
    fill(105, 1, 105);
    //Plataformas para saltar
    rectMode(CENTER);
    fill(255);
    for (var i = 0; i < elements.length; i++) {
        rect(elements[i].position.x, elements[i].position.y, elements[i].width, elements[i].height);
    }


    for (var i = 0; i < elements.length; i++) {
        rectMode(CORNERS);
        image(floor, elements[i].position.x - 55, elements[i].position.y - 60, 110, 110);
    }
    image(sushiBar, -12, -727);

    //console.log( box.body.velocity.x );
}

function screenScroll() {
    //console.log( scroll );
    //sky.position.y = scroll;
    for( var a = 0; a < items.length; a++ ){
      items[ a ].show( scrollTotal );
      if( dist( box.body.position.x, box.body.position.y, items[ a ].x, items[ a ].y ) < 50 ){
        items.splice(a, 1);

        var puntos = (a);
          console.log( "me comí: " + a );
      }

    }

    if (kickstart == true) {
        for (var i = 0; i < elements.length; i++) {
            Matter.Body.translate(elements[i], {
                x: 0,
                y: factorIncremento
            });
        }
        scroll += factorIncremento;
        scrollTotal += factorIncremento;
        //
        if (scroll >= 150) {
            scroll = 0;
            var options = {
                friction: 10,
                restitution: 0,
                isStatic: true
            }
            var cajita = (Math.random() * width);

            var barra = Bodies.rectangle(cajita, 0, 100, 15, options);
            barra.width = 100;
            barra.height = 15;
            elements.push(barra);
            World.add(world, barra);

            //comida
          //console.log( "box: " + Item + ", " + Item );
            var randomItem = Math.round(Math.random()*3);
              items.push( new Item(cajita, -30, 30, 30, scrollTotal ) );

        }

         death();
    }
}
