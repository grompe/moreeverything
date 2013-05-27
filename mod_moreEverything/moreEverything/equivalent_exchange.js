// Equivalent Exchange transmutation addons
// By Grom PE

var AddTransmutation = function()     { throw("Error: AddTransmutation is not available!"); };
var AddTransmutation1to1 = function() { throw("Error: AddTransmutation1to1 is not available!"); };

(function()
{
  if (!mods.equivalentexchange) return;

  AddTransmutation = function(result, input)
  {
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
    // TODO: possible inplace block transmutation?
    return AddTransmutation(a, b) && AddTransmutation(b, a);
  };

  // Quiet functions that don't throw exceptions
  function QAddTransmutation(result, input)
  {
    try { return AddTransmutation(result, input); }
    catch(e) {};
  };
  function QAddTransmutation1to1(a, b)
  {
    try { return AddTransmutation1to1(a, b); }
    catch(e) {};
  };

  // EMC values: http://technicpack.wikia.com/wiki/Alchemical_Math

  if (optionalFeature.ee_vanilla_transmutations)
  {
    // Transmutations
    // 1 coal = 2 redstone
    QAddTransmutation(item.coal, ArrayOf(item.redstone, 2));
    QAddTransmutation(QNewItemStack(item.redstone, 2), QNewItemStack(item.coal, 1, 0));
    // 7 coal = 1 lapis lazuli
    QAddTransmutation(QNewItemStack(item.dye, 1, dye.lapisLazuli), ArrayOf(QNewItemStack(item.coal, 1, 0), 7));
    QAddTransmutation(QNewItemStack(item.coal, 7), QNewItemStack(item.dye, 1, dye.lapisLazuli));
    // 3 coal = 1 glowstone dust
    QAddTransmutation(item.glowstoneDust, ArrayOf(QNewItemStack(item.coal, 1, 0), 3));
    QAddTransmutation(QNewItemStack(item.coal, 3), item.glowstoneDust);
    // 6 redstone -> 1 glowstone dust
    QAddTransmutation(item.glowstoneDust, ArrayOf(item.redstone, 6));
  }
  if (optionalFeature.ee_vanilla_uncrafting)
  {
    // Simple uncrafting
    QAddTransmutation(QNewItemStack(item.glass, 3), ArrayOf(item.glassPane, 8));
    QAddTransmutation(QNewItemStack(item.netherQuartz, 4), QNewItemStack(item.quartzBlock, 1, 0));
    QAddTransmutation(item.quartzBlock, item.quartzBlock);
    QAddTransmutation(item.stone,        ArrayOf(QNewItemStack(item.slab, 1, 0), 2));
    QAddTransmutation(item.sandstone,    ArrayOf(QNewItemStack(item.slab, 1, 1), 2));
    QAddTransmutation(item.woodPlanks,   ArrayOf(QNewItemStack(item.slab, 1, 2), 2));
    QAddTransmutation(item.cobblestone,  ArrayOf(QNewItemStack(item.slab, 1, 3), 2));
    QAddTransmutation(item.bricks,       ArrayOf(QNewItemStack(item.slab, 1, 4), 2));
    QAddTransmutation(item.stoneBricks,  ArrayOf(QNewItemStack(item.slab, 1, 5), 2));
    QAddTransmutation(item.netherBricks, ArrayOf(QNewItemStack(item.slab, 1, 6), 2));
    QAddTransmutation(item.quartzBlock,  ArrayOf(QNewItemStack(item.slab, 1, 7), 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 0), ArrayOf(QNewItemStack(item.woodenSlab, 1, 0), 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 1), ArrayOf(QNewItemStack(item.woodenSlab, 1, 1), 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 2), ArrayOf(QNewItemStack(item.woodenSlab, 1, 2), 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 3), ArrayOf(QNewItemStack(item.woodenSlab, 1, 3), 2));
    QAddTransmutation(QNewItemStack(item.netherBrick, 4), item.netherBricks);
    QAddTransmutation(item.netherrack, item.netherBrick);
    QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 0), ArrayOf(item.oakWoodStairs, 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 1), ArrayOf(item.spruceWoodStairs, 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 2), ArrayOf(item.birchWoodStairs, 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 3, 3), ArrayOf(item.jungleWoodStairs, 2));
    QAddTransmutation(QNewItemStack(item.cobblestone, 3), ArrayOf(item.cobblestoneStairs, 2));
    QAddTransmutation(QNewItemStack(item.stoneBricks, 3), ArrayOf(item.stoneBrickStairs, 2));
    QAddTransmutation(QNewItemStack(item.netherBricks, 3), ArrayOf(item.netherBrickStairs, 2));
    QAddTransmutation(QNewItemStack(item.sandstone, 3), ArrayOf(item.sandstoneStairs, 2));
    QAddTransmutation(QNewItemStack(item.quartzBlock, 3), ArrayOf(item.quartzStairs, 2));
    QAddTransmutation(QNewItemStack(item.stick, 3), item.fence);
    QAddTransmutation(item.netherBricks, item.netherBrickFence);
    QAddTransmutation(item.cobblestone, QNewItemStack(item.cobblestoneWall, 1, 0));
    QAddTransmutation(item.mossStone, QNewItemStack(item.cobblestoneWall, 1, 1));
  }
  if (optionalFeature.ee_ore_transmutations)
  {
    // Transmutations based on ore dictionary
    var copper = GetOres("ingotCopper");
    var bronze = GetOres("ingotBronze");
    var tin = GetOres("ingotTin");
    var silver = GetOres("ingotSilver");
    if ((copper.length > 0) && (tin.length > 0))
    {
      // 1 tin = 3 copper
      AddTransmutation(SetItemStackSize(copper[0], 3), "ingotTin");
      AddTransmutation(tin[0], ArrayOf("ingotCopper", 3));
    }
    if ((bronze.length > 0) && (tin.length > 0))
    {
      // 2 bronze -> 1 tin
      AddTransmutation(tin[0], ArrayOf("ingotBronze", 2));
    }
    if ((silver.length > 0) && (tin.length > 0))
    {
      // 1 silver = 2 tin
      AddTransmutation(SetItemStackSize(tin[0], 2), "ingotSilver");
      AddTransmutation(silver[0], ArrayOf("ingotTin", 2));
    }
    if (silver.length > 0)
    {
      // 2 iron -> 1 silver
      AddTransmutation(silver[0], ArrayOf(item.ironIngot, 2));
      // 4 silver -> 1 gold
      AddTransmutation(item.goldIngot, ArrayOf("ingotSilver", 4));
    }

    // Same but for blocks
    var copper = GetOres("blockCopper");
    var bronze = GetOres("blockBronze");
    var tin = GetOres("blockTin");
    var silver = GetOres("blockSilver");
    if ((copper.length > 0) && (tin.length > 0))
    {
      // 1 tin = 3 copper
      AddTransmutation(SetItemStackSize(copper[0], 3), "blockTin");
      AddTransmutation(tin[0], ArrayOf("blockCopper", 3));
    }
    if ((bronze.length > 0) && (tin.length > 0))
    {
      // 2 bronze -> 1 tin
      AddTransmutation(tin[0], ArrayOf("blockBronze", 2));
    }
    if ((silver.length > 0) && (tin.length > 0))
    {
      // 1 silver = 2 tin
      AddTransmutation(SetItemStackSize(tin[0], 2), "blockSilver");
      AddTransmutation(silver[0], ArrayOf("blockTin", 2));
    }
    if (silver.length > 0)
    {
      // 2 iron -> 1 silver
      AddTransmutation(silver[0], ArrayOf(item.ironBlock, 2));
      // 4 silver -> 1 gold
      AddTransmutation(item.goldBlock, ArrayOf("blockSilver", 4));
    }

    // Same but for nuggets
    var copper = GetOres("nuggetCopper");
    var bronze = GetOres("nuggetBronze");
    var tin = GetOres("nuggetTin");
    var silver = GetOres("nuggetSilver");
    var iron = GetOres("nuggetIron");
    if ((copper.length > 0) && (tin.length > 0))
    {
      // 1 tin = 3 copper
      AddTransmutation(SetItemStackSize(copper[0], 3), "nuggetTin");
      AddTransmutation(tin[0], ArrayOf("nuggetCopper", 3));
    }
    if ((bronze.length > 0) && (tin.length > 0))
    {
      // 2 bronze -> 1 tin
      AddTransmutation(tin[0], ArrayOf("nuggetBronze", 2));
    }
    if ((silver.length > 0) && (tin.length > 0))
    {
      // 1 silver = 2 tin
      AddTransmutation(SetItemStackSize(tin[0], 2), "nuggetSilver");
      AddTransmutation(silver[0], ArrayOf("nuggetTin", 2));
    }
    if ((silver.length > 0) && (iron.length > 0))
    {
      // 2 iron -> 1 silver
      AddTransmutation(silver[0], ArrayOf("nuggetIron", 2));
    }
    if (silver.length > 0)
    {
      // 4 silver -> 1 gold
      AddTransmutation(item.goldNugget, ArrayOf("nuggetSilver", 4));
    }
    if (iron.length > 0)
    {
      // 1 golden nugget -> 8 iron nuggets
      AddTransmutation(SetItemStackSize(iron[0], 8), item.goldNugget);
    }
  }
  var m;
  if (optionalFeature.ee_thaumcraft_transmutations && (m = mods.thaumcraft))
  {
    // Air shard -> fire shard -> water shard -> earth shard -> air shard; same for clusters
    for (var i = 0; i < 4; i++)
    {
      AddTransmutation(NewItemStack(m.shard,   1, (i == 3) ? 0 : i+1), NewItemStack(m.shard,   1, i));
      AddTransmutation(NewItemStack(m.crystal, 1, (i == 3) ? 0 : i+1), NewItemStack(m.crystal, 1, i));
    }

    // Vis shard = 3 dull shards
    AddTransmutation(NewItemStack(m.shard, 1, 4), ArrayOf(NewItemStack(m.shard, 1, 5), 3));
    AddTransmutation(NewItemStack(m.shard, 3, 5), NewItemStack(m.shard, 1, 4));

    // Change marker, candle and warded stone colors
    for (var i = 0; i < 16; i++)
    {
      AddTransmutation(NewItemStack(m.marker, 1, (i == 15) ? 0 : i+1), NewItemStack(m.marker, 1, i));
      AddTransmutation(NewItemStack(m.candle, 1, (i == 15) ? 0 : i+1), NewItemStack(m.candle, 1, i));
      AddTransmutation(NewItemStack(m.secure, 1, (i == 15) ? 0 : i+1), NewItemStack(m.secure, 1, i));
    }

    // Uncrafting: obsidian tile -> obsidian
    AddTransmutation(item.obsidian, NewItemStack(m.cosmeticSolid, 1, 1));
  }

  if (optionalFeature.ee_natura_transmutations && (m = mods.natura))
  {
    // Barley = wheat
    AddTransmutation1to1(item.wheat, NewItemStack(m.foodItems, 1, 0));
    // Seeds = barley seeds
    AddTransmutation1to1(item.seeds, NewItemStack(m.barleySeeds, 1, 0));
    // Wheat flour = barley flour
    AddTransmutation1to1(NewItemStack(m.foodItems, 1, 1), NewItemStack(m.foodItems, 1, 2));
    // Uncrafting: gunpowder -> 4 sulfur (foodItems, heh)
    AddTransmutation(NewItemStack(m.foodItems, 4, 4), item.gunpowder);
    // Uncrafting: sulfur -> 4 sulfur cloud
    AddTransmutation(NewItemStack(m.cloud, 4, 3), NewItemStack(m.foodItems, 1, 4));
  }

  if (optionalFeature.ee_underground_biomes_transmutations && (m = mods.undergroundbiomes))
  {
    // Transmute stones in cycle
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(m.igneousStone,           1, (i == 7) ? 0 : i+1), NewItemStack(m.igneousStone,           1, i));
      AddTransmutation(NewItemStack(m.metamorphicStone,       1, (i == 7) ? 0 : i+1), NewItemStack(m.metamorphicStone,       1, i));
      AddTransmutation(NewItemStack(m.igneousBrick,           1, (i == 7) ? 0 : i+1), NewItemStack(m.igneousBrick,           1, i));
      AddTransmutation(NewItemStack(m.igneousCobblestone,     1, (i == 7) ? 0 : i+1), NewItemStack(m.igneousCobblestone,     1, i));
      AddTransmutation(NewItemStack(m.igneousBrickSlab,       1, (i == 7) ? 0 : i+1), NewItemStack(m.igneousBrickSlab,       1, i));
      AddTransmutation(NewItemStack(m.metamorphicBrick,       1, (i == 7) ? 0 : i+1), NewItemStack(m.metamorphicBrick,       1, i));
      AddTransmutation(NewItemStack(m.metamorphicCobblestone, 1, (i == 7) ? 0 : i+1), NewItemStack(m.metamorphicCobblestone, 1, i));
      AddTransmutation(NewItemStack(m.metamorphicStoneSlab,   1, (i == 7) ? 0 : i+1), NewItemStack(m.metamorphicStoneSlab,   1, i));
      if (i == 4) continue; // Skip the lignite block
      AddTransmutation(NewItemStack(m.sedimentaryStone, 1, (i == 7) ? 0 : (i == 3) ? 5 : i+1), NewItemStack(m.sedimentaryStone, 1, i));
    }
    
    // Uncook stone to cobble (can do only in pairs)
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(m.igneousCobblestone,     2, i), ArrayOf(NewItemStack(m.igneousStone,     1, i), 2));
      AddTransmutation(NewItemStack(m.metamorphicCobblestone, 2, i), ArrayOf(NewItemStack(m.metamorphicStone, 1, i), 2));
    }
    
    // Convert igneous/metamorphic stone to vanilla flint
    AddTransmutation(item.flint, ArrayOf(NewItemStack(m.igneousCobblestone,     1), 4));
    AddTransmutation(item.flint, ArrayOf(NewItemStack(m.metamorphicCobblestone, 1), 4));
    // And from sedimentary stone, only flint block
    AddTransmutation(item.flint, ArrayOf(NewItemStack(m.sedimentaryStone, 1, 5), 4));
    
    // Joining slabs
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(m.igneousBrick,     1, i), ArrayOf(NewItemStack(m.igneousBrickSlab,     1, i), 2));
      AddTransmutation(NewItemStack(m.metamorphicBrick, 1, i), ArrayOf(NewItemStack(m.metamorphicStoneSlab, 1, i), 2));
    }
    
    // Uncrafting
    AddTransmutation(NewItemStack(item.coal, 4), m.anthracite);

  }
})();
