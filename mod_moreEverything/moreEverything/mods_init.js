
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
    mods.thaumcraft.shard         = FindIntMatch(/I:ItemShard=(\d+)/)+256;
    mods.thaumcraft.marker        = FindIntMatch(/I:BlockMarker=(\d+)/);
    mods.thaumcraft.candle        = FindIntMatch(/I:BlockCandle=(\d+)/);
    mods.thaumcraft.secure        = FindIntMatch(/I:BlockSecure=(\d+)/);
    mods.thaumcraft.crystal       = FindIntMatch(/I:BlockCrystal=(\d+)/);
    mods.thaumcraft.cosmeticSolid = FindIntMatch(/I:BlockCosmeticSolid=(\d+)/);
    mods.thaumcraft.customPlant   = FindIntMatch(/I:BlockCustomPlant=(\d+)/);
  }

  if (mods.natura && GetFile("Natura.txt"))
  {
    mods.natura.foodItems   = FindIntMatch(/I:"Food Items"=(\d+)/)+256;
    mods.natura.barleySeeds = FindIntMatch(/I:"Barley Seed"=(\d+)/)+256;
    mods.natura.cloud       = FindIntMatch(/I:"Cloud Block"=(\d+)/);
    mods.natura.sapling     = FindIntMatch(/I:Sapling=(\d+)/);
    mods.natura.door        = FindIntMatch(/I:"Door Item"=(\d+)/)+256;
  }

  if (mods.extrabiomesxl && GetFile("extrabiomes/extrabiomes.cfg"))
  {
    mods.extrabiomesxl.redRock     = FindIntMatch(/I:redrock.id=(\d+)/);
    mods.extrabiomesxl.crackedSand = FindIntMatch(/I:crackedsand.id=(\d+)/)
    mods.extrabiomesxl.cattail     = FindIntMatch(/I:cattail.id=(\d+)/);
    mods.extrabiomesxl.flower      = FindIntMatch(/I:flower.id=(\d+)/);
    mods.extrabiomesxl.grass       = FindIntMatch(/I:grass.id=(\d+)/);
    mods.extrabiomesxl.leafPile    = FindIntMatch(/I:leafpile.id=(\d+)/);
    mods.extrabiomesxl.woodenSlab  = FindIntMatch(/I:woodslab.id=(\d+)/);
  }

  if (mods.biomesoplenty && GetFile("BiomesOPlenty.cfg"))
  {
    mods.biomesoplenty.plant       = FindIntMatch(/I:"Plant ID"=(\d+)/);
    mods.biomesoplenty.woodenSlab1 = FindIntMatch(/I:"Wooden Single Slab 1 ID"=(\d+)/);
    mods.biomesoplenty.woodenSlab2 = FindIntMatch(/I:"Wooden Single Slab 2 ID"=(\d+)/);
    mods.biomesoplenty.foliage     = FindIntMatch(/I:"Foliage ID"=(\d+)/);
    mods.biomesoplenty.bamboo      = FindIntMatch(/I:"Bamboo ID"=(\d+)/);
  }
  
  if (mods.tinkersconstruct && GetFile("TinkersWorkshop.txt"))
  {
    mods.tinkersconstruct.manual       = FindIntMatch(/I:"Tinker's Manual"=(\d+)/)+256;
    mods.tinkersconstruct.blankPattern = FindIntMatch(/I:"Blank Patterns"=(\d+)/)+256;
    mods.tinkersconstruct.woodPattern  = FindIntMatch(/I:"Wood Pattern"=(\d+)/)+256;
    mods.tinkersconstruct.materials    = FindIntMatch(/I:Materials=(\d+)/)+256;
  }

  if (mods.twilightforest && GetFile("TwilightForest.cfg"))
  {
    mods.twilightforest.sapling = FindIntMatch(/I:Sapling=(\d+)/);
  }

  if (mods.buildcraft && GetFile("buildcraft/main.conf"))
  {
    mods.buildcraft.woodenGear = FindIntMatch(/I:woodenGearItem.id=(\d+)/)+256;
  }

  if (mods.minefantasy && GetFile("MineFantasy.cfg"))
  {
    mods.minefantasy.herb       = FindIntMatch(/I:Herb=(\d+)/);
    mods.minefantasy.sapling    = FindIntMatch(/I:Sapling=(\d+)/);
    mods.minefantasy.hayRoof    = FindIntMatch(/I:"Hay Roof"=(\d+)/);
    mods.minefantasy.itemBaseId = FindIntMatch(/I:"Item Base Id"=(\d+)/)+256;
  }

  if (mods.undergroundbiomes && GetFile("UndergroundBiomes.cfg"))
  {
    mods.undergroundbiomes.anthracite             = FindIntMatch(/I:"Anthracite Block ID:"=(\d+)/);
    mods.undergroundbiomes.igneousBrick           = FindIntMatch(/I:"Igneous Brick ID:"=(\d+)/);
    mods.undergroundbiomes.igneousCobblestone     = FindIntMatch(/I:"Igneous Cobblestone ID:"=(\d+)/);
    mods.undergroundbiomes.igneousBrickSlab       = FindIntMatch(/I:"Igneous Stone Brick Slab ID .half.:"=(\d+)/);
    mods.undergroundbiomes.igneousStone           = FindIntMatch(/I:"Igneous Stone ID:"=(\d+)/);
    mods.undergroundbiomes.lignite                = FindIntMatch(/I:"Lignite Item ID:"=(\d+)/)+256;
    mods.undergroundbiomes.metamorphicBrick       = FindIntMatch(/I:"Metamorphic Brick ID:"=(\d+)/);
    mods.undergroundbiomes.metamorphicCobblestone = FindIntMatch(/I:"Metamorphic Cobblestone ID:"=(\d+)/);
    mods.undergroundbiomes.metamorphicStoneSlab   = FindIntMatch(/I:"Metamorphic Stone Brick Slab ID .half.:"=(\d+)/);
    mods.undergroundbiomes.metamorphicStone       = FindIntMatch(/I:"Metamorphic Stone ID:"=(\d+)/);
    mods.undergroundbiomes.sedimentaryStone       = FindIntMatch(/I:"Sedimentary Stone ID:"=(\d+)/);
  }

})();