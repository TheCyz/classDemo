function Hero({x, y}, context, img) {
  this.img = img
  this.context = context
  this.imgPos = {
      x: 0,
      y: 0,
      width: 30,
      height: 30
  };
  this.width = 40;
  this.height = 40;
  this.rect = {
      x,
      y,
      width: this.width,
      height: this.height
  };

}

Hero.prototype = {
  draw() {
    this.context
      .drawImage(
        this.img,
        this.imgPos.x,
        this.imgPos.y,
        this.imgPos.width,
        this.imgPos.height,
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height
      )
    },
  clearDraw() {
    this.context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  },
  keyMove(code) {
    this.clearDraw();
    switch(code) {
      case 37:
        if (this.rect.x > 0) {
          this.rect.x -= this.rect.width;
        }
        break;
      case 38:
        if (this.rect.y > 0) {
          this.rect.y -= this.rect.height;
        }
        break;
      case 39:
        if (this.rect.x < 480) {
          this.rect.x += this.rect.width;
        }
        break;
      case 40:
        if (this.rect.y < 280) {
          this.rect.y += this.rect.height;
        }
        break;
    }
    this.draw();
  },
  collision(x, y) {
    return !(x === monster.rect.x && y === monster.rect.y);
  }
}

window.Hero = Hero