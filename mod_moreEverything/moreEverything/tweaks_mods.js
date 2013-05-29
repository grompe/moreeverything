// Mod tweaks
// By Grom PE

(function ()
{
  if (!optionalFeature.mod_tweaks) return;

  if (mods.biomesoplenty)
  {
    AddFuel(40, mods.biomesoplenty.plant, 0);     // Dead grass
    AddFuel(40, mods.biomesoplenty.plant, 5);     // Thorns
    AddFuel(40, mods.biomesoplenty.plant, 6);     // Barley
    AddFuel(40, mods.biomesoplenty.plant, 7);     // Cattail
    AddFuel(150, mods.biomesoplenty.woodenSlab1); // Rebalancing to match vanilla 7.5s
    AddFuel(150, mods.biomesoplenty.woodenSlab2); 
    AddFuel(100, mods.biomesoplenty.foliage, 4);  // Bush
    AddFuel(100, mods.biomesoplenty.bamboo);
  }

  if (mods.extrabiomesxl)
  {
    AddFuel(40,  mods.extrabiomesxl.cattail);
    AddFuel(100, mods.extrabiomesxl.flower, 0);  // Shrub
    AddFuel(100, mods.extrabiomesxl.flower, 5);  // Root
    AddFuel(20,  mods.extrabiomesxl.grass, 2);   // Short dead grass
    AddFuel(40,  mods.extrabiomesxl.grass, 3);   // Tall dead grass
    AddFuel(20,  mods.extrabiomesxl.grass, 4);   // Short yellow dead grass
    AddFuel(40,  mods.extrabiomesxl.leafPile);
    AddFuel(150, mods.extrabiomesxl.woodenSlab); // Rebalancing to match vanilla 7.5s
  }

  if (mods.twilightforest)
  {
    AddFuel(100, mods.twilightforest.sapling);
  }

  if (mods.thaumcraft)
  {
    AddFuel(100, mods.thaumcraft.customPlant, 0); // Greatwood sapling
    AddFuel(100, mods.thaumcraft.customPlant, 1); // Silverwood sapling
  }

  if (mods.natura)
  {
    AddFuel(100, mods.natura.sapling);
    AddFuel(40,  mods.natura.foodItems, 0); // Barley
    AddFuel(300, mods.natura.door);
  }

  if (mods.tinkersconstruct)
  {
    AddFuel(100, mods.tinkersconstruct.manual);
    AddFuel(300, mods.tinkersconstruct.blankPattern, 0);
    // Bug: burns forever for some reason
    //AddFuel(300, mods.tinkersconstruct.woodPattern);
    AddFuel(160, mods.tinkersconstruct.materials, 0); // Paper stack
    // Add missing silver nuggets -> silver ingot recipe
    var silver = GetOres("ingotSilver");
    if (silver.length > 0)
    {
      AddShapelessRecipe(silver[0], ArrayOf(NewItemStack(mods.tinkersconstruct.materials, 1, 23), 9));
    }
  }

  if (mods.buildcraft)
  {
    AddFuel(300, mods.buildcraft.woodenGear);
  }

  if (mods.minefantasy)
  {
    AddFuel(100,  mods.minefantasy.sapling);
    AddFuel(60,   mods.minefantasy.hayRoof);
    AddFuel(400,  mods.minefantasy.itemBaseId+41);     // Blackpowder
    AddFuel(1000, mods.minefantasy.itemBaseId+42, 6);  // Fire essence
    AddFuel(1000, mods.minefantasy.itemBaseId+42, 11); // Ember
    AddFuel(300,  mods.minefantasy.itemBaseId+135);    // Ironbark door
    // Underground Biomes limestone to 4 MineFantasy limestone hunks
    if (mods.undergroundbiomes)
    {
      AddShapelessRecipe(NewItemStack(mods.minefantasy.itemBaseId+42, 4, 66), NewItemStack(mods.undergroundbiomes.sedimentaryStone, 1, 0));
    }
    // Silver block is missing from Ore Dictionary
    RegisterOre("blockSilver", NewItemStack(m.storageBlock, 1, 5));
  }
})();
