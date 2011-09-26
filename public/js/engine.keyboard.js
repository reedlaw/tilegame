engine.keyboard = {};   // keyboard object



engine.keyboard.getValue = function(key)
{
  switch(key)
  {
  case 'up':    return 38;
  case 'down':  return 40;
  case 'left':  return 37;
  case 'right': return 39;
  case 'space': return 32;
    // more keys here later
  }
};


engine.keyboard.parseInput = function(event)
{
  switch(event.keyCode)
  {
  case engine.keyboard.getValue('up'):
    engine.viewport.y--;
    engine.player.spriteIndex = 0;
    break;

  case engine.keyboard.getValue('down'):
    engine.viewport.y++
    engine.player.spriteIndex = 6;
    break;

  case engine.keyboard.getValue('left'):
    engine.viewport.x--;
    engine.player.spriteIndex = 9;
    break;

  case engine.keyboard.getValue('right'):
    engine.viewport.x++;
    engine.player.spriteIndex = 3;
    break;

  case engine.keyboard.getValue('space'):
    var loc = engine.player.calcLoc();
    var x = Math.floor(loc.left/16) + engine.viewport.x;
    var y = Math.floor(loc.top/16) + engine.viewport.y;
    engine.currentMap[y][x] = {ground: 1}
    break;
  }

  engine.draw();
};
