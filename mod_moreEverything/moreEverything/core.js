
var WILDCARD = -1; // Changed if 1.5 textures are detected (ModLoader/client) or Forge's value

var __int = java.lang.Integer.TYPE;
var __float = java.lang.Float.TYPE;
var __boolean = java.lang.Boolean.TYPE;
var __char = java.lang.Character.TYPE;
var __class = java.lang.Class.forName("java.lang.Class");
var __objectArray = __class.forName("[Ljava.lang.Object;");
var __method = __class.forName("java.lang.reflect.Method");
var __item;
var __block;
var __itemStack;
var __itemsList;
var logLevel = {debug: 0, info: 1, warning: 2, error: 3};

var __modLoader = Packages.ModLoader;
var __fml = Packages.cpw.mods.fml;
var __forge = Packages.net.minecraftforge;

var hasForge = !isEmpty(__fml.common.registry.GameRegistry);
var isDedicatedServer = isEmpty(Packages.net.minecraft.client.Minecraft) && isEmpty(Packages.net.minecraft.client.main.Main);
var currentLogLevel = logLevel.info;

var defaultScripts = [
  "moreEverything/defs.js",
  "moreEverything/tweaks_vanilla.js",
  "moreEverything/mods_init.js",
  "moreEverything/tweaks_mods.js",
  "moreEverything/equivalent_exchange.js",
  "moreEverything/thaumcraft.js",
  "moreEverything/optional.js"
];

var optionalFeature = {
  more_vanilla_fuel: 1,
  wool_bleaching: 1,
  mod_tweaks: 1,
  ee_vanilla_transmutations: 1,
  ee_vanilla_uncrafting: 1,
  ee_stairs_slabs_walls_uncrafting: 1,
  ee_ore_transmutations: 1,
  ee_thaumcraft_transmutations: 1,
  ee_natura_transmutations: 1,
  ee_underground_biomes_transmutations: 1,
  ee_biome_mods_transmutations: 1,
  ee_minefantasy_transmutations: 1,
  ee_tinkersconstruct_transmutations: 1,
  thaumcraft_vanilla_aspects: 1,
  thaumcraft_mod_aspects: 1,

  rotten_flesh_to_leather: 0,
  stack_more: 0,
};

function getClass(s)
{
  return java.lang.Class.forName(s, true, __api.getClass().getClassLoader());
}

function isEmpty(obj)
{
  // Java 7 throws an error if there's an empty package
  try { for (var i in obj) return false; }
  catch(e) {}
  return true;
}

function isJavaClass(thing, cls)
{
  return (typeof thing.getClass != "undefined") && (thing.getClass() == cls);
}

function Chr(s)
{
  return new java.lang.Character(java.lang.String(s).charAt(0));
}

function LowerCase(s)
{
  return java.lang.String(s).toLowerCase();
}

function JavaArray(arrtype, arr)
{
  var j = java.lang.reflect.Array.newInstance(arrtype, arr.length);
  for (var i = 0; i < arr.length; i++) j[i] = arr[i];
  return j;
}

function ObjectArray(arr)
{
  return JavaArray(java.lang.Object, arr);
}

function IntArray(arr)
{
  return JavaArray(java.lang.Integer, arr);
}

function NativeArray(arr)
{
  var tmp = [];
  for (var i = 0; i < arr.length; i++) tmp.push(arr[i]);
  return tmp;
}

function ArrayOf(thing, count)
{
  var tmp = [];
  for (var i = 0; i < count; i++) tmp.push(thing);
  return tmp;
}

function Include(filename) { return __api.__include(filename); }
function IncludeInternal(filename) { return __api.__includeInternal(filename); }

function log(msg, level)
{
  if (typeof level == "undefined") level = logLevel.info;
  if (level == logLevel.warning)
  {
    msg = "Warning: "+msg;
    __api.__incWarnings(1);
  }
  if (level == logLevel.error)
  {
    msg = "Error: "+msg;
    __api.__incErrors(1);
  }
  if (level >= currentLogLevel)
  {
    java.lang.System.out.println("[mE] "+msg);
  }
}

