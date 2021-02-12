import "./styles.css";

import Ball from "./Ball";
import Canvas from "./Canvas";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.balls = [
      new Ball(1, this.canvas.width / 2 - 200, this.canvas.height / 2 - 30),
      new Ball(2, this.canvas.width / 2, this.canvas.height / 2 - 40),
    ];

    document.addEventListener("click", this.shootBall.bind(this));
    this.gameLoop();
  }

  shootBall() {
    this.balls[0].move(0.5, 0);
    this.balls[1].move(1, -180);
  }

  gameLoop(timestamp) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.balls.length; i++) {
      const otherBalls = this.balls.filter(
        (ball) => ball.id !== this.balls[i].id
      );

      this.balls[i].detectCollision(otherBalls);
      this.balls[i].update(timestamp);
      this.balls[i].draw(ctx);
    }

    window.requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
