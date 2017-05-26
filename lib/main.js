window.addEventListener('load', function () {
  var game = new Game(document.getElementById('world'));

  var playButton = document.getElementById('play');
  playButton.addEventListener('click', function () {
    if (game.isRunning()) {
      game.pause();
      playButton.textContent = 'Play';
    } else {
      game.play();
      playButton.textContent = 'Pause';
    }
  }, false);

  var stepButton = document.getElementById('step');
  stepButton.addEventListener('click', function () {
    game.pause();
    playButton.textContent = 'Play';
    game.update();
  }, false);

  var resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function () {
    game.reset();
    playButton.textContent = 'Play';
  });
}, false);
