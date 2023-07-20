//Filename snake.js, written by David Carrie, Last Updated Feb. 22 2023.
//Contains code for a snake game, where a snake traverses a grid to eat food.
//User controls are the arrow keys


//Models the user controlled snake
class Snake {
    #size;
    #body;

    //Initialize size to 1 and start snake at 0, 0
    constructor() {
        this.#size = 1;
        //Create 2d array and fill with 1 entry of [0, 0] to represent snake head
        this.#body = Array(1).fill().map(() => Array(2).fill(0));
    }

    //Returns snake location to caller
    getSnake() {
        return this.#body;
    }

    //Updates the location of all parts of the snake
    updateSnake() {

        //Offsets to calculate snake movement
        let x, y;

        //Snake movement calculated based on direction
        //Current snake direction. 1 = up, 2 = right, 3 = down, 4 = left
        switch (curDirection) {
            //Case 1 snake going up
            case 1:
                x = 0;
                y = -1;
                break;
            //Case 2 snake going right
            case 2:
                x = 1;
                y = 0;
                break;
            //Case 3 snake going down
            case 3:
                x = 0;
                y = 1;
                break;
            //Case 4 snake going left
            case 4:
                x = -1;
                y = 0;
                break;
        }

        //Loop to update each part of snake
        for (var i = this.#body.length - 1; i >= 0; i--) {

            //If size of snake < than required add another section at tail
            if ((i == (this.#body.length - 1)) && (this.#size > this.#body.length)) {
                //Add section at previous location for tail
                this.#body.push([this.#body[i][0], this.#body[i][1]]);
            }
            if (i > 0) {
                //If not snake head, follow previous section
                this.#body[i][0] = this.#body[i - 1][0];
                this.#body[i][1] = this.#body[i - 1][1];
            } else {
                //else(snake head) update head location
                this.#body[i][0] = this.wrapSnake(this.#body[i][0] + x);
                this.#body[i][1] = this.wrapSnake(this.#body[i][1] + y);
            }
        }
    }

    //Wrap snake to other side of the board if needed
    wrapSnake(point) {
        if (point > size - 1) {
            return 0;
        } else if (point < 0) {
            return size - 1;
        }
        return point;
    }

    //Update size of snake, increasing number of cells it occupies by 1
    updateSize() {
        this.#size += 1;
    }
}

//Class providing functionality for in game food
class Food {
    //Variables to represent amount of food to spawn and current food locations
    #amount;
    #foodLoc;

    //on Construction: Set initial amount, and spawn food
    constructor() {
        this.#amount = 1;
        this.#foodLoc = [];
        this.spawnFood();
    }

    //Spawn food as required
    spawnFood() {
        //While current amount of food is less than required, 
        while (this.#foodLoc.length < this.#amount) {
            //Generate coords for new food and push into storage
            this.#foodLoc.push([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
        }
    }

    //Returns food location to caller
    getFood() {
        return this.#foodLoc;
    }

    //Removes eaten feed from storage
    eatFood(x, y) {
        this.#foodLoc.splice([x, y])
    }
}

//Provides main game functionality and stores gamestate
class GameBoard {
    //size of gameboard
    #boardSize;
    //2d array representing gameboard
    #board;
    //user controlled snake
    #snake;
    //food to be eaten
    #food;
    //current score
    #score;
    //current game speed
    #speed;

    //Initialize game to start state
    constructor() {
        this.#boardSize = size;
        this.#score = 0;
        this.#snake = new Snake();
        this.#food = new Food();
        //Initialize board with 0s. 0 = empty, 1 = snake, 3 = food
        this.#board = Array(this.#boardSize).fill().map(() => Array(this.#boardSize).fill(0));

        //Initial game spped = 0; interval = 500
        this.#speed = 0;
        interval = setInterval(draw, 500);
    }
    //Get snake position and update board
    #updatePosition() {
        //update snake position
        this.#snake.updateSnake();
        //get and store snake part location(s)
        let temp = this.#snake.getSnake();

        //for each snake part, update board with its location. 1 = snake
        for (var x = 0; x < temp.length; x++) {
            this.#board[temp[x][0]][temp[x][1]] += 1;
        }
    }

    //update game food and get food location(s)
    #updateFood() {    
        //Spawns food if required 
        this.#food.spawnFood();
        //Retrieve food location
        let temp = this.#food.getFood();
        //for each peice of food, update board with its location. 3 = food
        for (var x = 0; x < temp.length; x++) {
            this.#board[temp[x][0]][temp[x][1]] += 3;
        }
    }

