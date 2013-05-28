// Equivalent Exchange transmutation addons
// By Grom PE

var AddTransmutation = function()     { throw("AddTransmutation is not available!"); };
var AddTransmutation1to1 = function() { throw("AddTransmutation1to1 is not available!"); };

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
    // TODO: possible inplace block transmutation?
    return AddTransmutation(a, b) && AddTransmutation(b, a);
  };

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
    QAddTransmutation(QNewItemStack(item.netherQuartz, 4), QNewItemStack(item.quartzBlock, 1));
    QAddTransmutation(item.quartzBlock, item.quartzBlock);
    QAddTransmutation(item.stone,        QNewItemStack(item.slab, 2, 0));
    QAddTransmutation(item.sandstone,    QNewItemStack(item.slab, 2, 1));
    QAddTransmutation(item.woodPlanks,   QNewItemStack(item.slab, 2, 2));
    QAddTransmutation(item.cobblestone,  QNewItemStack(item.slab, 2, 3));
    QAddTransmutation(item.bricks,       QNewItemStack(item.slab, 2, 4));
    QAddTransmutation(item.stoneBricks,  QNewItemStack(item.slab, 2, 5));
    QAddTransmutation(item.netherBricks, QNewItemStack(item.slab, 2, 6));
    QAddTransmutation(item.quartzBlock,  QNewItemStack(item.slab, 2, 7));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 0), QNewItemStack(item.woodenSlab, 2, 0));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 1), QNewItemStack(item.woodenSlab, 2, 1));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 2), QNewItemStack(item.woodenSlab, 2, 2));
    QAddTransmutation(QNewItemStack(item.woodPlanks, 1, 3), QNewItemStack(item.woodenSlab, 2, 3));
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
    QAddTransmutation(item.mossStone,   QNewItemStack(item.cobblestoneWall, 1, 1));
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
      AddTransmutation(NewItemStack(m.shard,   1, (i+1)%4), NewItemStack(m.shard,   1, i));
      AddTransmutation(NewItemStack(m.crystal, 1, (i+1)%4), NewItemStack(m.crystal, 1, i));
    }

    // Vis shard = 3 dull shards
    AddTransmutation1to1(NewItemStack(m.shard, 1, 4), NewItemStack(m.shard, 3, 5));

    // Change marker, candle and warded stone colors
    for (var i = 0; i < 16; i++)
    {
      AddTransmutation(NewItemStack(m.marker, 1, (i+1)%16), NewItemStack(m.marker, 1, i));
      AddTransmutation(NewItemStack(m.candle, 1, (i+1)%16), NewItemStack(m.candle, 1, i));
      AddTransmutation(NewItemStack(m.secure, 1, (i+1)%16), NewItemStack(m.secure, 1, i));
    }

    // Uncrafting: obsidian tile -> obsidian
    QAddTransmutation(item.obsidian, QNewItemStack(m.cosmeticSolid, 1, 1));
  }

  if (optionalFeature.ee_natura_transmutations && (m = mods.natura))
  {
    // Barley = wheat
    AddTransmutation1to1(item.wheat, NewItemStack(m.foodItems, 1));
    // Seeds = barley seeds
    AddTransmutation1to1(item.seeds, NewItemStack(m.barleySeeds, 1));
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
      AddTransmutation(NewItemStack(m.igneousStone,           1, (i+1)%8), NewItemStack(m.igneousStone,           1, i));
      AddTransmutation(NewItemStack(m.metamorphicStone,       1, (i+1)%8), NewItemStack(m.metamorphicStone,       1, i));
      AddTransmutation(NewItemStack(m.igneousBrick,           1, (i+1)%8), NewItemStack(m.igneousBrick,           1, i));
      AddTransmutation(NewItemStack(m.igneousCobblestone,     1, (i+1)%8), NewItemStack(m.igneousCobblestone,     1, i));
      AddTransmutation(NewItemStack(m.igneousBrickSlab,       1, (i+1)%8), NewItemStack(m.igneousBrickSlab,       1, i));
      AddTransmutation(NewItemStack(m.metamorphicBrick,       1, (i+1)%8), NewItemStack(m.metamorphicBrick,       1, i));
      AddTransmutation(NewItemStack(m.metamorphicCobblestone, 1, (i+1)%8), NewItemStack(m.metamorphicCobblestone, 1, i));
      AddTransmutation(NewItemStack(m.metamorphicStoneSlab,   1, (i+1)%8), NewItemStack(m.metamorphicStoneSlab,   1, i));
      if (i == 4) continue; // Skip the lignite block
      var j = (i+1)%8;
      if (j == 3) j = 5;
      AddTransmutation(NewItemStack(m.sedimentaryStone, 1, j), NewItemStack(m.sedimentaryStone, 1, i));
    }
    
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
    
    // Joining slabs
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(m.igneousBrick,     1, i), NewItemStack(m.igneousBrickSlab,     2, i));
      AddTransmutation(NewItemStack(m.metamorphicBrick, 1, i), NewItemStack(m.metamorphicStoneSlab, 2, i));
    }
    
    // Uncrafting
    AddTransmutation(NewItemStack(item.coal, 4), m.anthracite);

  }
  if (optionalFeature.ee_biome_mods_transmutations && (m = mods.extrabiomes))
  {
    // Red rock -> red rock cobblestone
    AddTransmutation(NewItemStack(m.redRock, 1, 1), NewItemStack(m.redRock, 1));
    // 4 red rock cobblestone -> flint
    AddTransmutation(item.flint, NewItemStack(m.redRock, 4, 1));
  }
  if (optionalFeature.ee_biome_mods_transmutations && (m = mods.biomesoplenty))
  {
    // Red rock -> red rock cobblestone
    AddTransmutation(NewItemStack(m.redRock, 1, 1), NewItemStack(m.redRock, 1));
    // 4 red rock cobblestone -> flint
    AddTransmutation(item.flint, NewItemStack(m.redRock, 4, 1));
    // TODO: 1923 leaves -> :1 :2 :3 ... :7 -> 1924 leaves -> :1 :2 :3 -> 1923:0
  }
  if (optionalFeature.ee_biome_mods_transmutations && (m = mods.twilightforest))
  {
  }
  if (optionalFeature.ee_minefantasy_transmutations && (m = mods.minefantasy))
  {
    for (var i = 0; i < 3; i++)
    {
      // cobblestone bricks -> mossy -> cracked -> normal cobblestone bricks
      AddTransmutation(NewItemStack(m.cobblestoneBricks, 1, (i+1)%3), NewItemStack(m.cobblestoneBricks, 1, i));
      // granite bricks -> mossy -> cracked -> normal granite bricks
      AddTransmutation(NewItemStack(m.graniteBricks,     1, (i+1)%3), NewItemStack(m.graniteBricks,     1, i));
    }
    // 2 ironbark wood -> obsidian
    AddTransmutation(item.obsidian, ArrayOf(m.ironbarkWood, 2));
    // 4 ironbark wood planks -> 1 ironbark wood
    AddTransmutation(m.ironbarkWood, ArrayOf(m.ironbarkPlanks, 4));
    // 2 stone stairs -> 3 stone
    AddTransmutation(NewItemStack(item.stone, 3), ArrayOf(m.stoneStairs, 2));
    // 2 cobblestone brick stairs -> 3 cobblestone bricks
    AddTransmutation(NewItemStack(m.cobblestoneBricks, 3), ArrayOf(m.cobblestoneBrickStairs, 2));
  }
})();
