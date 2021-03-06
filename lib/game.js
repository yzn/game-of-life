function Game(canvas, options) {
  options = options || {};

  var cellSize = options.cellSize || 8;

  var width = canvas.width;
  var height = canvas.height;

  var cols = Math.floor(width / cellSize);
  var rows = Math.floor(height / cellSize);

  width = cellSize * cols;
  height = cellSize * rows;

  canvas.width = width;
  canvas.height = height;

  var world = new World(cols, rows);

  this._canvas = canvas;
  this._context = canvas.getContext('2d');

  this._width = width;
  this._height = height;

  this._cols = cols;
  this._rows = rows;

  this._cellSize = cellSize;

  this._world = world;

  this._timer = null;

  this._interval = options.interval || 100;

  this._started = false;

  this.reset();
}

Game.prototype.isRunning = function () {
  return !!this._timer;
};

Game.prototype.reset = function () {
  if (this._timer) {
    clearInterval(this._timer);
    this._timer = null;
  }

  this._started = false;

  this._world.clear();

  this.draw();
};

Game.prototype.play = function () {
  if (this.isRunning()) return;

  if (!this._started) {
    this._world.randomize();
    this._started = true;
  }

  var self = this;

  this._timer = setInterval(function () {
    self.update();
  }, this._interval);
};

Game.prototype.pause = function () {
  if (this._timer) {
    clearInterval(this._timer);
    this._timer = null;
  }
};

Game.prototype.update = function () {
  this.draw();
  this._world.nextGeneration();
};

Game.prototype.draw = function () {
  var context = this._context;

  context.fillStyle = '#333';
  context.fillRect(0, 0, this._width, this._height);

  for (var row = 0; row < this._rows; row++) {
    for (var col = 0; col < this._cols; col++) {
      var cell = this._world.getCell(col, row);
      var cellSize = this._cellSize;
      context.fillStyle = cell.isLiving() ? 'cyan' : '#111';
      context.fillRect(col * cellSize, row * cellSize, cellSize - 1, cellSize - 1);
    }
  }
};
