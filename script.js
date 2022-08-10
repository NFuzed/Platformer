window.addEventListener("load", function () {
  console.clear();
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  class InputHandler {
    constructor() {
      this.keys = {
        right: false,
        left: false,
        up: false,
        space: false
      };
    }

    keydown(e) {
      if (e.key === "a") input.keys.left = true;
      if (e.key === "w") input.keys.up = true;
      if (e.key === "d") input.keys.right = true;
      if (e.key === " ") input.keys.space = true;
    }
    keyup(e) {
      if (e.key === "a") input.keys.left = false;
      if (e.key === "w") input.keys.up = false;
      if (e.key === "d") input.keys.right = false;
      if (e.key === " ") input.keys.space = false;
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.width = 50;
      this.height = 50;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.xv = 0;
      this.yv = 0;
      this.jump = false;
      this.ay = 1;
      this.xy = 0.5;
      this.friction = 0.9;
    }
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(input) {
      document.addEventListener("keydown", input.keydown);
      document.addEventListener("keyup", input.keyup);

      this.y += this.yv;
      //Horizontal Speed
      if (input.keys.right) this.xa = this.jump ? 1 : 3;
      else if (input.keys.left) this.xa = this.jump ? -1 : -3;
      else this.xa = 0;
      this.xv += this.xa;
      this.xv *= this.friction;
      this.x += this.xv;

      //Horizontal Borders
      if (this.x < 0) {
        this.x = 0;
        this.xv = 0;
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
        this.xv = 0;
      }

      //Vertical Speed

      if (input.keys.up && !player.jump) {
        this.yv = -30;
        this.jump = true;
      }
      //Vertical Borders
      if (this.y > this.gameHeight - this.height) {
        this.jump = false;
        this.y = this.gameHeight - this.height;
      } else if (this.y < 0) {
        this.jump = false;
        this.y = 0;
      }
      this.yv += this.ay;
    }
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();
});
