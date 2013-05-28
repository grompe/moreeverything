
var mods;

(function(){
  // If mod exists, make storage for mod-specific variables such as item IDs
  function init(name, pkg)
  {
    if (isEmpty(pkg)) return false;
    log("Found mod "+name+".", logLevel.debug);
    return {};
  }
  
  mods =
  {
    equivalentexchange : init("Equivalent Exchange 3", Packages.com.pahimar.ee3.EquivalentExchange3),
    thaumcraft         : init("Thaumcraft", Packages.thaumcraft.common.Thaumcraft),
    natura             : init("Natura", Packages.mods.natura.Natura),
    extrabiomesxl      : init("ExtraBiomesXL", Packages.extrabiomes.Extrabiomes),
    biomesoplenty      : init("Biomes O' Plenty", Packages.biomesoplenty.BiomesOPlenty),
    tinkersconstruct   : init("Tinkers' Construct", Packages.mods.tinker.tconstruct.TConstruct),
    twilightforest     : init("Twilight Forest", Packages.twilightforest.TwilightForestMod),
    buildcraft         : init("Buildcraft", Packages.buildcraft.BuildCraftCore),
    minefantasy        : init("MineFantasy", Packages.minefantasy.MineFantasyBase),
    undergroundbiomes  : init("Underground Biomes", Packages.exterminatorJeff.undergroundBiomes.common.UndergroundBiomes)
  };
  var m;
  if (m = mods.equivalentexchange)
  {
    if (GetFile("EE3/EE3.cfg") || GetFile("EE3.cfg"))
    {
      m.miniumStone = QFindIntMatch(/I:stoneMinium=(\d+)/) || FindIntMatch(/I:miniumStone=(\d+)/);
      m.philosophersStone = QFindIntMatch(/I:stonePhilosophers=(\d+)/) || FindIntMatch(/I:philStone=(\d+)/);
      m.inertStone = QFindIntMatch(/I:stoneInert=(\d+)/) || FindIntMatch(/I:inertStone=(\d+)/);
      m.miniumShard = QFindIntMatch(/I:shardMinium=(\d+)/) || FindIntMatch(/I:miniumShard=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/EE3/EE3.cfg or config/EE3.cfg", logLevel.warning);
    }
  }
  if (m = mods.thaumcraft)
  {
    if (GetFile("Thaumcraft.cfg"))
    {
      m.shard         = FindIntMatch(/I:ItemShard=(\d+)/)+256;
      m.marker        = FindIntMatch(/I:BlockMarker=(\d+)/);
      m.candle        = FindIntMatch(/I:BlockCandle=(\d+)/);
      m.secure        = FindIntMatch(/I:BlockSecure=(\d+)/);
      m.crystal       = FindIntMatch(/I:BlockCrystal=(\d+)/);
      m.cosmeticSolid = QFindIntMatch(/I:BlockCosmeticSolid=(\d+)/);
      m.customPlant   = FindIntMatch(/I:BlockCustomPlant=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/Thaumcraft.cfg", logLevel.warning);
    }
  }
  if (m = mods.natura)
  {
    if (GetFile("Natura.txt"))
    {
      m.foodItems   = FindIntMatch(/I:"Food Items"=(\d+)/)+256;
      m.barleySeeds = FindIntMatch(/I:"Barley Seed"=(\d+)/)+256;
      m.cloud       = FindIntMatch(/I:"Cloud Block"=(\d+)/);
      m.sapling     = FindIntMatch(/I:Sapling=(\d+)/);
      m.door        = FindIntMatch(/I:"Door Item"=(\d+)/)+256;
    } else {
      m = false;
      log("Couldn't find config/Natura.txt", logLevel.warning);
    }
  }
  if (m = mods.extrabiomesxl)
  {
    if (GetFile("extrabiomes/extrabiomes.cfg"))
    {
      m.redRock     = FindIntMatch(/I:redrock.id=(\d+)/);
      m.crackedSand = FindIntMatch(/I:crackedsand.id=(\d+)/)
      m.cattail     = FindIntMatch(/I:cattail.id=(\d+)/);
      m.flower      = FindIntMatch(/I:flower.id=(\d+)/);
      m.grass       = FindIntMatch(/I:grass.id=(\d+)/);
      m.leafPile    = FindIntMatch(/I:leafpile.id=(\d+)/);
      m.woodenSlab  = FindIntMatch(/I:woodslab.id=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/extrabiomes/extrabiomes.cfg", logLevel.warning);
    }
  }
  if (m = mods.biomesoplenty)
  {
    if (GetFile("BiomesOPlenty.cfg"))
    {
      m.plant       = FindIntMatch(/I:"Plant ID"=(\d+)/);
      m.woodenSlab1 = FindIntMatch(/I:"Wooden Single Slab 1 ID"=(\d+)/);
      m.woodenSlab2 = FindIntMatch(/I:"Wooden Single Slab 2 ID"=(\d+)/);
      m.foliage     = FindIntMatch(/I:"Foliage ID"=(\d+)/);
      m.bamboo      = FindIntMatch(/I:"Bamboo ID"=(\d+)/);
      m.redRock     = FindIntMatch(/I:"Red Rock ID"=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/BiomesOPlenty.cfg", logLevel.warning);
    }
  }
  if (m = mods.tinkersconstruct)
  {
    if (GetFile("TinkersWorkshop.txt"))
    {
      m.manual       = FindIntMatch(/I:"Tinker's Manual"=(\d+)/)+256;
      m.blankPattern = FindIntMatch(/I:"Blank Patterns"=(\d+)/)+256;
      m.woodPattern  = FindIntMatch(/I:"Wood Pattern"=(\d+)/)+256;
      m.materials    = FindIntMatch(/I:Materials=(\d+)/)+256;
    } else {
      m = false;
      log("Couldn't find config/TinkersWorkshop.txt", logLevel.warning);
    }
  }
  if (m = mods.twilightforest)
  {
    if (GetFile("TwilightForest.cfg"))
    {
      m.sapling = FindIntMatch(/I:Sapling=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/TwilightForest.cfg", logLevel.warning);
    }
  }
  if (m = mods.buildcraft)
  {
    if (GetFile("buildcraft/main.conf"))
    {
      m.woodenGear = FindIntMatch(/I:woodenGearItem.id=(\d+)/)+256;
    } else {
      m = false;
      log("Couldn't find config/buildcraft/main.conf", logLevel.warning);
    }
  }
  if (m = mods.minefantasy)
  {
    if (GetFile("MineFantasy.cfg"))
    {
      m.herb                   = FindIntMatch(/I:Herb=(\d+)/);
      m.sapling                = FindIntMatch(/I:Sapling=(\d+)/);
      m.hayRoof                = FindIntMatch(/I:"Hay Roof"=(\d+)/);
      m.itemBaseId             = FindIntMatch(/I:"Item Base Id"=(\d+)/)+256;
      m.cobblestoneBricks      = FindIntMatch(/I:"Cobblestone Bricks"=(\d+)/);
      m.graniteBricks          = FindIntMatch(/I:"Granite Bricks"=(\d+)/);
      m.ironbarkWood           = FindIntMatch(/I:Ironbark=(\d+)/);
      m.ironbarkPlanks         = FindIntMatch(/I:Planks=(\d+)/);
      m.stoneStairs            = FindIntMatch(/I:"Stone Stairs"=(\d+)/);
      m.cobblestoneBrickStairs = FindIntMatch(/I:"Cobblestone Brick Stairs"=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/MineFantasy.cfg", logLevel.warning);
    }
  }
  if (m = mods.undergroundbiomes)
  {
    if (GetFile("UndergroundBiomes.cfg") || GetFile("Underground Biomes.cfg"))
    {
      m.anthracite             = FindIntMatch(/I:"Anthracite Block ID:"=(\d+)/);
      m.igneousBrick           = FindIntMatch(/I:"Igneous Brick ID:"=(\d+)/);
      m.igneousCobblestone     = FindIntMatch(/I:"Igneous Cobblestone ID:"=(\d+)/);
      m.igneousBrickSlab       = FindIntMatch(/I:"Igneous Stone Brick Slab ID .half.:"=(\d+)/);
      m.igneousStone           = FindIntMatch(/I:"Igneous Stone ID:"=(\d+)/);
      m.lignite                = FindIntMatch(/I:"Lignite Item ID:"=(\d+)/)+256;
      m.metamorphicBrick       = FindIntMatch(/I:"Metamorphic Brick ID:"=(\d+)/);
      m.metamorphicCobblestone = FindIntMatch(/I:"Metamorphic Cobblestone ID:"=(\d+)/);
      m.metamorphicStoneSlab   = FindIntMatch(/I:"Metamorphic Stone Brick Slab ID .half.:"=(\d+)/);
      m.metamorphicStone       = FindIntMatch(/I:"Metamorphic Stone ID:"=(\d+)/);
      m.sedimentaryStone       = FindIntMatch(/I:"Sedimentary Stone ID:"=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/UndergroundBiomes.cfg or config/Underground Biomes.cfg", logLevel.warning);
    }
  }
})();