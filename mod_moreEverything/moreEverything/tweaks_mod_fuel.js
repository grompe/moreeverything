// Mod fuel tweaks
// By Grom PE

(function ()
{
  if (mods.biomesoplenty && GetFile("BiomesOPlenty.cfg"))
  {
    var m = FindIntMatch(/I:"Plant ID"=(\d+)/);
    AddFuel(40, m, 0); // Dead grass
    AddFuel(40, m, 5); // Thorns
    AddFuel(40, m, 6); // Barley
    AddFuel(40, m, 7); // Cattail
    AddFuel(150, FindIntMatch(/I:"Wooden Single Slab 1 ID"=(\d+)/)); // Rebalancing to match vanilla 7.5s
    AddFuel(150, FindIntMatch(/I:"Wooden Single Slab 2 ID"=(\d+)/)); 
    AddFuel(100, FindIntMatch(/I:"Foliage ID"=(\d+)/), 4); // Bush
    AddFuel(100, FindIntMatch(/I:"Bamboo ID"=(\d+)/));
  }

  if (mods.extrabiomesxl && GetFile("extrabiomes/extrabiomes.cfg"))
  {
    AddFuel(40, FindIntMatch(/I:cattail.id=(\d+)/));
    var m = FindIntMatch(/I:flower.id=(\d+)/);
    AddFuel(100, m, 0); // Shrub
    AddFuel(100, m, 5); // Root
    var m = FindIntMatch(/I:grass.id=(\d+)/);
    AddFuel(20, m, 2);  // Short dead grass
    AddFuel(40, m, 3);  // Tall dead grass
    AddFuel(20, m, 4);  // Short yellow dead grass
    AddFuel(40, FindIntMatch(/I:leafpile.id=(\d+)/));
    AddFuel(150, FindIntMatch(/I:woodslab.id=(\d+)/)); // Rebalancing to match vanilla 7.5s
  }

  if (mods.twilightforest && GetFile("TwilightForest.cfg"))
  {
    AddFuel(100, FindIntMatch(/I:Sapling=(\d+)/));
  }

  if (mods.thaumcraft && GetFile("Thaumcraft.cfg"))
  {
    var m = FindIntMatch(/I:BlockCustomPlant=(\d+)/);
    AddFuel(100, m, 0); // Greatwood sapling
    AddFuel(100, m, 1); // Silverwood sapling
  }

  if (mods.natura && GetFile("Natura.txt"))
  {
    AddFuel(100, FindIntMatch(/I:Sapling=(\d+)/));
    AddFuel(40, FindIntMatch(/I:"Food Items"=(\d+)/)+256, 0); // Barley
    AddFuel(300, FindIntMatch(/I:"Door Item"=(\d+)/)+256);
  }

  if (mods.tinkersconstruct && GetFile("TinkersWorkshop.txt"))
  {
    AddFuel(100, FindIntMatch(/I:"Tinker's Manual"=(\d+)/)+256);
    AddFuel(300, FindIntMatch(/I:"Blank Patterns"=(\d+)/)+256, 0);
    // Bug: burns forever for some reason
    //AddFuel(300, FindIntMatch(/I:"Wood Pattern"=(\d+)/)+256);
    AddFuel(160, FindIntMatch(/I:Materials=(\d+)/)+256, 0); // Paper stack
  }

  if (mods.buildcraft && GetFile("buildcraft/main.conf"))
  {
    AddFuel(300, FindIntMatch(/I:woodenGearItem.id=(\d+)/)+256);
  }

  if (mods.minefantasy && GetFile("MineFantasy.cfg"))
  {
    AddFuel(100, FindIntMatch(/I:Sapling=(\d+)/));
    AddFuel(60, FindIntMatch(/I:"Hay Roof"=(\d+)/));
    var m = FindIntMatch(/I:"Item Base Id"=(\d+)/);
    AddFuel(400, m+256+41);      // Blackpowder
    AddFuel(1000, m+256+42, 6);  // Fire essence
    AddFuel(1000, m+256+42, 11); // Ember
    AddFuel(300, m+256+135);     // Ironbark door
  }
})();
