describe('World', function () {
  it('should get cols and rows', function () {
    var world = new World(3, 4);
    assert.equal(3, world.getCols());
    assert.equal(4, world.getRows());
  });

  it('should get cells', function () {
    var world = new World(3, 3);
    assert.equal(9, world.getCells().length);
  });

  it('should return a correct cell', function () {
    var world = new World(3, 3);

    var cell = world.getCell(0, 0);
    assert.equal(0, cell.getCol());
    assert.equal(0, cell.getRow());

    var cell = world.getCell(1, 2);
    assert.equal(1, cell.getCol());
    assert.equal(2, cell.getRow());

    var cell = world.getCell(-1, -1);
    assert.isNull(cell);

    var cell = world.getCell(3, 3);
    assert.isNull(cell);
  });

  it('should become a living cell', function () {
    var world = new World(3, 3);

    world.getCell(0, 0).setLiving(true);
    world.getCell(1, 0).setLiving(true);
    world.getCell(0, 1).setLiving(true);

    assert.isFalse(world.getCell(1, 1).isLiving());

    world.nextGeneration();

    assert.isTrue(world.getCell(1, 1).isLiving());

    assert.isTrue(world.getCell(0, 0).isLiving());
    assert.isTrue(world.getCell(1, 0).isLiving());
    assert.isTrue(world.getCell(0, 1).isLiving());
  });

  it('should be living in the next generation', function () {
    var world = new World(4, 4);

    world.getCell(1, 1).setLiving(true);
    world.getCell(2, 1).setLiving(true);
    world.getCell(1, 2).setLiving(true);
    world.getCell(2, 2).setLiving(true);

    world.nextGeneration();

    assert.isTrue(world.getCell(1, 1).isLiving());
    assert.isTrue(world.getCell(2, 1).isLiving());
    assert.isTrue(world.getCell(1, 2).isLiving());
    assert.isTrue(world.getCell(2, 2).isLiving());
  });

  it('should be dead by underpopulation', function () {
    var world = new World(3, 3);

    world.getCell(1, 1).setLiving(true);
    world.getCell(2, 1).setLiving(true);

    world.nextGeneration();

    assert.isFalse(world.getCell(1, 1).isLiving());
    assert.isFalse(world.getCell(2, 1).isLiving());
  });

  it('should be dead by overpopulation', function () {
    var world = new World(3, 3);

    world.getCell(0, 0).setLiving(true);
    world.getCell(1, 0).setLiving(true);
    world.getCell(2, 0).setLiving(true);
    world.getCell(0, 1).setLiving(true);
    world.getCell(1, 1).setLiving(true);

    world.nextGeneration();

    assert.isFalse(world.getCell(1, 1).isLiving());

    assert.isTrue(world.getCell(0, 0).isLiving());
    assert.isFalse(world.getCell(1, 0).isLiving());
    assert.isTrue(world.getCell(2, 0).isLiving());
    assert.isTrue(world.getCell(0, 1).isLiving());
  });
});
