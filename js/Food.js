class food {
constructor(){
    this.foodStock = 0
    this.image = loadImage("images/Milk.png")
    this.lastFed;
}
updateFoodStock(foodStock){
this.foodStock= foodStock
}
getFedTime(lastFed){
    this.lastFed= lastFed;
}
deductFood(){
    if (this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }

}
getFoodStock(){
    return this.foodStock
}

bedroom(){
    image(bedroomImg,250,400);
}

garden(){
    image(gardenImg,250,400);
}

washroom(){
    image(washroomImg,250,400)
}
display(){
    var x=100, y=150;
    imageMode(CENTER);
    image(this.image,720,220, 70,70);     
    
    if(this.foodStock !=0){
        for (var i=0; i<this.foodStock; i++){
            if(i%10==0){
                x=120
                y=y+50;
            }
            image(this.image,x,y, 50,50);
            x=x+30;
        }
    }
}

}