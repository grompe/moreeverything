// Optional addons
// by Grom PE
(function()
{
  if (optionalFeature.rotten_flesh_to_leather)
  {
    AddSmelting(item.rottenFlesh, item.leather, 1.0);
  }
  if (optionalFeature.stack_more)
  {
    function S(id)
    {
      try { SetItemIDMaxStackSize(id, 64); }
      catch(e) {};
    };
    S(item.saddle);
    S(item.bucket);
    S(item.egg);
    S(item.enderPearl);
    S(item.enderEye);
    S(item.snowball);
    S(item.cake);
    S(item.bed);
    S(item.woodenDoor);
    S(item.ironDoor);
    S(item.boat);
    S(item.sign);
    S(item.minecart);
    S(item.minecartWithChest);
    S(item.minecartWithFurnace);
    S(item.minecartWithTNT);
    S(item.minecartWithHopper);
  }
})();