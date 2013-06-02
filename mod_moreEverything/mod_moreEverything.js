/* mod_moreEverything configuration script
==========================================
For more information, see the forum topic:
http://minecraftforum.net/topic/1819835-/
And scripts:
https://github.com/grompe/moreeverything/tree/master/mod_moreEverything/moreEverything
*/

// Uncomment for debugging; valid logLevels are debug, info, warning, error
//currentLogLevel = logLevel.debug;

// Uncomment to disable default features
//optionalFeature.more_vanilla_fuel = 0;
//optionalFeature.wool_bleaching = 0;
//optionalFeature.mod_tweaks = 0;
//optionalFeature.ee_vanilla_transmutations = 0;
//optionalFeature.ee_vanilla_uncrafting = 0;
//optionalFeature.ee_stairs_slabs_walls_uncrafting = 0;
//optionalFeature.ee_ore_transmutations = 0;
//optionalFeature.ee_thaumcraft_transmutations = 0;
//optionalFeature.ee_natura_transmutations = 0;
//optionalFeature.ee_underground_biomes_transmutations = 0;
//optionalFeature.ee_biome_mods_transmutations = 0;
//optionalFeature.ee_minefantasy_transmutations = 0;
//optionalFeature.ee_tinkersconstruct_transmutations = 0;
//optionalFeature.thaumcraft_vanilla_aspects = 0;
//optionalFeature.thaumcraft_mod_aspects = 0;

// Uncomment to enable optional features
//optionalFeature.rotten_flesh_to_leather = 1;
//optionalFeature.stack_more = 1;

// Remove "Internal" word if you want the scripts to be extracted for you to modify
// If you do extract default scripts, you'll have to update (delete) them manually
// Actually, better look insize the mod .zip file for a reference and add your own code in this file below
for (i in defaultScripts) IncludeInternal(defaultScripts[i]);

/* ////////////////////////

Some working examples
=====================
Add shaped recipe or shaped ore recipe
Syntax: AddRecipe(
  number/ItemStack result,
  string shape[, string shape[, string shape]],
  array/plain(Chr component, number/ItemStack/string component[, Chr component2, number/ItemStack/string component2[...]])
)
Dependency: core.js
Examples:
  AddRecipe(item.wool, "xx", "yy", Chr("x"), item.cobblestone, Chr("y"), item.dirt);
  AddRecipe(item.wool, "xx", "yy", Chr("x"), "ingotSilver", Chr("y"), "ingotCopper");

Add shapeless recipe or shapeless ore recipe
Syntax: AddShapelessRecipe(
  number/ItemStack result,
  array/plain(number/ItemStack/string component[, number/ItemStack/string component2[...]])
)
Dependency: core.js
Examples:
  AddShapelessRecipe(item.wool, item.cobblestone, item.cobblestone);

Add smelting recipe
Syntax: AddSmelting(
  number input,
  number/ItemStack result,
  number experience
)
Dependency: core.js
Examples:
  AddSmelting(item.dirt, item.cobblestone, 5.0);

Add furnace fuel
Syntax: AddFuel(
  number duration,
  number itemID[, number itemDamage]
)
Dependency: core.js
Examples:
  AddFuel(20, item.feather);

Look inside default scripts for more documentation and examples!

*/ ////////////////////////

// Be sure to test your additions
currentLogLevel = logLevel.debug;

(function ()
{
  //
  // Add code that doesn't depend on mods here
  //
  // Shaped recipe test
  //AddRecipe(item.wool, "x ", " y", Chr("x"), item.cobblestone, Chr("y"), item.dirt);
  // Shapeless recipe test
  //AddShapelessRecipe(item.wool, item.cobblestone, item.cobblestone);
  // Shaped ore recipe test
  //AddRecipe(item.wool, "x ", " y", Chr("x"), "ingotSilver", Chr("y"), "ingotCopper");
  // Shapeless ore recipe test
  //AddShapelessRecipe(item.wool, "ingotSilver", "ingotSilver");
  // Smelting test
  //AddSmelting(item.dirt, item.cobblestone, 5.0);
  // Ore dictionary test
  //RegisterOre("ingotIron", item.ironIngot);
  //AddShapelessRecipe(item.wool, "ingotIron", "ingotIron");

  if (mods.equivalentexchange)
  {
    // Do something with Equivalent Exchange
    //AddTransmutation(item.coal, ArrayOf(item.redstone, 2));
    //AddTransmutation(NewItemStack(item.redstone, 2), NewItemStack(item.coal, 1, 0));
    //AddTransmutation1to1(item.stonePressurePlate, item.woodenPressurePlate);
  }
  if (mods.thaumcraft)
  {
    // Do something with Thaumcraft
    //RegisterObjectTag(item.trappedChest, -1, "wood", 2, "void", 4, "trap", 1);
  }
  // etc.
})();

// Alternatively, put the code in a new script file, for example myscripts/my.js
// and include it here:
// Include("myscripts/my.js");
// or directly from the game chat, if you're admin or single player with cheats:
// /eval Include("myscripts/my.js");

// If you want to publish your additions, post them in the forum topic:
// http://www.minecraftforum.net/topic/1819835-
// and I'll see about adding them to the official distribution!
// Or if you're not Minecraft Forum user, you can email me:
// i@grompe.org.ru with subject "mod_moreEverything"
