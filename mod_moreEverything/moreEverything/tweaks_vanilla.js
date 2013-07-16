// Vanilla tweaks
// By Grom PE

(function ()
{
  if (optionalFeature.more_vanilla_fuel)
  {
    // More fuel
    AddFuel(20, item.feather);
    AddFuel(20, item.string);
    AddFuel(40, item.woodenButton);
    AddFuel(40, item.wheat);
    AddFuel(40, item.sugarCane);
    AddFuel(40, item.map);
    AddFuel(40, item.emptyMap);
    AddFuel(40, item.paper);
    AddFuel(100, item.book);
    AddFuel(100, item.painting);
    AddFuel(100, item.bowl);
    AddFuel(100, item.deadBush);
    AddFuel(100, item.wool);
    AddFuel(100, item.torch);
    AddFuel(100, item.redstoneTorch);
    AddFuel(100, item.arrow);
    AddFuel(200, item.bow);
    AddFuel(200, item.ladders);
    AddFuel(200, item.woodenSword);
    AddFuel(200, item.woodenShovel);
    AddFuel(200, item.woodenPickaxe);
    AddFuel(200, item.woodenAxe);
    AddFuel(200, item.woodenHoe);
    AddFuel(200, item.saddle);
    AddFuel(200, item.fishingRod);
    AddFuel(200, item.carrotStick);
    AddFuel(300, item.woodenPressurePlate);
    AddFuel(300, item.sign);
    AddFuel(300, item.woodenDoor);
    AddFuel(300, item.boat);
    AddFuel(300, item.bed);
    AddFuel(400, item.netherrack);
    AddFuel(100, item.grass, 0); // Shrub
    AddFuel(150, item.slab, 2); // Old wooden slab
    QAddFuel(400, item.hayBlock);
  }
  if (optionalFeature.wool_bleaching)
  {
    // Allow bleaching wool with bonemeal
    AddShapelessRecipe(item.wool, NewItemStack(item.dye, 1, dye.boneMeal), item.wool);
  }
  if (optionalFeature.hayblock_uncrafting)
  {
    QAddShapelessRecipe(NewItemStack(item.wheat, 9), item.hayBlock);
  }
})();
