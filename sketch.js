var foodStock,database,foodS
var dog,happyDog,dogImg

function preload(){
dogImg = loadImage("images/dogImg.png")
happyDogImg = loadImage("images/dogImg1.png") 
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",function(data){
    foodS = data.val();
  })

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here
  fill(255)
  text("Press UP ARROW to feed your pet", 210,50)
  text("food left : "+ foodS,150,150)
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    writeStock(foodS);
    console.log(foodS);
    if(foodS>0){
    dog.addImage(happyDogImg);
    }
    else{
      dog.addImage(dogImg);
    }

  }
} 
function writeStock(x){
  if(x<0){
    x = 0;
  }
  else if(x>0){
    x = x-1 ;
  }
  database.ref('/').update({
    food:x
  })
}

