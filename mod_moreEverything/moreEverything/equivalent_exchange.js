// Equivalent Exchange transmutation addons
// By Grom PE

var AddTransmutation;
var AddTransmutation1to1;
var AddEquivalency;
var MakeMetaCycle;

(function()
{
  if (!mods.equivalentexchange) return;

  AddTransmutation = function(result, input)
  {
    var size;
    if (isJavaClass(input, __itemStack) && ((size = GetItemStackSize(input)) > 1))
    {
      // Convert item stack of size to (size) number of single items
      var id = GetItemID(input);
      var damage = GetItemDamage(input);
      var tmp = [];
      for (var i = 0; i < size; i++) tmp.push(NewItemStack(id, 1, damage));
      input = tmp;
    }
    if (!(input instanceof Array))
    {
      var tmp = [];
      for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
      input = tmp;
    }
    var i1 = input.slice();
    i1.unshift(mods.equivalentexchange.miniumStone);
    var i2 = input.slice();
    i2.unshift(mods.equivalentexchange.philosophersStone);
    return AddShapelessRecipe(result, i1) && AddShapelessRecipe(result, i2);
  };

  AddTransmutation1to1 = function(a, b)
  {
    return AddTransmutation(a, b) && AddTransmutation(b, a);
  };

  AddEquivalency = function(one_or_more_objects_or_arrays)
  {
    var arr = [];
    for (var i = 0; i < arguments.length; i++)
    {
      if (arguments[i] instanceof Array)
      {
        arr = arr.concat(arguments[i]);
      } else {
        arr.push(arguments[i]);
      }
    }
    for (var i=0; i < arr.length; i++)
    {
      if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
    }
    Packages.com.pahimar.ee3.core.handlers.EquivalencyHandler.instance().addObjects(ObjectArray(arr));
    // As moreEverything mod is running late, need to manually add the recipes
    for (var i=0; i < arr.length; i++)
    {
      AddTransmutation(arr[(i+1) % arr.length], arr[i]);
    }
    log("Added equvalency: "+arr, logLevel.debug);
    return true;
  }

  MakeMetaCycle = function(id, numMetaValues, skipMeta_zero_or_more_numbers_or_arrays)
  {
    var skipMeta = {};
    for (var i = 2; i < arguments.length; i++)
    {
      if (arguments[i] instanceof Array)
      {
        for (var j in arguments[i]) skipMeta[arguments[i][j]] = 1;
      } else {
        skipMeta[arguments[i]] = 1;
      }
    }
    result = [];
    for (var i = 0; i < numMetaValues; i++)
    {
      if (i in skipMeta) continue;
      result.push(NewItemStack(id, 1, i));
    }
    return result;
  }

  // Quiet functions that don't throw exceptions
  function QAddTransmutation(result, input)
  {
    var result;
    try { result = AddTransmutation(result, input); }
    catch(e) {};
    return result;
  };
  function QAddTransmutation1to1(a, b)
  {
    var result;
    try { result = AddTransmutation1to1(a, b); }
    catch(e) {};
    return result;
  };

  // EMC values: http://technicpack.wikia.com/wiki/Alchemical_Math

  if (optionalFeature.ee_vanilla_transmutations)
  {
    // Transmutations
    // 1 coal = 2 redstone
    AddTransmutation1to1(NewItemStack(item.coal, 1), NewItemStack(item.redstone, 2));
    // 7 coal = 1 lapis lazuli
    AddTransmutation1to1(NewItemStack(item.dye, 1, dye.lapisLazuli), NewItemStack(item.coal, 7));
    // 3 coal = 1 glowstone dust
    AddTransmutation1to1(item.glowstoneDust, QNewItemStack(item.coal, 3));
    // 6 redstone -> 1 glowstone dust
    AddTransmutation(item.glowstoneDust, ArrayOf(item.redstone, 6));
  }
  if (optionalFeature.ee_vanilla_uncrafting)
  {
    // Simple uncrafting
    QAddTransmutation(NewItemStack(item.glass, 3), ArrayOf(item.glassPane, 8));
    QAddTransmutation(QNewItemStack(item.netherBrick, 4), item.netherBricks);
    QAddTransmutation(item.netherrack, item.netherBrick);
    QAddTransmutation(item.clay, item.brick);
    QAddTransmutation(QNewItemStack(item.stick, 3), item.fence);
    QAddTransmutation(QNewItemStack(item.netherQuartz, 4), QNewItemStack(item.quartzBlock, 1));
    QAddTransmutation(item.quartzBlock, item.quartzBlock);
    if (optionalFeature.ee_stairs_slabs_walls_uncrafting)
    {
      QAddTransmutation(item.stone,        QNewItemStack(item.slab, 2, 0));
      QAddTransmutation(item.sandstone,    QNewItemStack(item.slab, 2, 1));
      QAddTransmutation(item.woodPlanks,   QNewItemStack(item.slab, 2, 2));
      QAddTransmutation(item.cobblestone,  QNewItemStack(item.slab, 2, 3));
      QAddTransmutation(item.bricks,       QNewItemStack(item.slab, 2, 4));
      QAddTransmutation(item.stoneBricks,  QNewItemStack(item.slab, 2, 5));
      QAddTransmutation(item.netherBricks, QNewItemStack(item.slab, 2, 6));
      QAddTransmutation(item.quartzBlock,  QNewItemStack(item.slab, 2, 7));
      for (var i = 0; i < 4; i++)
      {
        QAddTransmutation(QNewItemStack(item.woodPlanks, 1, i), QNewItemStack(item.woodenSlab, 2, i));
      }
      QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 0), ArrayOf(item.oakWoodStairs, 2));
      QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 1), ArrayOf(item.spruceWoodStairs, 2));
      QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 2), ArrayOf(item.birchWoodStairs, 2));
      QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 3), ArrayOf(item.jungleWoodStairs, 2));
      QAddTransmutation(QNewItemStack(item.cobblestone, 3), ArrayOf(item.cobblestoneStairs, 2));
      QAddTransmutation(QNewItemStack(item.stoneBricks, 3), ArrayOf(item.stoneBrickStairs, 2));
      QAddTransmutation(QNewItemStack(item.netherBricks, 3), ArrayOf(item.netherBrickStairs, 2));
      QAddTransmutation(QNewItemStack(item.sandstone, 3), ArrayOf(item.sandstoneStairs, 2));
      QAddTransmutation(QNewItemStack(item.quartzBlock, 3), ArrayOf(item.quartzStairs, 2));
      QAddTransmutation(item.netherBricks, item.netherBrickFence);
      QAddTransmutation(item.cobblestone, QNewItemStack(item.cobblestoneWall, 1, 0));
      QAddTransmutation(item.mossStone,   QNewItemStack(item.cobblestoneWall, 1, 1));
    }
  }
  if (optionalFeature.ee_ore_transmutations)
  {
    // Transmutations based on ore dictionary
    var all_copper = ["ingotCopper", "blockCopper", "nuggetCopper"];
    var all_bronze = ["ingotBronze", "blockBronze", "nuggetBronze"];
    var all_tin    = ["ingotTin"   , "blockTin"   , "nuggetTin"   ];
    var all_silver = ["ingotSilver", "blockSilver", "nuggetSilver"];
    var all_iron   = [item.ironIngot, item.ironBlock, "nuggetIron"];
    var all_gold   = [item.goldIngot, item.goldBlock, item.goldNugget];
    var iron;
    for (var i = 0; i < 3; i++)
    {
      var copper = GetOres(all_copper[i]);
      var bronze = GetOres(all_bronze[i]);
      var tin = GetOres(all_tin[i]);
      var silver = GetOres(all_silver[i]);
      if ((copper.length > 0) && (tin.length > 0))
      {
        // 1 tin = 3 copper
        AddTransmutation(SetItemStackSize(copper[0], 3), all_tin[i]);
        AddTransmutation(tin[0], ArrayOf(all_copper[i], 3));
      }
      if ((bronze.length > 0) && (tin.length > 0))
      {
        // 2 bronze -> 1 tin
        AddTransmutation(tin[0], ArrayOf(all_bronze[i], 2));
      }
      if ((silver.length > 0) && (tin.length > 0))
      {
        // 1 silver = 2 tin
        AddTransmutation(SetItemStackSize(tin[0], 2), all_silver[i]);
        AddTransmutation(silver[0], ArrayOf(all_tin[i], 2));
      }
      if (((i != 2) || (iron = GetOres("nuggetIron")) && (iron.length > 0)) && (silver.length > 0))
      {
        // 2 iron -> 1 silver
        AddTransmutation(silver[0], ArrayOf(all_iron[i], 2));
      }
      if (silver.length > 0)
      {
        // 4 silver -> 1 gold
        AddTransmutation(all_gold[i], ArrayOf(all_silver[i], 4));
      }
      if ((i == 2) && (iron.length > 0))
      {
        // 1 golden nugget -> 8 iron nuggets
        AddTransmutation(SetItemStackSize(iron[0], 8), all_gold[i]);
      }
    }

    AddTransmutation(item.obsidian, "logWood", "logWood");
  }
  var m;
  if (optionalFeature.ee_thaumcraft_transmutations && (m = mods.thaumcraft) && (m.versionMajor == 3))
  {
    // Air shard -> fire shard -> water shard -> earth shard -> air shard; same for clusters
    AddEquivalency(MakeMetaCycle(m.shard, 4));
    AddEquivalency(MakeMetaCycle(m.crystal, 4));
    // Vis shard = 3 dull shards
    AddTransmutation1to1(NewItemStack(m.shard, 1, 4), NewItemStack(m.shard, 3, 5));

    // Change marker, candle and warded stone colors
    if (m.marker) AddEquivalency(MakeMetaCycle(m.marker, 16));
    AddEquivalency(MakeMetaCycle(m.candle, 16));
    // Warded stone can't be transmuted in-place, only in crafting
    if (m.secure)
    {
      for (var i = 0; i < 16; i++)
      {
        AddTransmutation(NewItemStack(m.secure, 1, (i+1)%16), NewItemStack(m.secure, 1, i));
      }
    }
    // Uncrafting: obsidian tile -> obsidian
    QAddTransmutation(item.obsidian, QNewItemStack(m.cosmeticSolid, 1, 1));
  }

  if (optionalFeature.ee_natura_transmutations && (m = mods.natura))
  {
    // Barley = wheat
    AddEquivalency(item.wheat, NewItemStack(m.foodItems, 1));
    // Seeds = barley seeds
    AddEquivalency(item.seeds, NewItemStack(m.barleySeeds, 1));
    // Wheat flour = barley flour
    AddEquivalency(NewItemStack(m.foodItems, 1, 1), NewItemStack(m.foodItems, 1, 2));
    // Uncrafting: gunpowder -> 4 sulfur (foodItems, heh)
    AddTransmutation(NewItemStack(m.foodItems, 4, 4), item.gunpowder);
    // Uncrafting: sulfur -> 4 sulfur cloud
    AddTransmutation(NewItemStack(m.cloud, 4, 3), NewItemStack(m.foodItems, 1, 4));
  }

  if (optionalFeature.ee_underground_biomes_transmutations && (m = mods.undergroundbiomes))
  {
    // Transmute stones in cycle
    AddEquivalency(MakeMetaCycle(m.igneousStone,           8));
    AddEquivalency(MakeMetaCycle(m.metamorphicStone,       8));
    AddEquivalency(MakeMetaCycle(m.igneousBrick,           8));
    AddEquivalency(MakeMetaCycle(m.igneousCobblestone,     8));
    AddEquivalency(MakeMetaCycle(m.igneousBrickSlab,       8));
    AddEquivalency(MakeMetaCycle(m.metamorphicBrick,       8));
    AddEquivalency(MakeMetaCycle(m.metamorphicCobblestone, 8));
    AddEquivalency(MakeMetaCycle(m.metamorphicStoneSlab,   8));
    AddEquivalency(MakeMetaCycle(m.sedimentaryStone,       8, 4)); // Skip the lignite block
    
    // Uncook stone to cobble (can do only in pairs)
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(m.igneousCobblestone,     2, i), NewItemStack(m.igneousStone,     2, i));
      AddTransmutation(NewItemStack(m.metamorphicCobblestone, 2, i), NewItemStack(m.metamorphicStone, 2, i));
    }
    // Convert igneous/metamorphic stone to vanilla flint
    AddTransmutation(item.flint, NewItemStack(m.igneousCobblestone,     4, WILDCARD));
    AddTransmutation(item.flint, NewItemStack(m.metamorphicCobblestone, 4, WILDCARD));
    // And from sedimentary stone, only flint block
    AddTransmutation(item.flint, NewItemStack(m.sedimentaryStone, 4, 5));
    
    if (optionalFeature.ee_stairs_slabs_walls_uncrafting)
    {
      // Joining slabs
      for (var i = 0; i < 8; i++)
      {
        AddTransmutation(NewItemStack(m.igneousBrick,     1, i), NewItemStack(m.igneousBrickSlab,     2, i));
        AddTransmutation(NewItemStack(m.metamorphicBrick, 1, i), NewItemStack(m.metamorphicStoneSlab, 2, i));
      }
    }
  }
  if (optionalFeature.ee_biome_mods_transmutations && (m = mods.extrabiomesxl))
  {
    // Red rock -> red rock cobblestone
    AddTransmutation(NewItemStack(m.redRock, 1, 1), NewItemStack(m.redRock, 1));
    // 4 red rock cobblestone -> flint
    AddTransmutation(item.flint, NewItemStack(m.redRock, 4, 1));
    // Cycle leaves
    AddEquivalency(MakeMetaCycle(m.autumnLeaves, 4), MakeMetaCycle(m.leaves, 3));
    // Cycle saplings
    AddEquivalency(MakeMetaCycle(m.sapling, 7));
    // Cycle logs
    AddEquivalency(MakeMetaCycle(m.wood, 2));
    AddEquivalency(MakeMetaCycle(m.quarterLog0, 3));
    AddEquivalency(MakeMetaCycle(m.quarterLog1, 3));
    AddEquivalency(MakeMetaCycle(m.quarterLog2, 3));
    AddEquivalency(MakeMetaCycle(m.quarterLog3, 3));
    // Cycle wood planks
    AddEquivalency(MakeMetaCycle(m.planks, 3));
    // Cycle slabs
    AddEquivalency(MakeMetaCycle(m.woodenSlab, 3));
    AddEquivalency(MakeMetaCycle(m.redRockSlab, 3));
    // Cycle stairs
    AddEquivalency(m.redwoodStairs, m.firStairs, m.acaciaStairs);
    AddEquivalency(m.redBrickStairs, m.redCobbleStairs);
    // Uncraft 4 planks -> 1 log
    AddTransmutation(m.wood, NewItemStack(m.planks, 4, WILDCARD));

    if (optionalFeature.ee_stairs_slabs_walls_uncrafting)
    {
      // Uncraft stairs
      AddTransmutation(NewItemStack(m.planks, 3, 0), ArrayOf(m.redwoodStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 1), ArrayOf(m.firStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 2), ArrayOf(m.acaciaStairs, 2));
      AddTransmutation(NewItemStack(m.redRock, 3, 2), ArrayOf(m.redBrickStairs, 2));
      AddTransmutation(NewItemStack(m.redRock, 3, 1), ArrayOf(m.redCobbleStairs, 2));

      // Join slabs
      AddTransmutation(NewItemStack(m.redRock, 1, 1), ArrayOf(m.redRockSlab, 2, 0));
      AddTransmutation(NewItemStack(m.redRock, 1, 0), ArrayOf(m.redRockSlab, 2, 1));
      AddTransmutation(NewItemStack(m.redRock, 1, 2), ArrayOf(m.redRockSlab, 2, 2));
      AddTransmutation(NewItemStack(m.planks, 1, 0), ArrayOf(m.woodenSlab, 2, 0));
      AddTransmutation(NewItemStack(m.planks, 1, 1), ArrayOf(m.woodenSlab, 2, 1));
      AddTransmutation(NewItemStack(m.planks, 1, 2), ArrayOf(m.woodenSlab, 2, 2));

      // Uncraft walls
      AddTransmutation(NewItemStack(m.redRock, 1, 1), NewItemStack(m.wall, 1, 0));
    }
  }
  if (optionalFeature.ee_biome_mods_transmutations && (m = mods.biomesoplenty))
  {
    // Red rock -> red rock cobblestone
    AddTransmutation(NewItemStack(m.redRock, 1, 1), NewItemStack(m.redRock, 1));
    // 4 red rock cobblestone -> flint
    AddTransmutation(item.flint, NewItemStack(m.redRock, 4, 1));
    // Cycle leaves
    AddEquivalency(MakeMetaCycle(m.leaves1, 8), MakeMetaCycle(m.leaves2, 4), MakeMetaCycle(m.leaves3, 5));
    // Cycle wood
    AddEquivalency(MakeMetaCycle(m.wood1, 4), MakeMetaCycle(m.wood2, 4), MakeMetaCycle(m.wood3, 3));
    // Cycle saplings and colorized saplings together
    AddEquivalency(MakeMetaCycle(m.sapling, 13), MakeMetaCycle(m.colorizedSapling, 5));
    // Cycle wooden planks
    AddEquivalency(MakeMetaCycle(m.planks, 10));
    // Cycle flowers
    AddEquivalency(MakeMetaCycle(m.flower, 13));
    // Cycle slabs
    AddEquivalency(MakeMetaCycle(m.woodenSlab1, 8), MakeMetaCycle(m.woodenSlab2, 2));
    AddEquivalency(MakeMetaCycle(m.stoneSlab, 3));
    // Cycle stairs
    AddEquivalency(m.acaciaStairs, m.cherryStairs, m.darkStairs, m.firStairs,
                   m.holyStairs, m.magicStairs, m.mangroveStairs, m.palmStairs,
                   m.redwoodStairs, m.willowStairs);
    AddEquivalency(m.mudBrickStairs, m.redCobbleStairs, m.redBrickStairs);
    // Uncraft 4 planks -> 1 log
    AddTransmutation(m.wood1, NewItemStack(m.planks, 4, WILDCARD));

    if (optionalFeature.ee_stairs_slabs_walls_uncrafting)
    {
      // Uncraft stairs
      AddTransmutation(NewItemStack(m.mudBricks, 3), ArrayOf(m.mudBrickStairs, 2));
      AddTransmutation(NewItemStack(m.redRock, 3, 1), ArrayOf(m.redCobbleStairs, 2));
      AddTransmutation(NewItemStack(m.redRock, 3, 2), ArrayOf(m.redBrickStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 0), ArrayOf(m.acaciaStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 1), ArrayOf(m.cherryStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 2), ArrayOf(m.darkStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 3), ArrayOf(m.firStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 4), ArrayOf(m.holyStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 5), ArrayOf(m.magicStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 6), ArrayOf(m.mangroveStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 7), ArrayOf(m.palmStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 8), ArrayOf(m.redwoodStairs, 2));
      AddTransmutation(NewItemStack(m.planks, 3, 9), ArrayOf(m.willowStairs, 2));

      // Join slabs
      AddTransmutation(NewItemStack(m.redRock, 1, 0), NewItemStack(m.stoneSlab, 2, 0));
      AddTransmutation(NewItemStack(m.redRock, 1, 2), NewItemStack(m.stoneSlab, 2, 1));
      AddTransmutation(NewItemStack(m.mudBricks, 1), NewItemStack(m.stoneSlab, 2, 2));
      AddTransmutation(NewItemStack(m.planks, 1, 0), ArrayOf(m.woodenSlab1, 2, 0));
      AddTransmutation(NewItemStack(m.planks, 1, 1), ArrayOf(m.woodenSlab1, 2, 1));
      AddTransmutation(NewItemStack(m.planks, 1, 2), ArrayOf(m.woodenSlab1, 2, 2));
      AddTransmutation(NewItemStack(m.planks, 1, 3), ArrayOf(m.woodenSlab1, 2, 3));
      AddTransmutation(NewItemStack(m.planks, 1, 4), ArrayOf(m.woodenSlab1, 2, 4));
      AddTransmutation(NewItemStack(m.planks, 1, 5), ArrayOf(m.woodenSlab1, 2, 5));
      AddTransmutation(NewItemStack(m.planks, 1, 6), ArrayOf(m.woodenSlab1, 2, 6));
      AddTransmutation(NewItemStack(m.planks, 1, 7), ArrayOf(m.woodenSlab1, 2, 7));
      AddTransmutation(NewItemStack(m.planks, 1, 8), ArrayOf(m.woodenSlab2, 2, 0));
      AddTransmutation(NewItemStack(m.planks, 1, 9), ArrayOf(m.woodenSlab2, 2, 1));
    }

    // Uncraft mud bricks block to 4 mud brick items
    AddTransmutation(NewItemStack(m.miscItems, 4, 0), m.mudBricks);
    // Uncook mud brick to mud ball
    AddTransmutation(m.mudBall, NewItemStack(m.miscItems, 1, 0));
  }
  if (optionalFeature.ee_biome_mods_transmutations && (m = mods.twilightforest))
  {
    // Cycle normal wood: twilight oak -> canopy tree -> mangrove -> darkwood -> twilight oak
    AddEquivalency(MakeMetaCycle(m.wood, 4));
    // Cycle normal leaves: twilight oak -> canopy tree -> mangrove -> darkwood -> twilight oak
    AddEquivalency(MakeMetaCycle(m.wood, 3), NewItemStack(m.hedge, 1, 1));
    // Cycle normal saplings (?)
    AddEquivalency(MakeMetaCycle(m.sapling, 4));
    // Cycle mazestone
    AddEquivalency(MakeMetaCycle(m.mazestone, 8));
  }
  if (optionalFeature.ee_minefantasy_transmutations && (m = mods.minefantasy))
  {
    // cobblestone bricks -> mossy -> cracked -> normal cobblestone bricks
    AddEquivalency(MakeMetaCycle(m.cobblestoneBricks, 4));
    // granite bricks -> mossy -> cracked -> normal granite bricks
    AddEquivalency(MakeMetaCycle(m.graniteBricks,     4));
    // 2 ironbark wood -> obsidian
    AddTransmutation(item.obsidian, ArrayOf(m.ironbarkWood, 2));
    // 4 ironbark wood planks -> 1 ironbark wood
    AddTransmutation(m.ironbarkWood, ArrayOf(m.ironbarkPlanks, 4));
    if (optionalFeature.ee_stairs_slabs_walls_uncrafting)
    {
      // 2 stone stairs -> 3 stone
      AddTransmutation(NewItemStack(item.stone, 3), ArrayOf(m.stoneStairs, 2));
      // 2 cobblestone brick stairs -> 3 cobblestone bricks
      AddTransmutation(NewItemStack(m.cobblestoneBricks, 3), ArrayOf(m.cobblestoneBrickStairs, 2));
    }
  }
  if (optionalFeature.ee_tinkersconstruct_transmutations && (m = mods.tinkersconstruct))
  {
    // Uncraft seared bricks -> 4x seared brick 14276:2
    AddTransmutation(NewItemStack(m.materials, 4, 2), NewItemStack(m.smeltery, 1, 2));
  }
})();