var FindMatch;
var GetFile;
var AddRecipe;
var AddShapelessRecipe;
var AddSmelting;
var NewItemStack;
var RegisterOre;
var GetOres;
var GetOreNames;
var GetItemID;
var GetItemStackSize;
var SetItemStackSize;
var GetItemDamage;
var GetItem;
var GetItemIDMaxStackSize;
var SetItemIDMaxStackSize;
var AddDispenserBehavior;

(function ()
{
  var __contentBuffer;

  GetFile = function(filename)
  {
    __contentBuffer = null;
    var f = new java.io.File(__api.__getConfigDir(), filename);
    var buf = java.lang.reflect.Array.newInstance(__char, f.length());
    var r = new java.io.FileReader(f);
    r.read(buf);
    r.close();
    __contentBuffer = java.lang.String(buf);
    return true;
  }

  FindMatch = function(regex)
  {
    if (!__contentBuffer) throw("Attempt to find a match with no file open.");
    var m = __contentBuffer.match(regex);
    if (!m) return;
    return m[1];
  }
    
  function initOnModLoader()
  {
    // textures directory appeared in Minecraft 1.5, as well as WILDCARD got changed to 32767
    if (__class.getResourceAsStream("/textures/items/bed.png"))
    {
      WILDCARD = 32767;
      log("Set WILDCARD to 32767 according to Minecraft 1.5+.");
    }

    var __addRecipe;
    var __addShapelessRecipe;
    var __addSmelting;
    var __oldSmelting;
    var __addCommand;
    var __addDispenserBehavior;
    var __IBehaviorDispenseItem;

    var methods = __api.__unwrap(__modLoader).getMethods();
    var found = 0;
    for (var i in methods)
    {
      var name = __api.__getMethodName(methods[i]);
      if ((name == "addRecipe") || (name == "AddRecipe"))
      {
        __addRecipe = methods[i];
        __itemStack = __api.__getParameterTypes(__addRecipe)[0];
      }
      else if ((name == "addShapelessRecipe") || (name == "AddShapelessRecipe"))
      {
        __addShapelessRecipe = methods[i];
      }
      else if (name == "addCommand")
      {
        __addCommand = methods[i];
        __ICommand = __api.__getParameterTypes(__addCommand)[0];
      }
      else if (name == "addDispenserBehavior")
      {
        __addDispenserBehavior = methods[i];
        __IBehaviorDispenseItem = __api.__getParameterTypes(__addDispenserBehavior)[1];
      }
    }
    try
    {
      __addSmelting = __api.__getMethod(__modLoader, "addSmelting", [__int, __itemStack, __float]);
    }
    catch(e)
    {
      __oldSmelting = true;
      try
      {
        __addSmelting = __api.__getMethod(__modLoader, "addSmelting", [__int, __itemStack]);
      }
      catch(e)
      {
        __addSmelting = __api.__getMethod(__modLoader, "AddSmelting", [__int, __itemStack]);
      }
    }
    if (!(__addRecipe && __addShapelessRecipe && __addSmelting)) throw("Error: unable to find mandatory ModLoader hooks!");

    if (!__api.__isStandalone())
    {
      // TODO: Temporary class till I find how to hook CommandBase
      if (typeof __addCommand != "undefined")
      {
        try
        {
          var dunEvenTry = false;
          try
          {
            var __x = getClass("x");
            dunEvenTry = java.lang.reflect.Modifier.isFinal(__x.getModifiers());
          }
          catch(e){}
          if (!dunEvenTry)
          {
            __modLoader.addCommand(new Packages.mEDependentCommand());
          }
        }
        catch(e)
        {
          log("Couldn't add /eval command, likely due to version mismatch!");
        }
      }
      if (typeof __addDispenserBehavior != "undefined")
      {
        var methods = __IBehaviorDispenseItem.getMethods();
        var __IBehaviorDispenseItem__dispense = __api.__getMethodName(methods[0]);
        AddDispenserBehavior = function(item, dispensefunc)
        {
          behavior = {};
          behavior[__IBehaviorDispenseItem__dispense] = dispensefunc;
          __modLoader.addDispenserBehavior(item, new Packages[__IBehaviorDispenseItem.getName()](behavior));
          return true;
        }
      }
    }

    AddRecipe = function(stack, arr)
    {
      if (!(arr instanceof Array))
      {
        var tmp = [];
        for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
        arr = tmp;
      }
      if (typeof stack == "undefined") throw("AddRecipe: stack is undefined.");
      if (typeof stack == "number") stack = NewItemStack(stack);
      var shapedone = false;
      for (var i=0; i<arr.length; i++)
      {
        if (typeof arr[i] == "string")
        {
          if (!shapedone) continue;
          throw("No Forge, cannot add OreDictionary recipe.");
        }
        shapedone = true;
        if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
      }
      __api.__invokeStatic(__addRecipe, [stack, ObjectArray(arr)]);
      log("Added shaped recipe for "+stack+".", logLevel.debug);
      return true;
    };

    AddShapelessRecipe = function(stack, arr)
    {
      if (!(arr instanceof Array))
      {
        var tmp = [];
        for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
        arr = tmp;
      }
      if (typeof stack == "undefined") throw("AddShapelessRecipe: stack is undefined.");
      if (typeof stack == "number") stack = NewItemStack(stack);
      var oredic = false;
      for (var i=0; i<arr.length; i++)
      {
        if (typeof arr[i] == "string") throw("No Forge, cannot add OreDictionary recipe.");
        if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
      }
      __api.__invokeStatic(__addShapelessRecipe, [stack, ObjectArray(arr)]);
      log("Added shapeless recipe for "+stack+".", logLevel.debug);
      return true;
    };

    AddSmelting = function(input, output, experience)
    {
      if (typeof input != "number") throw("AddSmelting 1st argument must be a number.");
      if (typeof output == "number") output = NewItemStack(output);
      if (typeof experience == "undefined") experience = 1.0;
      if (__oldSmelting)
      {
        __api.__invokeStatic(__addSmelting, [
          java.lang.Integer(input),
          java.lang.Object(output)]);
      } else {
        __api.__invokeStatic(__addSmelting, [
          java.lang.Integer(input),
          java.lang.Object(output),
          java.lang.Float(experience)]);
      }
      log("Added smelting: ID "+input+" cooks into "+output+".", logLevel.debug);
      return true;
    };

    log("Got ModLoader hooks, but no Forge present, some features will be unavailable.", logLevel.info);
  }

  function initOnForge()
  {
    if (!__api.__isStandalone())
    {
      WILDCARD = __forge.oredict.OreDictionary.WILDCARD_VALUE;
      __fml.common.registry.GameRegistry.registerFuelHandler(new __fml.common.IFuelHandler(
      {
        getBurnTime: function(stack)
        {
          return __api.__getBurnTime(GetItemID(stack), GetItemDamage(stack));
        }
      }));

      // TODO: Temporary class till I find how to hook CommandBase
      try
      {
        var dunEvenTry = false;
        try
        {
          var __x = getClass("x");
          dunEvenTry = java.lang.reflect.Modifier.isFinal(__x.getModifiers());
        }
        catch(e){}
        if (!dunEvenTry)
        {
          __fml.common.modloader.ModLoaderHelper.addCommand(new Packages.mEDependentCommand());
        }
      }
      catch(e)
      {
        log("Couldn't add /eval command, likely due to version mismatch!");
      }
    }

    var fun = __fml.common.registry.GameRegistry.getFuelValue;
    var __itemStack_name = fun.toString().match(/int getFuelValue\((.+)\)/)[1];
    __itemStack = __api.__unwrap(Packages[__itemStack_name]);
    // FIXME: TODO: hook basic stuff
    // Dispenser

    AddRecipe = function(stack, arr)
    {
      if (!(arr instanceof Array))
      {
        var tmp = [];
        for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
        arr = tmp;
      }
      if (typeof stack == "undefined") throw("AddRecipe: stack is undefined.");
      if (typeof stack == "number") stack = NewItemStack(stack);
      for (var i=0; i<arr.length; i++)
      {
        if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
      }
      var recipe = new __forge.oredict.ShapedOreRecipe(stack, ObjectArray(arr));
      __fml.common.registry.GameRegistry.addRecipe(recipe);
      log("Added shaped recipe for "+stack+".", logLevel.debug);
      return true;
    };

    AddShapelessRecipe = function(stack, arr)
    {
      if (!(arr instanceof Array))
      {
        var tmp = [];
        for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
        arr = tmp;
      }
      if (typeof stack == "undefined") throw("AddShapelessRecipe: stack is undefined.");
      if (typeof stack == "number") stack = NewItemStack(stack);
      var oredic = false;
      for (var i=0; i<arr.length; i++)
      {
        if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
      }
      var recipe = new __forge.oredict.ShapelessOreRecipe(stack, ObjectArray(arr));
      __fml.common.registry.GameRegistry.addRecipe(recipe);
      log("Added shapeless recipe for "+stack+".", logLevel.debug);
      return true;
    };

    AddSmelting = function(input, output, experience)
    {
      if (typeof input != "number") throw("AddSmelting 1st argument must be a number.");
      if (typeof output == "number") output = NewItemStack(output);
      if (typeof experience == "undefined") experience = 1.0;
      __fml.common.registry.GameRegistry.addSmelting(input, output, experience);
      log("Added smelting: ID "+input+" cooks into "+output+".", logLevel.debug);
      return true;
    };

    RegisterOre = function(name, stackOrID, itemDamage)
    {
      if (typeof stackOrID == "number")
      {
        stackOrID = NewItemStack(stackOrID, 1, typeof itemDamage == "number" ? itemDamage : WILDCARD);
      }
      __forge.oredict.OreDictionary.registerOre(name, stackOrID);
      return true;
    };

    GetOres = function(name)
    {
      var list = __forge.oredict.OreDictionary.getOres(name);
      return NativeArray(list.toArray());
    };
    
    GetOreNames = function()
    {
      return __forge.oredict.OreDictionary.getOreNames();
    };
  
    log("Got all Forge hooks!", logLevel.info);
  }

  if (isDedicatedServer && !hasForge)
  {
    throw("Don't know how to operate on a dedicated server without Forge. Aborting.");
  }

  if (hasForge) initOnForge(); else initOnModLoader();

  GetItem = function(itemID)
  {
    return java.lang.reflect.Array.get(__itemsList, itemID);
  };

  NewItemStack = function(itemID, stackSize, itemDamage)
  {
    if (typeof itemDamage == "undefined") itemDamage = 0;
    if (typeof stackSize == "undefined") stackSize = 1;
    if (GetItem(itemID) == null) throw("NewItemStack: no such itemID "+itemID);
    return new Packages[__itemStack.getName()](itemID, stackSize, itemDamage);
  };

  if (!__api.__isStandalone())
  {
    // Find Item and Block
    var blockoritem = [];
    var constuctors = __itemStack.getConstructors();
    for (var i in constuctors)
    {
      var parTypes = constuctors[i].getParameterTypes();
      if (parTypes.length == 1) blockoritem.push(parTypes[0]);
    }
    var methods = __itemStack.getMethods();
    for (var i in methods)
    {
      var retType = __api.__getReturnType(methods[i]);
      if (retType == blockoritem[0])
      {
        __item = blockoritem[0];
        __block = blockoritem[1];
        break;
      }
      if (retType == blockoritem[1])
      {
        __item = blockoritem[1];
        __block = blockoritem[0];
        break;
      }
    }
    // Find Item.itemsList
    var fields = __item.getFields();
    for (var i in fields)
    {
      var f = fields[i];
      if (f.getType().isArray())
      {
        __itemsList = f.get(null);
        break;
      }
    }
    // Find live Item.maxStackSize
    var testItem = GetItem(1);
    var fields = __item.getDeclaredFields();
    for (var i in fields)
    {
      var f = fields[i];
      if (f.getType() == __int)
      {
        f.setAccessible(true);
        if (f.getInt(testItem) == 64)
        {
          __item__maxStackSize = f;
          GetItemIDMaxStackSize = function(id)
          {
            var item = GetItem(id);
            if (item == null) throw("No such item: "+id+".");
            return __item__maxStackSize.getInt(item);
          }
          SetItemIDMaxStackSize = function(id, size)
          {
            var item = GetItem(id);
            if (item == null) throw("No such item: "+id+".");
            if (size > 64) throw("Stack size cannot be larger than 64.");
            __item__maxStackSize.setInt(item, size);
            return true;
          }
          break;
        }
      }
    }
    // Detect live some of obfuscated ItemStack fields/methods
    var __itemStack__itemID;
    var __itemStack__stackSize;
    var __itemStack__getItemDamage;
    var stack = NewItemStack(44, 55, 66);
    for (var i in stack)
    {
      if (stack[i] == 44)
      {
        __itemStack__itemID = i;
        GetItemID = function (stack) { 
          return stack[__itemStack__itemID];
        };
        log("ItemStack."+i+" is itemID.", logLevel.debug);
      }
      if (stack[i] == 55)
      {
        __itemStack__stackSize = i;
        GetItemStackSize = function(stack)
        {
          return stack[__itemStack__stackSize];
        };
        SetItemStackSize = function(stack, size)
        {
          stack[__itemStack__stackSize] = size;
          return stack;
        };
        log("ItemStack."+i+" is stackSize.", logLevel.debug);
      }
    }
    var methods = __itemStack.getMethods();
    for (var i in methods)
    {
      var retType = __api.__getReturnType(methods[i]);
      var parTypes = __api.__getParameterTypes(methods[i]);
      if ((retType == __int) && (parTypes.length == 0))
      {
        var v = __api.__invoke(methods[i], stack, null); // Dirty hack
        if (v == 66)
        {
          var name = __api.__getMethodName(methods[i]);
          __itemStack__getItemDamage = name;
          GetItemDamage = function(stack)
          {
            return stack[__itemStack__getItemDamage]();
          };
          log("ItemStack."+name+"() is getItemDamage().", logLevel.debug);
          break;
        }
      }
    }
  }

})();

