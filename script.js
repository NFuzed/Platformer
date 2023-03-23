window.addEventListener("load", function () {
  console.clear();
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 64 * 15;
  canvas.height = 64 * 11;

  class InputHandler {
    constructor() {
      this.keys = {
        right: false,
        left: false,
        up: false
      };
    }

    keydown(e) {
      if (e.key === "a") input.keys.left = true;
      if (e.key === "w") input.keys.up = true;
      if (e.key === "d") input.keys.right = true;
    }
    keyup(e) {
      if (e.key === "a") input.keys.left = false;
      if (e.key === "w") input.keys.up = false;
      if (e.key === "d") input.keys.right = false;
    }
    keypress(e) {
      if (e.key === " ") player.flipGrav();
      if (e.key === "o") player.dash();
    }
  }

  class Background {
    constructor(gameWidth, gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("background")
    }
    draw(context){
      //context.drawImage(this.image, 0, 0, this.gameWidth, this.gameHeight)
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      //Canvas and Object Size
      this.imgArray = []
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.width = 64;
      this.height = 64;

      //Position, Velocity and Acceleration
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.xv = 0;
      this.yv = 0;
      this.ay = 1;
      this.xy = 0.5;

      //SKills / Features
      this.jump = false;
      this.friction = 0.9;
      this.jumps = 1;
      this.gravity = 1;
    }

    //Create Sprite
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
    }

    //Gravity
    flipGrav() {
      if (this.jump) return;
      this.jump = true;
      this.ay *= -1;
      this.gravity *= -1;
      this.yv = 0;
    }

    //Dash
    dash() {
      if (input.keys.right) this.xv = 70;
      else if (input.keys.left) this.xv = -70;
      else return;
      player.draw(ctx, "red");
      this.yv = 0;
      this.ay = 0;
    }

    update(input) {
      document.addEventListener("keydown", input.keydown);
      document.addEventListener("keyup", input.keyup);
      document.addEventListener("keypress", input.keypress);

      //Re-establish Gravity
      if (Math.abs(this.xv) < 20) {
        this.ay = this.gravity;
        player.draw(ctx, "white");
      }

      //Horizontal Speed
      if (input.keys.right && this.xv < 30) this.xa = this.jump ? 1 : 3;
      else if (input.keys.left && this.xv > -30) this.xa = this.jump ? -1 : -3;
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
      this.y += this.yv;
      this.yv += this.ay;
      if (input.keys.up && !player.jump) {
        this.yv = -20 * this.ay;
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
    }
  }

  class Frames{
    constructor(fps){
      this.fpsInterval = 1000 / fps;
      this.then = Date.now();
      this.startTime = this.then;
      this.nextFrame = true;
      this.now, this.elapsed;
    }

    update(){
      
      this.now = Date.now();
      this.elapsed = this.now - this.then;
      if (this.elapsed > this.fpsInterval) {
        this.nextFrame = true;
      }
    }

    reset(){
      console.log(this.then)
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.nextFrame = false
    }

  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height)
  const frames = new Frames(100);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Updates Frame Rate every Tick
    frames.update();

    //Only Updates Player if on the Correct Frame Interval
    //if (frames.nextFrame){
      //frames.reset();
      player.update(input);
    //}

    //Always Draws Assets Regardless
    background.draw(ctx);
    player.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
