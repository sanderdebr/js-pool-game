import WhiteBall from "./assets/images/ball_white.png";

export default class Ball {
  constructor(mainContext, id, from, to) {
    this.mainContext = mainContext;
    this.id = id;
    this.radius = 40;

    // Speed
    this.frames = 150;
    this.frame = 0;

    this.posX = from.x;
    this.posY = from.y;

    this.to = to;
  }

  update() {
    let image = new Image();
    image.src = WhiteBall;

    this.posX = this.getX();
    this.posY = this.getY();

    this.mainContext.drawImage(
      image,
      this.posX,
      this.posY,
      this.radius,
      this.radius
    );

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  detectCollision(balls) {
    for (let i = 0; i < balls.length; i++) {
      const dx = parseInt(this.posX) - parseInt(balls[i].posX);
      const dy = parseInt(this.posY) - parseInt(balls[i].posY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Collision detected
      if (distance < this.radius / 2 + balls[i].radius / 2) {
        // Find angle of collision
        const angle =
          (Math.atan2(this.posY - balls[i].posY, this.posX - balls[i].posX) *
            180) /
          Math.PI;

        // Other ball was not moving
        if (!this.to) {
          // Draw line
          this.mainContext.beginPath();
          this.mainContext.moveTo(
            this.posX + this.radius / 2,
            this.posY + this.radius / 2
          );
          this.mainContext.lineTo(
            balls[i].posX + this.radius / 2,
            balls[i].posY + this.radius / 2
          );
          this.mainContext.stroke();

          // Move hit ball
          this.frames = this.frames / 10;
          this.frame = 0;

          this.to = { x: this.posX + 50, y: this.posY - 50 };

          // Move hitter ball
          balls[i].frames = balls[i].frames / 10;
          balls[i].frame = 0;
          balls[i].to = { x: balls[i].posX - 50, y: balls[i].posY + 50 };
        }
      }
    }
  }

  getEase(currentProgress, start, distance, steps) {
    currentProgress /= steps / 2;
    if (currentProgress <= 1) {
      return (distance / 2) * currentProgress * currentProgress + start;
    }
    currentProgress--;
    return (
      -1 * (distance / 2) * (currentProgress * (currentProgress - 2) - 1) +
      start
    );
  }

  getX() {
    if (!this.to) return this.posX;
    let distance = this.to.x - this.posX;
    let steps = this.frames;
    let currentProgress = this.frame;
    return this.getEase(currentProgress, this.posX, distance, steps);
  }

  getY() {
    if (!this.to) return this.posY;
    let distance = this.to.y - this.posY;
    let steps = this.frames;
    let currentProgress = this.frame;
    return this.getEase(currentProgress, this.posY, distance, steps);
  }
}
