//Create variables here
var Dog,HappyDog,Dog1,database,foodS,foodStock;

function preload()
{
  //load images here
  Dog = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(700 , 650);
  
  Dog1 = createSprite(350,500,20,20);
  Dog1.addImage("normal",Dog);
  Dog1.addImage("happy",HappyDog);
  Dog1.scale = 0.4;
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Dog1.changeImage("happy");
  }
  if(keyWentUp(UP_ARROW)){
    Dog1.changeImage("normal");
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("pink");
  stroke("white");
  strokeWeight(2);
  text("Food : " + foodS,250,250);
 text("Note : Press UP_ARROW to feed the dog",200,100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food :x 
  })
}

