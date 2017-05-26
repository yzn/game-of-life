describe('Cell', function () {
  it('should be able to change living state', function () {
    var world = new World(3, 3);
    var cell = world.getCell(1, 1);
    assert.isFalse(cell.isLiving());
    cell.setLiving(true);
    assert.isTrue(cell.isLiving());
    cell.toggleLiving();
    assert.isFalse(cell.isLiving());
  });

  it('should return neighbors in 1x1 world', function () {
    var world = new World(1, 1);
    var cell = world.getCell(0, 0);
    assert.deepEqual([], cell.getNeighbors());
  });

  it('should return neighbors in 2x2 world', function () {
    var world = new World(2, 2);
    var testCases = [
      [[0, 0], [[1, 0], [0, 1], [1, 1]]],
      [[1, 0], [[0, 0], [0, 1], [1, 1]]],
      [[0, 1], [[0, 0], [1, 0], [1, 1]]],
      [[1, 1], [[0, 0], [1, 0], [0, 1]]]
    ]
    testCases.forEach(function (testCase) {
      var point = testCase[0];
      var target = world.getCell(point[0], point[1]);
      var expected = testCase[1];
      var neighbors = target.getNeighbors().map(function (cell) { return cell.getPos(); });
      assert.sameDeepMembers(expected, neighbors);
    });
  });

  it('should return neighbors in 3x3 world', function () {
    var world = new World(3, 3);
    var testCases = [
      [[0, 0], [[1, 0], [0, 1], [1, 1]]],
      [[1, 0], [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]]],
      [[2, 0], [[1, 0], [1, 1], [2, 1]]],
      [[0, 1], [[0, 0], [1, 0], [1, 1], [0, 2], [1, 2]]],
      [[1, 1], [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]]],
      [[2, 1], [[1, 0], [2, 0], [1, 1], [1, 2], [2, 2]]],
      [[0, 2], [[0, 1], [1, 1], [1, 2]]],
      [[1, 2], [[0, 1], [1, 1], [2, 1], [0, 2], [2, 2]]],
      [[2, 2], [[1, 1], [2, 1], [1, 2]]]
    ]
    testCases.forEach(function (testCase) {
      var point = testCase[0];
      var target = world.getCell(point[0], point[1]);
      var expected = testCase[1];
      var neighbors = target.getNeighbors().map(function (cell) { return cell.getPos(); });
      assert.sameDeepMembers(expected, neighbors);
    });
  });

  it('should return living neighbors', function () {
    var world = new World(3, 3);
    world.getCell(0, 0).setLiving(true);
    world.getCell(1, 0).setLiving(true);
    world.getCell(0, 1).setLiving(true);
    var cell = world.getCell(1, 1);
    var livingNeighbors = cell.getLivingNeighbors().map(function (cell) { return cell.getPos(); });
    assert.sameDeepMembers([[0, 0], [1, 0], [0, 1]], livingNeighbors);
  });
});
