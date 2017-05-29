function Cell(world, col, row) {
  this._col = col;
  this._row = row;
  this._world = world;
  this._living = false;
  this._neighbors = null;
}

Cell.prototype.getCol = function () {
  return this._col;
};

Cell.prototype.getRow = function () {
  return this._row;
};

Cell.prototype.getPos = function () {
  return [this.getCol(), this.getRow()];
};

Cell.prototype.isLiving = function () {
  return this._living;
};

Cell.prototype.setLiving = function (state) {
  this._living = state;
};

Cell.prototype.toggleLiving = function () {
  this._living = !this._living;
};

Cell.prototype.northWest = function () {
  return this._world.getCell(this._col - 1, this._row - 1);
};

Cell.prototype.north = function () {
  return this._world.getCell(this._col, this._row - 1);
};

Cell.prototype.northEast = function () {
  return this._world.getCell(this._col + 1, this._row - 1);
};

Cell.prototype.west = function () {
  return this._world.getCell(this._col - 1, this._row);
};

Cell.prototype.east = function () {
  return this._world.getCell(this._col + 1, this._row);
};

Cell.prototype.southWest = function () {
  return this._world.getCell(this._col - 1, this._row + 1);
};

Cell.prototype.south = function () {
  return this._world.getCell(this._col, this._row + 1);
};

Cell.prototype.southEast = function () {
  return this._world.getCell(this._col + 1, this._row + 1);
};

Cell.prototype.getNeighbors = function () {
  if (!this._neighbors) {
    this._neighbors = [
      this.northWest(), this.north(), this.northEast(),
      this.west(), this.east(),
      this.southWest(), this.south(), this.southEast()
    ].filter(function (cell) { return !!cell; });
  }

  return this._neighbors;
};

Cell.prototype.getLivingNeighbors = function () {
  return this.getNeighbors().filter(function (cell) { return cell.isLiving(); });
};
