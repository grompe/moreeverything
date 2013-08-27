

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
	arsmagica          : init("Ars Magica", Packages.mithion.arsmagica.AMCore)
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
      m.bloodwood   = FindIntMatch(/I:"Bloodwood Block"=(\d+)/);
      m.redwood     = FindIntMatch(/I:"Redwood Block"=(\d+)/);
      m.wood        = FindIntMatch(/I:"Wood Block"=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/Natura.txt", logLevel.warning);
    }
  }
  if (m = mods.extrabiomesxl)
  {
    if (GetFile("extrabiomes/extrabiomes.cfg"))
    {
      m.redRock         = FindIntMatch(/I:redrock.id=(\d+)/);
      m.crackedSand     = FindIntMatch(/I:crackedsand.id=(\d+)/)
      m.cattail         = FindIntMatch(/I:cattail.id=(\d+)/);
      m.flower          = FindIntMatch(/I:flower.id=(\d+)/);
      m.grass           = FindIntMatch(/I:grass.id=(\d+)/);
      m.leafPile        = FindIntMatch(/I:leafpile.id=(\d+)/);
      m.woodenSlab      = FindIntMatch(/I:woodslab.id=(\d+)/);
      m.autumnLeaves    = FindIntMatch(/I:autumnleaves.id=(\d+)/);
      m.leaves          = FindIntMatch(/I:greenleaves.id=(\d+)/);
      m.redwoodStairs   = FindIntMatch(/I:redwoodstairs.id=(\d+)/);
      m.firStairs       = FindIntMatch(/I:firstairs.id=(\d+)/);
      m.acaciaStairs    = FindIntMatch(/I:acaciastairs.id=(\d+)/);
      m.redBrickStairs  = FindIntMatch(/I:redrockbrickstairs.id=(\d+)/);
      m.redCobbleStairs = FindIntMatch(/I:redcobblestairs.id=(\d+)/);
      m.sapling         = FindIntMatch(/I:sapling.id=(\d+)/);
      m.wood            = FindIntMatch(/I:customlog.id=(\d+)/);
      m.quarterLog0     = FindIntMatch(/I:quarterlog0.id=(\d+)/);
      m.quarterLog1     = FindIntMatch(/I:quarterlog1.id=(\d+)/);
      m.quarterLog2     = FindIntMatch(/I:quarterlog2.id=(\d+)/);
      m.quarterLog3     = FindIntMatch(/I:quarterlog3.id=(\d+)/);
      m.planks          = FindIntMatch(/I:planks.id=(\d+)/);
      m.redRockSlab     = FindIntMatch(/I:redrockslab.id=(\d+)/);
      m.wall            = FindIntMatch(/I:wall.id=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/extrabiomes/extrabiomes.cfg", logLevel.warning);
    }
  }
  if (m = mods.biomesoplenty)
  {
    if (GetFile("biomesoplenty/main.cfg") || GetFile("BiomesOPlenty.cfg"))
    {
      m.plant            = FindIntMatch(/I:"Plant ID"=(\d+)/);
      m.woodenSlab1      = FindIntMatch(/I:"Wooden Single Slab 1 ID"=(\d+)/);
      m.woodenSlab2      = FindIntMatch(/I:"Wooden Single Slab 2 ID"=(\d+)/);
      m.foliage          = FindIntMatch(/I:"Foliage ID"=(\d+)/);
      m.bamboo           = FindIntMatch(/I:"Bamboo ID"=(\d+)/);
      m.redRock          = FindIntMatch(/I:"Red Rock ID"=(\d+)/);
      m.leaves1          = FindIntMatch(/I:"Leaf Block ID 1"=(\d+)/);
      m.leaves2          = FindIntMatch(/I:"Leaf Block ID 2"=(\d+)/);
      m.leaves3          = FindIntMatch(/I:"Colourized Leaves ID"=(\d+)/);
      m.acaciaStairs     = FindIntMatch(/I:"Acacia Stairs ID"=(\d+)/);
      m.cherryStairs     = FindIntMatch(/I:"Cherry Stairs ID"=(\d+)/);
      m.darkStairs       = FindIntMatch(/I:"Dark Stairs ID"=(\d+)/);
      m.firStairs        = FindIntMatch(/I:"Fir Stairs ID"=(\d+)/);
      m.holyStairs       = FindIntMatch(/I:"Holy Stairs ID"=(\d+)/);
      m.magicStairs      = FindIntMatch(/I:"Magic Stairs ID"=(\d+)/);
      m.mangroveStairs   = FindIntMatch(/I:"Mangrove Stairs ID"=(\d+)/);
      m.palmStairs       = FindIntMatch(/I:"Palm Stairs ID"=(\d+)/);
      m.redwoodStairs    = FindIntMatch(/I:"Redwood Stairs ID"=(\d+)/);
      m.willowStairs     = FindIntMatch(/I:"Willow Stairs ID"=(\d+)/);
      m.mudBrickStairs   = FindIntMatch(/I:"Mud Brick Stairs ID"=(\d+)/);
      m.redBrickStairs   = FindIntMatch(/I:"Red Brick Stairs ID"=(\d+)/);
      m.redCobbleStairs  = FindIntMatch(/I:"Red Cobble Stairs ID"=(\d+)/);
      m.colorizedSapling = FindIntMatch(/I:"Colourized Sapling ID"=(\d+)/);
      m.wood1            = FindIntMatch(/I:"Log Block ID 1"=(\d+)/);
      m.wood2            = FindIntMatch(/I:"Log Block ID 2"=(\d+)/);
      m.wood3            = FindIntMatch(/I:"Log Block ID 3"=(\d+)/);
      m.mudBricks        = FindIntMatch(/I:"Mud Bricks ID"=(\d+)/);
      m.planks           = FindIntMatch(/I:"Planks ID"=(\d+)/);
      m.sapling          = FindIntMatch(/I:"Sapling ID"=(\d+)/);
      m.stoneSlab        = FindIntMatch(/I:"Stone Single Slab ID"=(\d+)/);
      m.miscItems        = FindIntMatch(/I:"Misc Items ID"=(\d+)/)+256;
      m.mudBall          = FindIntMatch(/I:"Mud Ball ID"=(\d+)/)+256;
      m.flower           = FindIntMatch(/I:"Flower ID"=(\d+)/);
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
      m.searedTable  = FindIntMatch(/I:"Seared Table"=(\d+)/);
      m.smeltery     = FindIntMatch(/I:Smeltery=(\d+)/);
      m.stoneTorch   = FindIntMatch(/I:"Stone Torch"=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/TinkersWorkshop.txt", logLevel.warning);
    }
  }
  if (m = mods.twilightforest)
  {
    if (GetFile("TwilightForest.cfg"))
    {
      m.sapling   = FindIntMatch(/I:Sapling=(\d+)/);
      m.wood      = FindIntMatch(/I:Log=(\d+)/);
      m.hedge     = FindIntMatch(/I:Hedge=(\d+)/);
      m.leaves    = FindIntMatch(/I:Leaves=(\d+)/);
      m.mazestone = FindIntMatch(/I:Mazestone=(\d+)/);
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
      m.storageBlock           = FindIntMatch(/I:"Storage Block"=(\d+)/);
    } else {
      m = false;
      log("Couldn't find config/MineFantasy.cfg", logLevel.warning);
    }
  }
  if (m = mods.undergroundbiomes)
  {
    if (GetFile("UndergroundBiomes.cfg") || GetFile("Underground Biomes.cfg"))
    {
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
  
  if (m= mods.arsmagica)
	if(GetFile("ArsMagica/AM_Main.cfg"))
	{
		//coming soon
	} else {
      m = false;
      log("Couldn't find ArsMagica/AM_Main.cfg, logLevel.warning);
    }
})();
