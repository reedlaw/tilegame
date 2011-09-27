engine.player = {};

engine.player.sprite = [];   // will hold all 12 images

engine.player.leftLeg = false;

engine.player.store = function(index, imgSrc)
{
  var sprite = [new Image(), false];

  sprite[0].src    = imgSrc;
  sprite[0].onload = function()
  {
    sprite[1] = true;
  }

  engine.player.sprite[index] = sprite;
};

engine.player.retrieve = function(index)
{
  return engine.player.sprite[index][0];   // that was easy!
};

engine.player.allLoaded = function()
{
  var i;

  for(i=0; i<12; i++)
  {
    if(engine.player.sprite[i][1] === false)
    {
      return false;
    }
  }

  return true;
};

engine.player.calcLoc = function()
{
  var character = {
    width:  Math.ceil(engine.player.sprite[0][0].width),
    height: Math.ceil(engine.player.sprite[0][0].height)
  };

  var screen = {
    width:  engine.screen.tilesX * 16,
    height: engine.screen.tilesY * 16
  };

  var x = (screen.width  / 2) - (character.width / 2);
  var y = (screen.height / 2) + 8 - (character.height);

  return {left: x, top: y};
};

engine.player.spriteIndex = 6;   // looking down

engine.player.draw = function()
{
  var loc = engine.player.calcLoc();

  engine.handle.drawImage(engine.player.sprite[engine.player.spriteIndex][0], loc.left, loc.top);
};

engine.player.move = function(direction)
{
  var index, x, y;

  index = x = y = 0;   // set all to 0
  engine.keyboard.canInput = false; 
  switch(direction)
  {
  case 'up':      index = 0;   y =  5;   break;
  case 'right':   index = 3;   x = -5;   break;
  case 'left':    index = 9;   x =  5;   break;
  case 'down':    index = 6;   y = -5;   break;
  }

  engine.player.spriteIndex     = index;
  engine.viewport.playerOffsetX = x;
  engine.viewport.playerOffsetY = y;

  setTimeout(engine.player.animate, 100);   // animation that shows the leg
  setTimeout(function() {engine.player.reset(direction)}, 200);   // 'reset' animation

  engine.draw();
};

engine.player.animate = function()
{
  var x, y

  x = y = 0;

  switch(engine.player.spriteIndex)
  {
  case 0:   y =  11;   break;   // 11 = (6 from the player.move) + 5
  case 3:   x = -11;   break;
  case 6:   y = -11;   break;
  case 9:   x =  11;   break;
  }

  /*
    some magic now: if the leg == false (right leg), then add one
    to the sprite index. Else: add two; this way we have a generic
    expression that works for every sprite index.
  */
  engine.player.spriteIndex += (engine.player.leftLeg === true) ? 1 : 2;

  // switch legs; true -> false and false -> true (because !true == false). Hurray for logic!
  engine.player.leftLeg = !engine.player.leftLeg;

  engine.viewport.playerOffsetX = x;
  engine.viewport.playerOffsetY = y;

  engine.draw();
};

engine.player.reset = function(direction)
{
  var index, x, y;

  x     = engine.viewport.x;
  y     = engine.viewport.y;
  index = 0;
  
  switch(engine.player.spriteIndex)
  {
  case 1:
  case 2:   y--;   index = 0;   break;

  case 4:
  case 5:   x++;   index = 3;   break;

  case 7:
  case 8:   y++;   index = 6;   break;

  case 10:
  case 11:   x--;   index = 9;   break;
  }

  engine.viewport.x = x;   // do the 'real' move
  engine.viewport.y = y;
  
  engine.keyboard.canInput = true;

  engine.viewport.playerOffsetX = 0;   // reset pixel offsets
  engine.viewport.playerOffsetY = 0;

  engine.player.spriteIndex = index;   // set normal direction 'facing' image

  if(engine.keyboard.fired) {
    engine.player.move(direction);
  } 

  engine.draw();
};
