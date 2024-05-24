class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.box = 32;
        this.reset();
    }

    reset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake = [{x: 9 * this.box, y: 10 * this.box}];
        this.food = {x: Math.floor(Math.random() * 17 + 1) * this.box, y: Math.floor(Math.random() * 15 + 3) * this.box};
        this.d = "";
        this.score = 0;
        this.updateScore();
    }
    updateScore() {
        document.getElementById("score").innerText = "Score: " + this.score;
    }

    draw() {

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = (i == 0) ? "green" : "white";
            this.context.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
        }

        this.context.fillStyle = "red";
        this.context.fillRect(this.food.x, this.food.y, this.box, this.box);

        let snakeX = this.snake[0].x;
        let snakeY = this.snake[0].y;

        if (this.d == "LEFT") snakeX -= this.box;
        if (this.d == "UP") snakeY -= this.box;
        if (this.d == "RIGHT") snakeX += this.box;
        if (this.d == "DOWN") snakeY += this.box;

        let newHead = {x: snakeX, y: snakeY};

        // Check for collision with self
        if (this.collision(newHead, this.snake.slice(1))) {
            this.reset();
            return;
        }

        this.snake.unshift(newHead);

        if (snakeX == this.food.x && snakeY == this.food.y) {
            this.score++;
            this.updateScore();
            this.food = {x: Math.floor(Math.random() * 17 + 1) * this.box, y: Math.floor(Math.random() * 15 + 3) * this.box};
        } else {
            this.snake.pop();
        }
    }

    collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    play() {
        // Check for collision with wall
        if (this.snake[0].x < 0 || this.snake[0].y < 0 || this.snake[0].x > 18 * this.box || this.snake[0].y > 18 * this.box) {
            this.reset();
            return;
        }

        this.draw();
    }
}

let game = new Game();

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && game.d != "RIGHT") {
        game.d = "LEFT";
        event.preventDefault();
    } else if (key == 38 && game.d != "DOWN") {
        game.d = "UP";
        event.preventDefault();
    } else if (key == 39 && game.d != "LEFT") {
        game.d = "RIGHT";
        event.preventDefault();
    } else if (key == 40 && game.d != "UP") {
        game.d = "DOWN";
        event.preventDefault();
    }
}

let gameLoop = setInterval(() => game.play(), 100);