engine.map = {};

engine.map.draw = function(mapData)
{
  var i, j;

  var mapX = 0;
  var mapY = 0;
  var tile;

  engine.output('drawing map from ' + engine.viewport.x + ',' + engine.viewport.y + ' to ' + (engine.viewport.x + engine.screen.tilesX) + ',' + (engine.viewport.y + engine.screen.tilesY));

  for(j=0; j<engine.screen.tilesY; j++)
  {
    for(i=0; i<engine.screen.tilesX; i++)
    {
      mapX = i + engine.viewport.x;
      mapY = j + engine.viewport.y;

      tile = (engine.currentMap[mapY] && engine.currentMap[mapY][mapX]) ? engine.currentMap[mapY][mapX] : {ground: 0};


      engine.tile.draw(i, j, tile);
    }
  }
};

