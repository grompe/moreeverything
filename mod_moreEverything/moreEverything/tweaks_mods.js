// Mod tweaks
// By Grom PE

(function ()
{
  if (!optionalFeature.mod_tweaks) return;
  var m;
  if (m = mods.biomesoplenty)
  {
    AddFuel(40,  m.plant, 0);     // Dead grass
    AddFuel(40,  m.plant, 5);     // Thorns
    AddFuel(40,  m.plant, 6);     // Barley
    AddFuel(40,  m.plant, 7);     // Cattail
    AddFuel(150, m.woodenSlab1); // Rebalancing to match vanilla 7.5s
    AddFuel(150, m.woodenSlab2); 
    AddFuel(100, m.foliage, 4);  // Bush
    AddFuel(100, m.bamboo);
  }

  if (m = mods.extrabiomesxl)
  {
    AddFuel(40,  m.cattail);
    AddFuel(100, m.flower, 0);  // Shrub
    AddFuel(100, m.flower, 5);  // Root
    AddFuel(20,  m.grass, 2);   // Short dead grass
    AddFuel(40,  m.grass, 3);   // Tall dead grass
    AddFuel(20,  m.grass, 4);   // Short yellow dead grass
    AddFuel(40,  m.leafPile);
    AddFuel(150, m.woodenSlab); // Rebalancing to match vanilla 7.5s
  }

  if (m = mods.twilightforest)
  {
    AddFuel(100, m.sapling);
  }

  if (m = mods.thaumcraft)
  {
    AddFuel(100, m.customPlant, 0); // Greatwood sapling
    AddFuel(100, m.customPlant, 1); // Silverwood sapling
  }

  if (m = mods.natura)
  {
    AddFuel(100, m.sapling);
    AddFuel(40,  m.foodItems, 0); // Barley
    AddFuel(300, m.door);
  }

  if (m = mods.tinkersconstruct)
  {
    AddFuel(100, m.manual);
    AddFuel(300, m.blankPattern, 0);
    // Bug: burns forever for some reason
    //AddFuel(300, m.woodPattern);
    AddFuel(160, m.materials, 0); // Paper stack
    // Add missing silver nuggets -> silver ingot recipe
    var silver = GetOres("ingotSilver");
    if (silver.length > 0)
    {
      AddShapelessRecipe(silver[0], ArrayOf(NewItemStack(m.materials, 1, 23), 9));
    }
  }

  if (m = mods.buildcraft)
  {
    AddFuel(300, m.woodenGear);
  }

  if (m = mods.minefantasy)
  {
    AddFuel(100,  m.sapling);
    AddFuel(60,   m.hayRoof);
    AddFuel(400,  m.itemBaseId+41);     // Blackpowder
    AddFuel(1000, m.itemBaseId+42, 6);  // Fire essence
    AddFuel(1000, m.itemBaseId+42, 11); // Ember
    AddFuel(300,  m.itemBaseId+135);    // Ironbark door
    // Underground Biomes limestone to 4 MineFantasy limestone hunks
    if (ub = mods.undergroundbiomes)
    {
      AddShapelessRecipe(NewItemStack(m.itemBaseId+42, 4, 66), NewItemStack(ub.sedimentaryStone, 1, 0));
    }
    // Silver block is missing from Ore Dictionary
    RegisterOre("blockSilver", NewItemStack(m.storageBlock, 1, 5));
    // Wood planks now make MineFantasy plank items but other mods planks won't
    // make even sticks - fix that and let them behave like vanilla wood planks
    AddRecipe(NewItemStack(m.itemBaseId+4, 8), "x", "x", Chr("x"), "plankWood");
  }
})();
