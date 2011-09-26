engine.player = {};

engine.player.sprite = [];   // will hold all 12 images

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


