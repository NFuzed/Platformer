export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.grass = this.#image("Grass.png");
    this.dirt = this.#image("Dirt.png");
  }

  #image(fileName) {
    const img = new Image();
    img.src = `images/${fileName}`;
    return img;
  }

  //1 - grass
  //0 - dots
  //2 - dirt
  //3 enemies
  map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0],
    [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1],
  ];

  draw(canvas, ctx) {
    this.#setCanvasSize(canvas);
    this.#clearCanvas(canvas, ctx);
    this.#drawMap(ctx);
  }

  #drawMap(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        let image = null;
        switch (tile) {
          case 0:
            break;
          case 1:
            image = this.grass;
            break;
          case 2:
            image = this.dirt;
            break;
        }

        if (image != null)
          ctx.drawImage(
            image,
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
      }
    }
  }

  #clearCanvas(canvas, ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var image = document.getElementById("background")
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  }

  #setCanvasSize(canvas) {
    canvas.height = this.map.length * this.tileSize;
    canvas.width = this.map[0].length * this.tileSize;
  }
}
