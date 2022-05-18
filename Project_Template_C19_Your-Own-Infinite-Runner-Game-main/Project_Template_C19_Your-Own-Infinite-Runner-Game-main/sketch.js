var player, playerimg

var parede_1, parede_2, paredeFalsa_1, paredeFalsa_2

var inimigo, inimigoImg, inimigoGroup

var tentar_dnv, tentar_dnvImg

var escudo, escudoImg

var inicio, inicioImg



var fundo, fundoImg

var score, vidas, indestrutivel, recorde = 0

var sla_1, sla_2, sla_3
var i, time, time_2
var gamestate = "inicio"



function preload(){
  playerimg = loadImage("galaga-ship-png-Transparent-Images.png")
  escudoImg = loadImage("30ff589e2ef3eb7 (1).png")
  tentar_dnvImg = loadImage("png-clipart-logo-album-symbol-again-photography-photo-albums-thumbnail.png")
  inimigoImg = loadImage("135-1350574_asteroid-clipart-8-bit-8-bit-asteroid-png.png")
  inicioImg = loadImage("Screenshot_1.png")
  fundoImg = loadImage("6d06284999c2b88be9246ab8ae28e398.png")
}

function setup() {
 createCanvas(windowWidth, windowHeight)

 player = createSprite(200,200)
 player.addImage("jogador", playerimg)
 player.scale = 0.1

 fundo = createSprite(windowWidth/2, windowHeight/2)
 fundo.scale = 0.8
 fundo.addImage(fundoImg)
 

 escudo = createSprite(player.x, player.y)
 escudo.addImage("protege", escudoImg)
 escudo.scale = 0.5

 tentar_dnv = createSprite(windowWidth/2 - 100, windowHeight/3 + 450)
 tentar_dnv.addImage("repetir", tentar_dnvImg)

 inicio = createSprite(windowWidth/2, windowHeight/2)
 inicio.addImage("galaga",inicioImg)

 time = 0
 time_2 = 0
 indestrutivel = 50
 score = 0
 sla_1 = 100
 sla_2 = 200
 vidas = 3

 paredeFalsa_1 = createSprite(windowWidth - 350, windowHeight / 2 , 100, windowHeight)
 paredeFalsa_2 = createSprite(350, windowHeight / 2, 100, windowHeight)
 parede_1 = createSprite(windowWidth - 200, windowHeight / 2 , 400, windowHeight)
 parede_2 = createSprite(200, windowHeight / 2, 400, windowHeight)

 inimigoGroup = new Group()

}

