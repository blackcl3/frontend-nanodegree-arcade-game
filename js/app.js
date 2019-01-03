// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    position = ((this.x +=1) * dt);
    if (this.x > 500) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.jump = 101;
    this.step = 83;
    this.x = this.step * 2;
    this.y = (this.jump * 4) + 47;
}

Player.prototype.update = function(dt) {
    for(let enemy of allEnemies) {
        if((this.y === enemy.y - 30 || this.y > enemy.y - 60) && (this.x === enemy.x + 40 || this.x === enemy.x-40)) {

            console.log(this.x, this.y)
            this.x = 200;
            this.y = 451;
        } else if(this.y < 30) {
            this.x = 200;
            this.y = 451;

        }
    }
};



Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


//function borrowed from https://discussions.udacity.com/t/i-dont-understand-how-to-code-classic-arcade-game/527836/2
Player.prototype.handleInput = function(dt) {
    switch (dt) {
       case "up":
         if(this.y > 0) {
            this.y -= this.jump;
         }

         break;
       case "down":
            if(this.y < 400) {
                this.y += this.jump;
            }
         break;
       case "left":
            if(this.x > 0) {
                this.x -= this.step;
            }

         break;
       case "right":
            if(this.x < 400) {
                 this.x += this.step;
             }
         break;
 }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy = new Enemy(-101, 0);
let enemy2 = new Enemy(-101, 83);
let enemy3 = new Enemy((-101*2), 83);
let allEnemies = [];

allEnemies.push(enemy, enemy2, enemy3);


let player = new Player ();

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
