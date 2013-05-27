// Thaumcraft aspects addons
// By Grom PE

var RegisterObjectTag = function() { throw("RegisterObjectTag is not available!"); };

(function ()
{
  if (!mods.thaumcraft) return;

  var aspects = {}
  var __thaumcraftApi = __api.__getClass("thaumcraft.api.ThaumcraftApi");
  var __enumTag = __api.__getClass("thaumcraft.api.EnumTag");
  var __objectTags = __api.__getClass("thaumcraft.api.ObjectTags");
  var __newObjectTags = __api.__getConstructor(__objectTags, null);
  var __registerObjectTag = __api.__getMethod(__thaumcraftApi, "registerObjectTag", [__int, __int, __objectTags]);

  function NewObjectTags()
  {
    return __api.__newInstance(__newObjectTags, null);
  }

  var __getEnumValues = __api.__getMethod(__enumTag, "values", null);
  var ev = __api.__invokeStatic(__getEnumValues, null);
  for (var i in ev)
  {
    aspects[LowerCase(ev[i].toString())] = ev[i];
    aspects[LowerCase(ev[i].name)] = ev[i];
  }

  RegisterObjectTag = function(id, damage, arr)
  {
    if (isNaN(id)||(id <= 0)) throw("RegisterObjectTag: 1st argument must be a number greater than 0.");
    if (GetItem(id) == null) throw("RegisterObjectTag: no such item ID.");
    if (!(arr instanceof Array))
    {
      var tmp = [];
      for (var i = 2; i < arguments.length; i++) tmp.push(arguments[i]);
      arr = tmp;
    }
    var o = NewObjectTags();
    for (var i = 0; i < arr.length; i+=2)
    {
      if ((typeof arr[i] != "string")||(typeof arr[i+1] != "number"))
      {
        throw("RegisterObjectTag: expected a string followed by a number");
      }
      var aspect = aspects[LowerCase(arr[i])];
      if (typeof aspect == "undefined")
      {
        throw("RegisterObjectTag: got unknown aspect: "+arr[i]);
      }
      o.tags.put(aspects[LowerCase(arr[i])], java.lang.Integer(arr[i+1]));
    }
    __api.__invokeStatic(__registerObjectTag, [
      java.lang.Integer(id), java.lang.Integer(damage), o]);
    var logitem = (damage != -1) ? (id + ":" + damage) : id;
    log("Registered object tag for "+logitem+": "+o.tags, logLevel.debug);
    return true;
  }

  function QRegisterObjectTag(id, damage, arr)
  {
    var result;
    try { RegisterObjectTag(id, damage, arr); }
    catch {};
    return result;
  }
  
  if (optionalFeature.thaumcraft_vanilla_aspects)
  {
    // Some Minecraft blocks/items Thaumcraft missed!
    QRegisterObjectTag(item.slab, 3, "destruction", 1, "rock", 1); // Cobblestone slab
    QRegisterObjectTag(item.slab, 4, "fire", 1, "earth", 2); // Brick slab
    QRegisterObjectTag(item.slab, 5, "rock", 1); // Stone brick slab
    QRegisterObjectTag(item.slab, 6, "fire", 1, "rock", 1); // Nether brick slab
    QRegisterObjectTag(item.slab, 7, "pure", 2, "rock", 2, "vision", 2, "crystal", 2); // Quartz slab
    QRegisterObjectTag(item.snow, -1, "cold", 1);
    QRegisterObjectTag(item.netherBrick, -1, "fire", 1, "rock", 1);
    QRegisterObjectTag(item.netherBrickFence, -1, "fire", 1, "rock", 2);
    QRegisterObjectTag(item.netherBrickStairs, -1, "fire", 1, "rock", 2);
    QRegisterObjectTag(item.dragonEgg, -1, "eldritch", 32, "dark", 16, "magic", 16);
    QRegisterObjectTag(item.woodenSlab, -1, "wood", 1);
    QRegisterObjectTag(item.trappedChest, -1, "wood", 2, "void", 4, "trap", 1);
    QRegisterObjectTag(item.quartzBlock, 1, "pure", 3, "rock", 3, "vision", 3, "crystal", 3, "valuable", 1); // Chiseled quartz block
    QRegisterObjectTag(item.quartzBlock, 2, "pure", 3, "rock", 3, "vision", 3, "crystal", 3, "valuable", 1); // Pillar quartz block
    QRegisterObjectTag(item.quartzStairs, -1, "pure", 3, "rock", 3, "vision", 3, "crystal", 3);
    QRegisterObjectTag(item.fireworkRocket, -1, "fire", 4, "motion", 4, "power", 2);
    QRegisterObjectTag(item.fireworkStar, -1, "fire", 4, "power", 2);
  }
  if (optionalFeature.thaumcraft_mod_aspects)
  {
    var m;
    if (m = mods.equivalentexchange)
    {
      RegisterObjectTag(m.inertStone, -1, "magic", 4, "rock", 8);
      RegisterObjectTag(m.miniumStone, -1, "magic", 8, "rock", 8, "power", 8, "exchange", 8);
      RegisterObjectTag(m.miniumShard, -1, "power", 1, "evil", 1);
    }

    if (m = mods.extrabiomesxl)
    {
      RegisterObjectTag(m.redRock, 0, "rock", 2);                   // smooth red rock
      RegisterObjectTag(m.redRock, 1, "rock", 1, "destruction", 1); // red rock cobblestone
      RegisterObjectTag(m.redRock, 2, "rock", 2);                   // red rock bricks
      RegisterObjectTag(m.crackedSand, -1, "destruction", 1, "earth", 1);
    }

    if (m = mods.minefantasy)
    {
      RegisterObjectTag(m.herb, -1, "plant", 2);
    }

    if (m = mods.undergroundbiomes)
    {
      RegisterObjectTag(m.igneousBrick, -1, "rock", 2, "fire", 1);
      RegisterObjectTag(m.igneousCobblestone, -1, "rock", 1, "destruction", 1, "fire", 1);
      RegisterObjectTag(m.igneousStone, -1, "rock", 2, "fire", 1);
      RegisterObjectTag(m.lignite, -1, "fire", 1, "power", 1, "rock", 1);
      RegisterObjectTag(m.metamorphicBrick, -1, "rock", 2, "exchange", 1);
      RegisterObjectTag(m.metamorphicCobblestone, -1, "rock", 1, "destruction", 1, "exchange", 1);
      RegisterObjectTag(m.metamorphicStone, -1, "rock", 2, "exchange", 1);
      RegisterObjectTag(m.sedimentaryStone, -1, "rock", 1, "earth", 1);
    }
  }
})();
