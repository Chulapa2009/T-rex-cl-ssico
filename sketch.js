var dinossaurao;
var dinoImg;
var edges;
var chao;
var chaoImg;
var chaoFake;
var nuvem;
var nuvemImg;
var cacto;
var PLAY = 1;
var GAMEOVER = 2;
var gamestate = PLAY;
var cactos;
var nuvens;
var loser;
var gamerover;
var restart;
var gameoverImg;
var restartImg;
var score = 0;
var somjump;
var somdie;
var somcheck;
function preload() {
  //pre carrega imagens, sons, animações etc

  dinoImg = loadAnimation("trex3.png", "trex4.png");

  chaoImg = loadImage("ground2.png")

  nuvemImg = loadImage("cloud.png")

  cactoImg1 = loadImage("obstacle1.png")

  cactoImg2 = loadImage("obstacle2.png")

  cactoImg3 = loadImage("obstacle3.png")

  cactoImg4 = loadImage("obstacle4.png")

  cactoImg5 = loadImage("obstacle5.png")

  cactoImg6 = loadImage("obstacle6.png")

   loser = loadImage("trex_collided.png")
  
  gameoverImg = loadImage("gameOver.png")
 
   restartImg = loadImage("restart.png")

  somjump = loadSound("jump.mp3")

  somdie = loadSound("die.mp3")

  somcheck = loadSound("checkPoint.mp3")

}

function setup() {
  //função de configuração

  //muda o tamanho da tela do jogo
  createCanvas(windowWidth, windowHeight );

  //cria o sprite do dinossauro
  dinossaurao = createSprite(50, height-100, 20, 20);

  dinossaurao.debug = false

  dinossaurao.setCollider("circle",0,0,30)

  //adicionando animação ao dinossauro
  dinossaurao.addAnimation("running", dinoImg);

  dinossaurao.addImage("loser",loser)

  //mudando o tamanho do dinossauro
  dinossaurao.scale = 0.5;

  edges = createEdgeSprites(); 

  chao = createSprite(width/2,height-10,650,10)

  chao.addImage(chaoImg) 

  chaoFake = createSprite(width/2,height,width,20)

  chaoFake.visible = false

cactos = new Group()

nuvens = new Group()

gameover = createSprite(width/2,height/2)

gameover.addImage(gameoverImg)

gameover.visible = false

restart = createSprite(width/2,height/2+50  )

restart.addImage(restartImg)

restart.visible = false

}

function draw() {

  background("lightblue");

  text("score.. "+ score,  500,10)

  

//Codigo q faz vc colidir nas coisas que vc botar no parentes

dinossaurao.collide(chaoFake);

     
   
    

    
  drawSprites();

if (gamestate===PLAY){

if (score > 0 && score %100 == 0) {

somcheck.play()






}



  if (keyDown("space")&&dinossaurao.isTouching(chao)) {

    dinossaurao.velocityY = -15 ;

    somjump.play()

  }

  if (touches.length > 0 &&dinossaurao.isTouching(chao)) {

touches = []

    dinossaurao.velocityY = -15 ;

    somjump.play()

  }

  dinossaurao.velocityY = dinossaurao.velocityY + 0.85;

  chao.velocityX = -8

 score = score + Math.round(frameRate()/60)

if(chao.x < 0){

    chao.x = chao.width/2

    }


    geradordenuvem()

    geradordecacto() 

  if(dinossaurao.isTouching(cactos)){

  somdie.play()

  gamestate = GAMEOVER
  }


}
else if (gamestate===GAMEOVER){

chao.velocityX = 0

cactos.setVelocityXEach(0)

nuvens.setVelocityXEach(0)

nuvens.setLifetimeEach(-1)

cactos.setLifetimeEach(-1) 

dinossaurao.velocityX = 0

dinossaurao.velocityY = 0 

dinossaurao.changeImage("loser")

gameover.visible = true

restart.visible = true

if (mousePressedOver(restart)){

resetar()

}
if (touches.length > 0){

  resetar()
  
touches = []

}
}

}
 function geradordenuvem() {

if(frameCount%60===0){

  nuvem = createSprite(width,random(60,height-80),20,20)

nuvem.addImage(nuvemImg)

nuvem.scale= 0.8

nuvem.velocityX = -3

nuvem.lifetime = width

nuvens.add(nuvem)
 


}




}
 function geradordecacto() {
if(frameCount%60===0){
 cacto = createSprite(width,height-20,20,60)

cacto.velocityX = -4

var RandomAleatorio=Math.round(random(1,6))

switch (RandomAleatorio) {
  case 1:cacto.addImage(cactoImg1)
    
    break;
    case 2:cacto.addImage(cactoImg2)
    break;
    case 3:cacto.addImage(cactoImg3)
    break;
    case 4:cacto.addImage(cactoImg4)
    break;
    case 5:cacto.addImage(cactoImg5)
    break;
    case 6:cacto.addImage(cactoImg6)
    break;
  default:
    break;
}

cacto.scale= 0.5

cacto.lifetime = width

cactos.add(cacto)

}


  
 }

function resetar () {
 
gamestate = PLAY

cactos.destroyEach()

nuvens.destroyEach()

score = 0

restart.visible = false

 gameover.visible = false

dinossaurao.changeImage("running")

}