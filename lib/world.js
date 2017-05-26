function World(cols, rows) {
  this._cols = cols;
  this._rows = rows;
  this._table = [];
  this._cells = null;

  for (var row = 0; row < rows; row++) {
    this._table.push([]);

    for (var col = 0; col < cols; col++) {
      this._table[row][col] = new Cell(this, col, row);
    }
  }
}

World.prototype.getCols = function () {
  return this._cols;
};

World.prototype.getRows = function () {
  return this._rows;
};

World.prototype.getCell = function (col, row) {
  if (0 <= col && col < this._cols && 0 <= row && row < this._rows) {
    return this._table[row][col];
  } else {
    return null;
  }
};

World.prototype.getCells = function () {
  if (!this._cells) {
    var temp = [];

    this._table.forEach(function (row) {
      row.forEach(function (cell) {
        temp.push(cell);
      });
    });

    this._cells = temp;
  }

  return this._cells;
};

World.prototype.nextGeneration = function () {
  var temp = [];

  this.getCells().forEach(function (cell) {
    var livingNeighbors = cell.getLivingNeighbors();

    if (!cell.isLiving() && livingNeighbors.length === 3) {
      temp.push(cell);
    } else if (cell.isLiving() && (livingNeighbors.length <= 1 || 4 <= livingNeighbors.length)) {
      temp.push(cell);
    }
  });

  temp.forEach(function (cell) {
    cell.toggleLiving();
  });
};

World.prototype.randomize = function () {
  this.getCells().forEach(function (cell) {
    cell.setLiving(Math.round(Math.random()));
  });
};

World.prototype.clear = function () {
  this.getCells().forEach(function (cell) {
    cell.setLiving(false);
  });
};
