// Thaumcraft aspects addons
// By Grom PE

/*

Aspects removed in Thaumcraft 4:

  unknown = obscurus
  sound = sonus
  vision = visum
  destruction = fractus
  valuable = carus
  pure = purus
  time = tempus
  control = imperito
  evil = malum
  flux = mutatio
  insect = bestiola
  flower = flos
  fungus = fungus

Aspects new in Thaumcraft 4:

  order = ordo
  entropy = perditio
  travel = iter
  aura = auram
  taint = vitium
  seed = granum
  slime = limus
  undead = exanimis
  senses = sensus
  man = humanus
  harvest = meto
  mine = perfodio
  hunger = fames
  greed = lucrum

The rest of TC3 aspects are adapted to TC4 ones.

*/

var RegisterObjectTag;

(function ()
{
  if (!mods.thaumcraft) return;
  if (mods.thaumcraft.versionMajor == 3)
  {
    initThaumcraft3();
  } else {
    initThaumcraft4();
  }

  function initThaumcraft3()
  {
    var aspects = {}
    var ev = Packages.thaumcraft.api.EnumTag.values();
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
      var o = new Packages.thaumcraft.api.ObjectTags();
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
      Packages.thaumcraft.api.ThaumcraftApi.registerObjectTag(id, damage, o);
      var logitem = (damage != -1) ? (id + ":" + damage) : id;
      log("Registered object tag for "+logitem+": "+o.tags, logLevel.debug);
      return true;
    }

    function QRegisterObjectTag(id, damage, arr)
    {
      var result;
      try { RegisterObjectTag(id, damage, arr); }
      catch(e) {};
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
  }

  function initThaumcraft4()
  {
    var aspects = {};
    var altnames = {
      "aer": ["air", "wind"],
      "terra": "earth",
      "ignis": "fire",
      "aqua": "water",
      "ordo": "order",
      "perditio": "entropy",
      "vacuos": "void",
      "lux": "light",
      "potentia": ["energy", "power"],
      "motus": "motion",
      "saxum": ["stone", "rock"],
      "victus": "life",
      "tempestas": "weather",
      "gelum": ["ice", "cold"],
      "vitreus": "crystal",
      "mortuus": "death",
      "volatus": "flight",
      "tenebrae": ["darkness", "dark"],
      "spiritus": ["soul", "spirit"],
      "sano": "heal",
      "iter": "travel",
      "venenum": "poison",
      "alienis": "eldritch",
      "praecantatio": "magic",
      "auram": "aura",
      "vitium": "taint",
      "granum": "seed",
      "limus": "slime",
      "herba": "plant",
      "arbor": ["tree", "wood"],
      "bestia": "beast",
      "corpus": "flesh",
      "exanimis": "undead",
      "cognitio": ["mind", "knowledge"],
      "sensus": "senses",
      "humanus": "man",
      "messis": "crop",
      "meto": "harvest",
      "metallum": "metal",
      "perfodio": "mine",
      "instrumentum": "tool",
      "telum": "weapon",
      "tutamen": "armor",
      "fames": "hunger",
      "lucrum": "greed",
      "fabrico": "craft",
      "pannus": "cloth",
      "machina": "mechanism",
      "vinculum": "trap",
      "permutatio": "exchange"
    };
    var ev = Packages.thaumcraft.api.aspects.Aspect.aspects.values().toArray();
    for (var i in ev)
    {
      var tag = LowerCase(ev[i].getTag());
      aspects[tag] = ev[i];
      var alt;
      if (alt = altnames[tag])
      {
        if (!(alt instanceof Array))
        {
          aspects[alt] = ev[i];
        } else {
          for (var j = 0; j < alt.length; j++)
          {
            aspects[alt[j]] = ev[i];
          }
        }
      }
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
      var o = new Packages.thaumcraft.api.aspects.AspectList();
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
        o.add(aspects[LowerCase(arr[i])], java.lang.Integer(arr[i+1]));
      }
      Packages.thaumcraft.api.ThaumcraftApi.registerObjectTag(id, damage, o);
      var logitem = (damage != -1) ? (id + ":" + damage) : id;
      log("Registered object tag for "+logitem+": "+o.tags, logLevel.debug);
      return true;
    }

    function QRegisterObjectTag(id, damage, arr)
    {
      var result;
      try { RegisterObjectTag(id, damage, arr); }
      catch(e) {};
      return result;
    }

    if (optionalFeature.thaumcraft_mod_aspects)
    {
      var m;
      if (m = mods.undergroundbiomes)
      {
        RegisterObjectTag(m.igneousBrick, -1, "stone", 2, "fire", 1);
        RegisterObjectTag(m.igneousCobblestone, -1, "stone", 1, "fire", 1);
        RegisterObjectTag(m.igneousStone, -1, "stone", 2, "fire", 1);
        RegisterObjectTag(m.lignite, -1, "fire", 1, "energy", 1, "stone", 1);
        RegisterObjectTag(m.metamorphicBrick, -1, "stone", 2, "exchange", 1);
        RegisterObjectTag(m.metamorphicCobblestone, -1, "stone", 1, "exchange", 1);
        RegisterObjectTag(m.metamorphicStone, -1, "stone", 2, "exchange", 1);
        RegisterObjectTag(m.sedimentaryStone, -1, "stone", 1, "earth", 1);
      }

      // TODO
    }
  }
})();
