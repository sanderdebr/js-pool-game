import "./styles.css";

import Ball from "./Ball";
import BallFactory from "./BallFactory";
import Canvas from "./Canvas";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.entities = [
      new Ball(1, this.canvas.width / 2 - 200, this.canvas.height / 2 - 40),
      new Ball(2, this.canvas.width / 2, this.canvas.height / 2 - 40),
    ];

    document.addEventListener("click", this.shootBall.bind(this));
    this.gameLoop();
  }

  shootBall() {
    const targetBall = this.entities.filter((ball) => ball.id === 1)[0];
    targetBall.updateX = 1;
  }

  gameLoop(timestamp) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(timestamp);
      this.entities[i].draw(ctx);
    }

    window.requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