    //Check to confirm snake colided with piece of interest
    #checkCollision(x, y) {
        if (this.#board[x][y] == 2) {
            //If snake collision with snake (1+1 = 2), end game
            this.#endGame();
        } else if (this.#board[x][y] == 4) {
            //If snake collision with food(1+3=4), eat food and update score and size
            this.#food.eatFood(x, y);
            this.#updateScore();
            this.#snake.updateSize();
        }
    }
    //Update game score
    #updateScore() {
        this.#score += 50;
        this.#updateSpeed();
    }

    //Update game speed
    #updateSpeed() {
        //If speed increase required (current speed to low)
        if (Math.floor(this.#score / 100) > this.#speed) {
            //Update speed and set refresh interval based on new speed
            this.#speed++;
            clearInterval(interval);
            if (this.#speed < 5) {
                interval = setInterval(draw, 500 - this.#speed * 50);
            } else if (this.#speed < 15) {
                interval = setInterval(draw, (500 - 5 * 50 - (this.#speed - 5) * 25));
            }
            else {
                interval = setInterval(draw, 25);
            }

        }

    }

    //Update game grid and draw peices
    updateDisplay(ctx, width, height) {
        //Wipe previous board
        this.#board = Array(this.#boardSize).fill().map(() => Array(this.#boardSize).fill(0));
        //Place food and place snake
        this.#updateFood();
        this.#updatePosition();
        //Loop to generate visual representation of game peices
        for (var x = 0; x < this.#boardSize; x++) {
            for (var y = 0; y < this.#boardSize; y++) {
                
                if (this.#board[x][y] == 1) {
                    //If snake piece, paint black
                    ctx.fillStyle = "black";
                    ctx.fillRect(x * width / this.#boardSize, height / this.#boardSize * y, width / this.#boardSize, height / this.#boardSize);
                } else if (this.#board[x][y] == 2) {
                    //If snake collision, paint red
                    ctx.fillStyle = "red";
                    ctx.fillRect(x * width / this.#boardSize, height / this.#boardSize * y, width / this.#boardSize, height / this.#boardSize);
                    this.#checkCollision(x, y);
                } else if (this.#board[x][y] == 3) {
                    //If food piece, paint green
                    ctx.fillStyle = "green";
                    ctx.fillRect(x * width / this.#boardSize, height / this.#boardSize * y, width / this.#boardSize, height / this.#boardSize);
                } else if (this.#board[x][y] == 4) {
                    //If snake eating food, paint blue
                    ctx.fillStyle = "blue";
                    ctx.fillRect(x * width / this.#boardSize, height / this.#boardSize * y, width / this.#boardSize, height / this.#boardSize);
                    this.#checkCollision(x, y);
                } else if (this.#board[x][y] > 4) {
                    //Error condition, paint brown
                    ctx.fillStyle = "brown";
                    ctx.fillRect(x * width / this.#boardSize, height / this.#boardSize * y, width / this.#boardSize, height / this.#boardSize);
                }
            }
        }
    }

    //Draw current user score
    drawScore(ctx, height) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + this.#score, 10, height * 1.1);
    }
    //End current game
    #endGame() {
        gameActive = false;
        clearInterval(interval);
    }
    //Start a new game
    start() {
        gameActive = true;
        button.innerHTML = "Restart";
        clearInterval(interval);
        curDirection = 1;
        gameBoard = new GameBoard();
    }

    //Updates snake direction based on user controls
    userControls(e) {
        switch (e.key) {
            //Snake direction. 1 = up, 2 = right, 3 = down, 4 = left
            case "ArrowUp":
                curDirection = 1;
                break;
            case "ArrowRight":
                curDirection = 2;
                break;
            case "ArrowDown":
                curDirection = 3;
                break;
            case "ArrowLeft":
                curDirection = 4;
                break;
        }
    }
}

//Start of main code

// Setup variables
var size = 10;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var interval;
var gameActive = false;
var cHeight = Math.ceil(canvas.height * 0.9);
//Set current direction to up
var curDirection = 1;
//Create initial gameboard
var gameBoard = new GameBoard();

//create listener for keyboard controls
document.addEventListener('keydown', gameBoard.userControls);

//Create and add start button to start a new game


var button = document.createElement("button");
button.innerHTML = "Start";
button.setAttribute("id", "startButton")
/*
var buttonPlacement = document.getElementById("star");
buttonPlacement.appendChild(button);

var docBody = document.getElementsByTagName("body")[0];
*/

var docBody = document.getElementById("snakeControls");
docBody.appendChild(button);
button.addEventListener("click", gameBoard.start);

//Draws the game grid on screen
function drawBoard() {
    //Loop to generate verticle lines, based on canvas size and required cells
    for (var x = 0; x <= canvas.width; x += canvas.width / size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cHeight);
    }
    //loop to generate horizontal lines, based on canvas size and required cells
    for (var y = 0; y <= cHeight; y += (cHeight / size)) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

//Driving gameplay loop
function draw() {
    //Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Draw Grid
    drawBoard();
    //Draw GameState if game active
    if (gameActive) {
        gameBoard.updateDisplay(ctx, canvas.width, cHeight);
    } 
    gameBoard.drawScore(ctx, cHeight);
}

//Code for star rating system
//Code inspired from https://www.javatpoint.com/oprweb/test.jsp?filename=jquery-star-rating1 taken on June 10th 2023
$(document).ready(function () {

    $("#p1-1").click(function () {
      $(".fa-star").css("color", "black");
      $("#p1-1").css("color", "yellow");

    });
    $("#p1-2").click(function () {
      $(".fa-star").css("color", "black");
      $("#p1-1, #p1-2").css("color", "yellow");

    });
    $("#p1-3").click(function () {
      $(".fa-star").css("color", "black")
      $("#p1-1, #p1-2, #p1-3").css("color", "yellow");

    });
    $("#p1-4").click(function () {
      $(".fa-star").css("color", "black");
      $("#p1-1, #p1-2, #p1-3, #p1-4").css("color", "yellow");

    });
    $("#p1-5").click(function () {
      $(".fa-star").css("color", "black");
      $("#p1-1, #p1-2, #p1-3, #p1-4, #p1-5").css("color", "yellow");

    });


  });