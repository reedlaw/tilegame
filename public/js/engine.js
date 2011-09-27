
var engine = {};


engine.outhnd = document.getElementById('output');
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.currentMap = null;  // no map data yet

engine.setMap = function(mapData)
{
  engine.currentMap = mapData;
};

engine.output = function(message)
{
  engine.outhnd.innerHTML += message + '<br />';
};


engine.draw = function() 
{ 
  if(engine.tile.allLoaded() === false) 
  { 
    setTimeout(engine.draw, 100); // wait 100 ms 
  }else{ 
    engine.map.draw(); 
    engine.player.draw();
  } 
};

engine.start = function(mapData, x, y)
{
  engine.output('loading...');
  engine.viewport.x = x;
  engine.viewport.y = y;

  engine.player.store(0, 'images/scientist_n0.png');
  engine.player.store(1, 'images/scientist_n1.png');
  engine.player.store(2, 'images/scientist_n2.png');

  engine.player.store(3, 'images/scientist_e0.png');
  engine.player.store(4, 'images/scientist_e1.png');
  engine.player.store(5, 'images/scientist_e2.png');

  engine.player.store(6, 'images/scientist_s0.png');
  engine.player.store(7, 'images/scientist_s1.png');
  engine.player.store(8, 'images/scientist_s2.png');

  engine.player.store(9,  'images/scientist_w0.png');
  engine.player.store(10, 'images/scientist_w1.png');
  engine.player.store(11, 'images/scientist_w2.png');

  engine.tile.store(0, 'images/tile_black.png');
  engine.tile.store(1, 'images/tile_grass.png');
  engine.tile.store(2, 'images/tile_rock.png');

  engine.setMap(mapData);
  engine.draw();
  engine.keyboard.canInput = true;

  engine.output('done');
};


