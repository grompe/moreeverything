// Equivalent Exchange transmutation addons
// By Grom PE

var AddTransmutation = function()     { log("Error: AddTransmutation is not available!", logLevel.error); };
var AddTransmutation1to1 = function() { log("Error: AddTransmutation1to1 is not available!", logLevel.error); };

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
    AddShapelessRecipe(result, i1);
    var i2 = input.slice();
    i2.unshift(mods.equivalentexchange.philStone);
    AddShapelessRecipe(result, i2);
  }

  AddTransmutation1to1 = function(a, b)
  {
    // TODO: possible inplace block transmutation?
    AddTransmutation(a, b);
    AddTransmutation(b, a);
  }

  // EMC values: http://technicpack.wikia.com/wiki/Alchemical_Math

  // Transmutations
  // 1 coal = 2 redstone
  AddTransmutation(item.coal, ArrayOf(item.redstone, 2));
  AddTransmutation(NewItemStack(item.redstone, 2), NewItemStack(item.coal, 1, 0));
  // 7 coal = 1 lapis lazuli
  AddTransmutation(NewItemStack(item.dye, 1, dye.lapisLazuli), ArrayOf(NewItemStack(item.coal, 1, 0), 7));
  AddTransmutation(NewItemStack(item.coal, 7), NewItemStack(item.dye, 1, dye.lapisLazuli));
  // 3 coal = 1 glowstone dust
  AddTransmutation(item.glowstoneDust, ArrayOf(NewItemStack(item.coal, 1, 0), 3));
  AddTransmutation(NewItemStack(item.coal, 3), item.glowstoneDust);
  // 6 redstone -> 1 glowstone dust
  AddTransmutation(item.glowstoneDust, ArrayOf(item.redstone, 6));

  // Simple uncrafting
  AddTransmutation(NewItemStack(item.glass, 3), ArrayOf(item.glassPane, 8));
  AddTransmutation(NewItemStack(item.netherQuartz, 4), NewItemStack(item.quartzBlock, 1, 0));
  AddTransmutation(item.quartzBlock, item.quartzBlock);
  AddTransmutation(item.stone,        ArrayOf(NewItemStack(item.slab, 1, 0), 2));
  AddTransmutation(item.sandstone,    ArrayOf(NewItemStack(item.slab, 1, 1), 2));
  AddTransmutation(item.woodPlanks,   ArrayOf(NewItemStack(item.slab, 1, 2), 2));
  AddTransmutation(item.cobblestone,  ArrayOf(NewItemStack(item.slab, 1, 3), 2));
  AddTransmutation(item.bricks,       ArrayOf(NewItemStack(item.slab, 1, 4), 2));
  AddTransmutation(item.stoneBricks,  ArrayOf(NewItemStack(item.slab, 1, 5), 2));
  AddTransmutation(item.netherBricks, ArrayOf(NewItemStack(item.slab, 1, 6), 2));
  AddTransmutation(item.quartzBlock,  ArrayOf(NewItemStack(item.slab, 1, 7), 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 1, 0), ArrayOf(NewItemStack(item.woodenSlab, 1, 0), 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 1, 1), ArrayOf(NewItemStack(item.woodenSlab, 1, 1), 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 1, 2), ArrayOf(NewItemStack(item.woodenSlab, 1, 2), 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 1, 3), ArrayOf(NewItemStack(item.woodenSlab, 1, 3), 2));
  AddTransmutation(NewItemStack(item.netherBrick, 4), item.netherBricks);
  AddTransmutation(item.netherrack, item.netherBrick);
  AddTransmutation(NewItemStack(item.woodPlanks, 3, 0), ArrayOf(item.oakWoodStairs, 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 3, 1), ArrayOf(item.spruceWoodStairs, 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 3, 2), ArrayOf(item.birchWoodStairs, 2));
  AddTransmutation(NewItemStack(item.woodPlanks, 3, 3), ArrayOf(item.jungleWoodStairs, 2));
  AddTransmutation(NewItemStack(item.cobblestone, 3), ArrayOf(item.cobblestoneStairs, 2));
  AddTransmutation(NewItemStack(item.stoneBricks, 3), ArrayOf(item.stoneBrickStairs, 2));
  AddTransmutation(NewItemStack(item.netherBricks, 3), ArrayOf(item.netherBrickStairs, 2));
  AddTransmutation(NewItemStack(item.sandstone, 3), ArrayOf(item.sandstoneStairs, 2));
  AddTransmutation(NewItemStack(item.quartzBlock, 3), ArrayOf(item.quartzStairs, 2));
  AddTransmutation(NewItemStack(item.stick, 3), item.fence);
  AddTransmutation(item.netherBricks, item.netherBrickFence);
  AddTransmutation(item.cobblestone, NewItemStack(item.cobblestoneWall, 1, 0));
  AddTransmutation(item.mossStone, NewItemStack(item.cobblestoneWall, 1, 1));

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

  if (mods.thaumcraft)
  {
    // Air shard -> fire shard -> water shard -> earth shard -> air shard; same for clusters
    for (var i = 0; i < 4; i++)
    {
      AddTransmutation(NewItemStack(mods.thaumcraft.shard,   1, (i == 3) ? 0 : i+1), NewItemStack(mods.thaumcraft.shard,   1, i));
      AddTransmutation(NewItemStack(mods.thaumcraft.crystal, 1, (i == 3) ? 0 : i+1), NewItemStack(mods.thaumcraft.crystal, 1, i));
    }

    // Vis shard = 3 dull shards
    AddTransmutation(NewItemStack(mods.thaumcraft.shard, 1, 4), ArrayOf(NewItemStack(mods.thaumcraft.shard, 1, 5), 3));
    AddTransmutation(NewItemStack(mods.thaumcraft.shard, 3, 5), NewItemStack(mods.thaumcraft.shard, 1, 4));

    // Change marker, candle and warded stone colors
    for (var i = 0; i < 16; i++)
    {
      AddTransmutation(NewItemStack(mods.thaumcraft.marker, 1, (i == 15) ? 0 : i+1), NewItemStack(mods.thaumcraft.marker, 1, i));
      AddTransmutation(NewItemStack(mods.thaumcraft.candle, 1, (i == 15) ? 0 : i+1), NewItemStack(mods.thaumcraft.candle, 1, i));
      AddTransmutation(NewItemStack(mods.thaumcraft.secure, 1, (i == 15) ? 0 : i+1), NewItemStack(mods.thaumcraft.secure, 1, i));
    }

    // Uncrafting: obsidian tile -> obsidian
    AddTransmutation(item.obsidian, NewItemStack(mods.thaumcraft.cosmeticSolid, 1, 1));
  }

  if (mods.natura)
  {
    // Barley = wheat
    AddTransmutation1to1(item.wheat, NewItemStack(mods.natura.foodItems, 1, 0));
    // Seeds = barley seeds
    AddTransmutation1to1(item.seeds, NewItemStack(mods.natura.barleySeeds, 1, 0));
    // Wheat flour = barley flour
    AddTransmutation1to1(NewItemStack(mods.natura.foodItems, 1, 1), NewItemStack(mods.natura.foodItems, 1, 2));
    // Uncrafting: gunpowder -> 4 sulfur (foodItems, heh)
    AddTransmutation(NewItemStack(mods.natura.foodItems, 4, 4), item.gunpowder);
    // Uncrafting: sulfur -> 4 sulfur cloud
    AddTransmutation(NewItemStack(mods.natura.cloud, 4, 3), NewItemStack(mods.natura.foodItems, 1, 4));
  }

  if (mods.undergroundbiomes)
  {
    var ub = mods.undergroundbiomes;

    // Transmute stones in cycle
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(ub.igneousStone,           1, (i == 7) ? 0 : i+1), NewItemStack(ub.igneousStone,           1, i));
      AddTransmutation(NewItemStack(ub.metamorphicStone,       1, (i == 7) ? 0 : i+1), NewItemStack(ub.metamorphicStone,       1, i));
      AddTransmutation(NewItemStack(ub.igneousBrick,           1, (i == 7) ? 0 : i+1), NewItemStack(ub.igneousBrick,           1, i));
      AddTransmutation(NewItemStack(ub.igneousCobblestone,     1, (i == 7) ? 0 : i+1), NewItemStack(ub.igneousCobblestone,     1, i));
      AddTransmutation(NewItemStack(ub.igneousBrickSlab,       1, (i == 7) ? 0 : i+1), NewItemStack(ub.igneousBrickSlab,       1, i));
      AddTransmutation(NewItemStack(ub.metamorphicBrick,       1, (i == 7) ? 0 : i+1), NewItemStack(ub.metamorphicBrick,       1, i));
      AddTransmutation(NewItemStack(ub.metamorphicCobblestone, 1, (i == 7) ? 0 : i+1), NewItemStack(ub.metamorphicCobblestone, 1, i));
      AddTransmutation(NewItemStack(ub.metamorphicStoneSlab,   1, (i == 7) ? 0 : i+1), NewItemStack(ub.metamorphicStoneSlab,   1, i));
      if (i == 4) continue; // Skip the lignite block
      AddTransmutation(NewItemStack(ub.sedimentaryStone, 1, (i == 7) ? 0 : (i == 3) ? 5 : i+1), NewItemStack(ub.sedimentaryStone, 1, i));
    }
    
    // Uncook stone to cobble (can do only in pairs)
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(ub.igneousCobblestone,     2, i), ArrayOf(NewItemStack(ub.igneousStone,     1, i), 2));
      AddTransmutation(NewItemStack(ub.metamorphicCobblestone, 2, i), ArrayOf(NewItemStack(ub.metamorphicStone, 1, i), 2));
    }
    
    // Convert igneous/metamorphic stone to vanilla flint
    AddTransmutation(item.flint, ArrayOf(NewItemStack(ub.igneousCobblestone,     1), 4));
    AddTransmutation(item.flint, ArrayOf(NewItemStack(ub.metamorphicCobblestone, 1), 4));
    // And from sedimentary stone, only flint block
    AddTransmutation(item.flint, ArrayOf(NewItemStack(ub.sedimentaryStone, 1, 5), 4));
    
    // Joining slabs
    for (var i = 0; i < 8; i++)
    {
      AddTransmutation(NewItemStack(ub.igneousBrick,     1, i), ArrayOf(NewItemStack(ub.igneousBrickSlab,     1, i), 2));
      AddTransmutation(NewItemStack(ub.metamorphicBrick, 1, i), ArrayOf(NewItemStack(ub.metamorphicStoneSlab, 1, i), 2));
    }
    
    // Uncrafting
    AddTransmutation(NewItemStack(item.coal, 4), ub.anthracite);

  }
})();
