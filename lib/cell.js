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

Cell.prototype.north_west = function () {
  return this._world.getCell(this._col - 1, this._row - 1);
};

Cell.prototype.north = function () {
  return this._world.getCell(this._col, this._row - 1);
};

Cell.prototype.north_east = function () {
  return this._world.getCell(this._col + 1, this._row - 1);
};

Cell.prototype.west = function () {
  return this._world.getCell(this._col - 1, this._row);
};

Cell.prototype.east = function () {
  return this._world.getCell(this._col + 1, this._row);
};

Cell.prototype.south_west = function () {
  return this._world.getCell(this._col - 1, this._row + 1);
};

Cell.prototype.south = function () {
  return this._world.getCell(this._col, this._row + 1);
};

Cell.prototype.south_east = function () {
  return this._world.getCell(this._col + 1, this._row + 1);
};

Cell.prototype.getNeighbors = function () {
  if (!this._neighbors) {
    this._neighbors = [
      this.north_west(), this.north(), this.north_east(),
      this.west(), this.east(),
      this.south_west(), this.south(), this.south_east()
    ].filter(function (cell) { return !!cell; });
  }

  return this._neighbors;
};

Cell.prototype.getLivingNeighbors = function () {
  return this.getNeighbors().filter(function (cell) { return cell.isLiving(); });
};
