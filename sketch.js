//Create variables here
var dog, happyDog, database, foodS, foodStock;
var mainDog
var foodObj,fedTime, lastFed, feed, addFood;
var gameState, currentTime
var bedroomImg, gardenImg, washroomImg, livingroomImg;
function preload()
{
	sadDog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happy dog.png")
  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg= loadImage("images/Wash Room.png")
  livingroomImg = loadImage("images/Living Room.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 800);
  foodObj  = new food()
  mainDog = createSprite(250,500,50,50);
  mainDog.addImage(sadDog)
  mainDog.scale=0.2

  foodStock=database.ref('food')
  foodStock.on("value",readStock);
  feedButton = createButton("Feed the dog")

  readState = database.ref('gameState')
  readState.on("value",function(data){
gameState= data.val();
  })
  feedButton.position(150,55)
  feedButton.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(300,55);
  addFood.mousePressed(addFoods);
}


function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 200, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 200, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 200, 30);
  }
if (gameState!=="hungry"){
  //console.log("it's working")
  feedButton.hide();
  addFood.hide();
  mainDog.visible = false;
}
else{
  feedButton.show();
  addFood.show();
  mainDog.visible = true;
  mainDog.addImage(sadDog)
}

currentTime = hour();
if(currentTime==(lastFed+1)){
  update("playing");
  foodObj.garden();
}
else if(currentTime==(lastFed+2)){
  update("sleeping")
  foodObj.bedroom();
}
else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("bathing");
  foodObj.washroom();
}
else{
  update("hungry");
  foodObj.display();
}
  drawSprites();

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


  function feedDog() {
    mainDog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }



function addFoods(){
  if(foodS<20){
  foodS++;
  database.ref('/').update({
    food: foodS
  
  })
}
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}



