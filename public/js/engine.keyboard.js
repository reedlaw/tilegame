engine.keyboard = {};   // keyboard object

engine.keyboard.fired = false;

engine.keyboard.canInput = false;

engine.keyboard.getValue = function(key) {
  switch(key) {
  case 'up':    return 38; break;
  case 'down':  return 40; break;
  case 'left':  return 37; break;
  case 'right': return 39; break;
  case 'space': return 32; break;
  default:  return false;
  }
};

engine.keyboard.parseInput = function(event) {
  if (!engine.keyboard.fired && engine.keyboard.canInput === true) {
    engine.keyboard.fired = true;
    switch(event.keyCode)
    {
    case engine.keyboard.getValue('up'):
      engine.player.move('up');
      break;

    case engine.keyboard.getValue('down'):
      engine.player.move('down');
      break;

    case engine.keyboard.getValue('left'):
      engine.player.move('left');
      break;

    case engine.keyboard.getValue('right'):
      engine.player.move('right');
      break;

    case engine.keyboard.getValue('space'):
      var loc = engine.player.calcLoc();
      var x = Math.floor(loc.left/16) + engine.viewport.x;
      var y = Math.floor(loc.top/16) + engine.viewport.y;
      engine.currentMap[y][x] = {ground: 1}
      break;

    default:
      return false;
    }
    
    engine.draw();
  }
};

