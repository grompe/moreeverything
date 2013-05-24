/* mod_moreEverything configuration script
==========================================
For more information, see the forum topic:
http://minecraftforum.net/topic/316316-/
*/

// Uncomment for debugging; valid logLevels are debug, info, warning, error
currentLogLevel = logLevel.debug;

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


// Shaped recipe test
AddRecipe(item.wool, "x ", " y", Chr("x"), item.cobblestone, Chr("y"), item.dirt);
// Shapeless recipe test
AddShapelessRecipe(item.wool, item.cobblestone, item.cobblestone);
// Shaped ore recipe test
AddRecipe(item.wool, "x ", " y", Chr("x"), "ingotSilver", Chr("y"), "ingotCopper");
// Shapeless ore recipe test
AddShapelessRecipe(item.wool, "ingotSilver", "ingotSilver");
// Smelting test
AddSmelting(item.dirt, item.cobblestone, 5.0);
// Ore dictionary test
RegisterOre("ingotIron", item.ironIngot);
AddShapelessRecipe(item.wool, "ingotIron", "ingotIron");


Equivalent Exchange example:

if (hasEquivalentexchange)
{
  AddTransmutation(item.coal, ArrayOf(item.redstone, 2));
  AddTransmutation(NewItemStack(item.redstone, 2), NewItemStack(item.coal, 1, 0));
  AddTransmutation1to1(item.stonePressurePlate, item.woodenPressurePlate);
  // ...
}  


Thaumcraft example:

if (hasThaumcraft)
{
  RegisterObjectTag(item.trappedChest, -1, "wood", 2, "void", 4, "trap", 1);
  // ...
}


Look inside default scripts for more documentation and examples!

*/ ////////////////////////

// Be sure to test your additions
currentLogLevel = logLevel.debug;

// Add your code below
