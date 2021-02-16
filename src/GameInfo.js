import { CANVAS_PADDING } from "./settings";
import Player from "./Player";

export default class GameInfo {
  constructor(ctx) {
    this.ctx = ctx;

    this.player1 = new Player("Player 1", "whole");
    this.player2 = new Player("Player 2", "half");

    this.player1.isPlaying = true;
  }

  getPlayerActivity() {
    let activePlayer, otherPlayer;
    activePlayer = this.player1.isPlaying ? this.player1 : this.player2;
    otherPlayer = activePlayer === this.player1 ? this.player2 : this.player1;

    return { activePlayer, otherPlayer };
  }

  handlePocketedBall(ball) {
    const { activePlayer, otherPlayer } = this.getPlayerActivity();

    console.log(
      `Pockted ball ${ball.wholeOrHalf} - ${activePlayer.wholeOrHalf}`
    );

    if (ball.wholeOrHalf === activePlayer.wholeOrHalf) {
      activePlayer.points++;
      activePlayer.isPlaying = true;
    } else {
      activePlayer.isPlaying = false;
      otherPlayer.points++;
      otherPlayer.isPlaying = true;
    }
  }

  showGameInfo() {
    this.ctx.font = "18px Arial";

    this.ctx.fillStyle = this.player1.isPlaying ? "green" : "black";
    this.ctx.fillText(
      `${this.player1.name} (${this.player1.wholeOrHalf}): ${this.player1.points}`,
      CANVAS_PADDING - 30,
      50
    );

    this.ctx.fillStyle = this.player2.isPlaying ? "green" : "black";
    this.ctx.fillText(
      `${this.player2.name} (${this.player2.wholeOrHalf}): ${this.player2.points} `,
      CANVAS_PADDING - 30,
      75
    );
  }

  update() {
    this.showGameInfo();
  }
}