function draw() {
  
  if(gamestate == "play"){
    fundo.visible = true
    escudo.visible = false
    player.visible = true
    tentar_dnv.visible = false
    inicio.visible = false
    parede_1.visible = false
    parede_2.visible = false
    paredeFalsa_1.visible = true
    paredeFalsa_2.visible = true
    background("grey")

    fundo.velocityY = 20
    if(fundo.y >= windowHeight - 100){
      fundo.y = windowHeight/2 - 100

    }
    fundo.depth = player.depth -1
    


  
  



  if(sla_1>=10){
    sla_1 = sla_1 - 1
  }
  if(sla_2>=10){
    sla_2 = sla_2 - 0.5
  }
  if(time<=1999){
    time = time + 1
  }
  if(time == 400){
    time_2 = 1
  }else{
    if(time == 800){
      time_2 = 2
    }else{
      if(time == 1200){
        time_2 = 3
      }
    }
  }
  if(indestrutivel >= 1){
    indestrutivel = indestrutivel - 1
    escudo.visible = true
    escudo.x = World.mouseX
    escudo.y = World.mouseY
  }else{
    escudo.visible = false
  }
  


  score = score + 10
  if (vidas >= 0){
    
    viloes()
 
  }

 
 player.x = World.mouseX
 if(player.x >= paredeFalsa_1.x - 220){
   player.x = paredeFalsa_1.x - 220
 }

 player.y = World.mouseY
 if(player.x <= 420){
  player.x = 420
 }
 if(keyDown("z") && time_2>= 1){
  if(time_2 == 3){
   inimigoGroup.destroyEach()
   sla_1 = 200
   sla_2 = 300
   time = 0
   time_2 = 0
   score = score +10000
  }else{
    if(time_2 == 2){
     indestrutivel = 50
     time = 400
     time_2 = 1
    }else{
     indestrutivel = 50
     time = 0
     time_2 = 0
    }
    
  }
 }

 
 
 
 

 if(inimigoGroup.isTouching(player) && indestrutivel == 0){
  inimigoGroup.destroyEach()
   vidas = vidas - 1
   sla_1 = 200
   sla_2 = 300

 }


 if (vidas == 0){
   inimigoGroup.destroyEach()
   player.visible = false
   escudo.visible = false

   gamestate = "over"
 }
 

 

 
 inimigoGroup.bounceOff(paredeFalsa_1)
 inimigoGroup.bounceOff(paredeFalsa_2)
 

 textSize(20)
  fill("red")
  text("score = "+ score, 150, 60)
  fill("red")
  text("vidas = "+ vidas,150, 80)
  fill("red")
  text("recorde = "+ recorde, windowWidth - 250, 60)
  fill("red")
  text("nivel de poder = "+ time_2, windowWidth - 250, 80)
  

 
 
}else{
  if (gamestate == "over"){
    inicio.visible = false
    tentar_dnv.visible = true
    paredeFalsa_1.visible = false
    paredeFalsa_2.visible = false
    fundo.visible = false
    parede_1.visible = true
    parede_2.visible = true
    background("black")

    if(score >= recorde){
      recorde = score
    }



    textSize(72)
    fill("red")
    text("GAME", windowWidth/2 - 200, windowHeight/3)
    fill("red")
    text("OVER", windowWidth/2 - 200, windowHeight/3 + 100)
    textSize(48)
    fill("red")
    text("score = "+ score, windowWidth/2 - 200, windowHeight/3 + 200 )
    fill("red")
    text("recorde = "+ recorde, windowWidth/2 - 200, windowHeight/3 + 300 )

    if(mousePressedOver(tentar_dnv)){
      gamestate = "play"
      time = 0
      time_2 = 0
      indestrutivel = 50
      score = 0
      sla_1 = 100
      sla_2 = 200
      vidas = 3
    }
  }else{
    if(gamestate == "inicio"){
    tentar_dnv.visible = false
    paredeFalsa_1.visible = false
    paredeFalsa_2.visible = false
    inicio.visible = true
    background("black")
    
    if(keyDown("space")){
      gamestate = "play"
      
    }

    
  }
  }
}
  
 drawSprites()
}









function viloes(){

 if(frameCount % sla_1 === 0){
  for (i = 0; i <= 3; i++){
    inimigo = createSprite(random(420,windowWidth - 420), -25, 30,30)
    inimigo.addImage("atacar", inimigoImg)
    inimigo.setCollider("circle", 0, 0, 10)
    inimigo.debug = false
    inimigo.scale = 0.05
    inimigo.velocityY = 10
    inimigo.lifetime = 105
    inimigoGroup.add(inimigo)
    }
  }
 



  if(frameCount % sla_2 === 0){
  for (i = 0; i <= 3; i++){
    inimigo = createSprite(random(420,windowWidth - 420), -25, 30,30)
    inimigo.addImage("atacar", inimigoImg)
    inimigo.scale = 0.05
    inimigo.setCollider("circle", 0, 0, 10)
    inimigo.debug = false
    inimigo.velocityY = 15
    inimigo.rotationSpeed
   var teste 
   teste = Math.round(random(1,2))
   if(teste == 1){
    inimigo.velocityX = 20
   } else{
    inimigo.velocityX = -20
   }
   if(inimigo.x >= paredeFalsa_1.x - 219 ){
    inimigo.velocityX = -20
   }
   if(inimigo.x <= 419){
    inimigo.velocityX = 20
   
   }
   inimigo.lifetime = 70
   inimigoGroup.add(inimigo)
  }
 }
 }




 
