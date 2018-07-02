// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = (row * 83)+50;
    this.width = 101;
    this.height = 80;
    this._configure();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this._isWithinFrame(this.x+dt*this.speed , this.y))
        this.x += dt*this.speed;
    else{
        this._configure();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype._configure = function(){
    this.x = -83;
    this.speed = Utility.randomInt();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.isCollided = function(object){
    if((this.x > object.x && this.x < (object.x+object.width) )
        ||(object.x > this.x && object.x < (this.x+this.width) )
        ||(this.y > object.y && this.y < (object.y+object.height) )
        ||(object.y > this.y && object.y < (this.y+this.height) )){
        return true;
    }else{
        return false;
    }
}

Enemy.prototype._isWithinFrame = function(newXPos, newYPos){
    if(newXPos < 5*101 && newYPos >= 0 && newYPos < 6*83)
        return true;
    else
        return false;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this._configure();
    this.width = 73;
    this.height = 99;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    if(this._win()){
        this._configure();
    }
}

Player.prototype.handleCollision = function(otherCollidedObjects){

    if(otherCollidedObjects instanceof Array) {

        for(var i=0 ; i<otherCollidedObjects.length; i++){
            if(this._isCollided(otherCollidedObjects[i])){
                this._configure();
                return;
            }
        }

    } else {
        if(otherCollidedObjects.isCollided(otherCollidedObjects)){
            this._configure();
            return;
        }
    }
}

Player.prototype._isCollided = function(object){
    if((
        ((this.x+this.width-20) < object.x) 
        ||
        (this.x > (object.x+object.width-20))
    )||(
        ((this.y+this.height-20) < object.y)
        ||
        (this.y > (object.y+object.height-20))
    ))
        return false;
    else
        return true;
    

    // if((((this.x > object.x +15) && (this.x < (object.x+object.width-5)))
    //     &&((this.y > object.y +15) && (this.y < (object.y+object.height-5))))
    //     ||
    //     (((object.x > this.x +15) && (object.x < (this.x+this.width-5)))
    //     &&((object.y > this.y +15) && (object.y < (this.y+this.height-5))))){
    //     console.log(true);
    //     return true;
    // }else{
    //     return false;
    // }
}

Player.prototype._configure = function(){
    this.x = (2 * 101)+15;
    this.y = (5 * 83)+40;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype._isWithinFrame = function(newXPos, newYPos){
    if(newXPos >= 0 && newXPos < 5*101 && newYPos >= 0 && newYPos < 6*83)
        return true;
    else
        return false;
}

Player.prototype._win= function(){
    if(this.y < 101)
        return true;
    else
        return false
}

Player.prototype.handleInput = function(pressedKey){
    switch(pressedKey) {
        case 'left':
            if(this._isWithinFrame(this.x-100 , this.y))
                this.x -= 101;
            break;
        case 'right':
            if(this._isWithinFrame(this.x+101 , this.y))
                this.x += 101;
            break;
        case 'up':
            if(this._isWithinFrame(this.x , this.y-83))
                this.y -= 83;
            break;
        case 'down':
            if(this._isWithinFrame(this.x , this.y+83))
                this.y += 83;
            break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
            new Enemy(1),
            new Enemy(2),
            new Enemy(3)
        ];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