function FindIntMatch(regex)
{
  var res = FindMatch(regex);
  if (res) return parseInt(res);
  throw("FindIntMatch: Couldn't find "+regex);
}

function AddFuel(burnTime, id, damage)
{
  if (isNaN(id)||(id <= 0)) throw("AddFuel 1st argument must be a number greater than 0.");
  if (typeof damage == "undefined") damage = 32767; // Java program always uses 32767 as wildcard
  __api.__addFuel(id, damage, burnTime);
  var logitem = (damage != 32767) ? (id + ":" + damage) : id;
  log("Added fuel: ID "+logitem+" to burn for "+burnTime+" ticks.", logLevel.debug);
  return true;
}

// Quiet functions that don't throw exceptions - don't use unless you know what you're doing
function QFindIntMatch(regex)
{
  var res = FindMatch(regex);
  if (res) return parseInt(res);
  return NaN;
}

function QNewItemStack(itemID, stackSize, itemDamage)
{
  var result;
  try { result = NewItemStack(itemID, stackSize, itemDamage); }
  catch(e) {};
  return result;
}

function QAddFuel(burnTime, id, damage)
{
  var result;
  try { result = AddFuel(burnTime, id, damage); }
  catch(e) {};
  return result;
}

function QAddRecipe(stack, arr)
{
  var result;
  try { result = AddRecipe(stack, arr); }
  catch(e) {};
  return result;
}

function QAddShapelessRecipe(stack, arr)
{
  var result;
  try { result = AddShapelessRecipe(stack, arr); }
  catch(e) {};
  return result;
}

function QAddSmelting(input, output, experience)
{
  var result;
  try { result = AddSmelting(input, output, experience); }
  catch(e) {};
  return result;
}
