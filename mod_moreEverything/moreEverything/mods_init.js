
var mods;

(function(){
  // If mod exists, make storage for mod-specific variables such as item IDs
  function init(pkg)
  {
    return isEmpty(pkg) ? false : {};
  }
  
  mods =
  {
    equivalentexchange : init(Packages.com.pahimar.ee3.EquivalentExchange3),
    thaumcraft         : init(Packages.thaumcraft.common.Thaumcraft),
    natura             : init(Packages.mods.natura.Natura),
    extrabiomesxl      : init(Packages.extrabiomes.Extrabiomes),
    biomesoplenty      : init(Packages.biomesoplenty.BiomesOPlenty),
    tinkersconstruct   : init(Packages.mods.tinker.tconstruct.TConstruct),
    twilightforest     : init(Packages.twilightforest.TwilightForestMod),
    buildcraft         : init(Packages.buildcraft.BuildCraftCore),
    minefantasy        : init(Packages.minefantasy.MineFantasyBase),
    undergroundbiomes  : init(Packages.exterminatorJeff.undergroundBiomes.common.UndergroundBiomes)
  };

  if (mods.equivalentexchange && GetFile("EE3/EE3.cfg"))
  {
    mods.equivalentexchange.miniumStone = FindIntMatch(/I:stoneMinium=(\d+)/);
    mods.equivalentexchange.philosophersStone = FindIntMatch(/I:stonePhilosophers=(\d+)/);
    mods.equivalentexchange.inertStone = FindIntMatch(/I:stoneInert=(\d+)/);
    mods.equivalentexchange.miniumShard = FindIntMatch(/I:shardMinium=(\d+)/);
  }

  if (mods.thaumcraft && GetFile("Thaumcraft.cfg"))
  {
  }

  if (mods.natura && GetFile("Natura.txt"))
  {
  }

  if (mods.extrabiomesxl && GetFile("extrabiomes/extrabiomes.cfg"))
  {
  }

  if (mods.biomesoplenty && GetFile("BiomesOPlenty.cfg"))
  {
  }
  
  if (mods.tinkersconstruct && GetFile("TinkersWorkshop.txt"))
  {
  }

  if (mods.twilightforest && GetFile("TwilightForest.cfg"))
  {
  }

  if (mods.buildcraft && GetFile("buildcraft/main.conf"))
  {
  }

  if (mods.minefantasy && GetFile("MineFantasy.cfg"))
  {
  }

  if (mods.undergroundbiomes && GetFile("UndergroundBiomes.cfg"))
  {
  }

})();