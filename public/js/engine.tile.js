engine.tile = {};

engine.tile.draw = function(x, y, tile) {
  /*
    calculate the 'real' locations of this tile. Result is the
    location in pixels.
  */

  var rx = x * 16 + engine.viewport.playerOffsetX;
  var ry = y * 16 + engine.viewport.playerOffsetY;


  engine.handle.drawImage(engine.tile.retrieve(tile.ground), rx, ry);

  if(tile.item)
  {
    engine.handle.drawImage(engine.tile.retrieve(tile.item), rx, ry);
  }
}

engine.tile.images = [];

engine.tile.store = function(id, imgSrc) {
  var newid = engine.tile.images.length;
  var tile  = [id, new Image(), false];   // format as explained: [id, Image, loaded]
  
  tile[1].src    = imgSrc;
  
  tile[1].onload = function() {
    tile[2] = true;
  }

  engine.tile.images[newid] = tile;   // store this tile
};

engine.tile.retrieve = function(id) {
  var i, len = engine.tile.images.length;
  for(i=0; i<len; i++) {
    if(engine.tile.images[i][0] == id) {
      return engine.tile.images[i][1];   // return the image object
    }
  }
};


engine.tile.allLoaded = function() {
  var i, len = engine.tile.images.length;
  for(i=0; i<len; i++) {
    if(engine.tile.images[i][2] === false) {
      return false;
    }
  }  
  return true;
};
