import WhiteBall from "./assets/images/ball_white.png";

export default class Ball {
  constructor(id, x, y) {
    this.id = id;
    this.image = new Image();
    this.image.src = WhiteBall;
    this.posX = x;
    this.posY = y;
    this.radius = 80;
    this.isMoving = false;
    this.updateX = 0;
    this.updateY = 0;
    this.speed = 1;
  }

  move(speed, angle) {
    this.isMoving = speed > 0;
    this.speed = speed;
    this.updateX = this.speed * Math.cos((angle * Math.PI) / 180);
    this.updateY = this.speed * Math.sin((angle * Math.PI) / 180);
  }

  detectCollision(balls) {
    for (let i = 0; i < balls.length; i++) {
      const dx = parseInt(this.posX) - parseInt(balls[i].posX);
      const dy = parseInt(this.posY) - parseInt(balls[i].posY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Collision detected
      if (distance < this.radius / 4 + balls[i].radius / 4) {
        // Find angle of collision
        const angle =
          (Math.atan2(this.posY - balls[i].posY, this.posX - balls[i].posX) *
            180) /
          Math.PI;

        // If a ball is still, move it slower
        if (!this.isMoving) {
          this.move(balls[i].speed / 2, angle);
        } else {
          this.move(this.speed / 1.5, angle);
        }
      }
    }
  }

  update(timestamp) {
    this.posX += this.updateX;
    this.posY += this.updateY;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.radius * 0.5,
      this.radius * 0.5
    );
  }
}
