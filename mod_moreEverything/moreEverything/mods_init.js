
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
    /*
    I:acaciastairs.id=2220
    I:autumnleaves.id=2200
    I:cattail.id=2201

    I:crackedsand.id=255
    I:customlog.id=2208
    I:doubleredrockslab.id=2222
    I:doublewoodslab.id=2217
    I:firstairs.id=2219
    I:flower.id=2202
    I:grass.id=2203
    I:greenleaves.id=2204
    I:leafpile.id=2205
    I:planks.id=2215
    I:quarterlog0.id=2209
    I:quarterlog1.id=2211
    I:quarterlog2.id=2212
    I:quarterlog3.id=2213
    I:quicksand.id=2214
    I:redcobblestairs.id=2223

    I:redrock.id=254
    I:redrockbrickstairs.id=2221
    I:redrockslab.id=2206
    I:redwoodstairs.id=2218
    I:sapling.id=2207
    I:wall.id=2210
    I:woodslab.id=2216
    */
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
      /*

    I:"Acacia Stairs ID"=1952
    I:"Amethyst Ore ID"=1942
    I:"Bamboo ID"=1927
    I:"Cherry Stairs ID"=1953
    I:"Colourized Leaves ID"=1962
    I:"Colourized Sapling ID"=1938
    I:"Dark Stairs ID"=1954
    I:"Fir Stairs ID"=1955
    I:"Flower ID"=1921
    I:"Foliage ID"=1925
    I:"Fruit Leaf Block ID"=1926
    I:"Holy Stairs ID"=1956
    I:"Leaf Block ID 1"=1923
    I:"Leaf Block ID 2"=1924
    I:"Log Block ID 1"=1933
    I:"Log Block ID 2"=1934
    I:"Log Block ID 3"=1935
    I:"Magic Stairs ID"=1957
    I:"Mangrove Stairs ID"=1958
    I:"Moss ID"=4095
    I:"Mud Brick Stairs ID"=1929
    I:"Mud Bricks ID"=1928
    I:"Palm Stairs ID"=1959
    I:"Petal ID"=1936
    I:"Planks ID"=1947
    I:"Plant ID"=1920
    I:"Promised Land Portal ID"=1941
    I:"Red Brick Stairs ID"=1940
    I:"Red Cobble Stairs ID"=1939
    I:"Redwood Stairs ID"=1960
    I:"Sapling ID"=1937
    I:"Stone Double Slab ID"=1930
    I:"Stone Single Slab ID"=1931
    I:"Tree Moss ID"=1932
    I:"Willow ID"=1922
    I:"Willow Stairs ID"=1961
    I:"Wooden Double Slab 1 ID"=1948
    I:"Wooden Double Slab 2 ID"=1950
    I:"Wooden Single Slab 1 ID"=1949
    I:"Wooden Single Slab 2 ID"=1951
    
    I:"Misc Items ID"=21010
    I:"Mud Ball ID"=21011
      
      */
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
      /*
    I:"Held Item Block"=1472
    I:"Lava Tank"=1473
    I:"Liquid Metal Flowing"=1479
    I:"Liquid Metal Still"=1480
    I:"Metal Storage"=1478
    I:"Multi Brick"=1481
    I:"Ore Berry One"=1485
    I:"Ore Berry Two"=1486
    I:"Ores Gravel"=1488
    I:"Ores Slag"=1475
    I:"Seared Table"=1477
    I:Smeltery=1474
    I:"Special Soil"=1476
    I:"Speed Block"=1489
    I:"Stone Torch"=1484
    I:"Wood Tool Station"=1471
      */
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
      /*
    I:BossSpawner=2167
    I:Cicada=2171
    I:Critter=2160
    I:FireJet=2173
    I:FireflyJar=2168
    I:Hedge=2166
    I:Leaves=2164
    I:Log=2163
    I:MagicLeaves=2177
    I:MagicLog=2176
    I:MagicLogSpecial=2179
    I:Mazestone=2165
    I:Moonworm=2178
    I:Nagastone=2174
    I:Plant=2169
    I:Portal=2162
    I:Roots=2170
    I:Sapling=2175
    I:TowerAntenna=2182
    I:TowerDevice=2181
    I:TowerTranslucent=2183
    I:TowerWood=2180
    I:Trophy=2184
    I:UncraftingTable=2172
      */
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