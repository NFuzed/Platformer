import TileMap from "./TileMap.js";

window.addEventListener("load", function () {
  console.clear();
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const tileSize = 64
  const tileMap = new TileMap(tileSize);
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
      context.drawImage(this.image, 0, 0, this.gameWidth, this.gameHeight)
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      //Canvas and Object Size
      this.imgArray = []
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.width = 64;
      this.height = 128 ;
      this.image = document.getElementById("playerImage");
      this.frame = 0;

      //Frames
      this.maxFrame = 10;
      this.frameRate = 20;
      this.timer = 1000 /this.maxFrame; 

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
      //context.fillStyle = "blue";
      //context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
      //context.drawImage(this.image, this.frame * this.width, 0 * this.height, 1 * this.width, 1 * this.height, this.x, this.y, this.width, this.height);
    }

    //Collision
    checkCollision(){

      //Translate player into grid locations
      var playerGridX = Math.floor(this.x / 64)
      var playerGridY = Math.floor(this.y / 64)
      if (tileMap.map[playerGridY][playerGridX] != 0){
        
      }
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
      this.frame = this.frame + 1
      if (this.frame > 3) {this.frame = 0} 
  
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

      this.checkCollision();
    }
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    background.draw(ctx);
    tileMap.draw(canvas, ctx);
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();
});
