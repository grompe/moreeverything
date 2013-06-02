
var WILDCARD = 32767;

var __int = java.lang.Integer.TYPE;
var __float = java.lang.Float.TYPE;
var __boolean = java.lang.Boolean.TYPE;
var __class = java.lang.Class.forName("java.lang.Class");
var __objectArray = __class.forName("[Ljava.lang.Object;");
var __method = __class.forName("java.lang.reflect.Method");
var __item;
var __block;
var __itemStack;
var __itemsList;
var logLevel = {debug: 0, info: 1, warning: 2, error: 3};

var hasForge;
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

var log;
var doneLoadingEvent;

var AddRecipe          = function() { throw("AddRecipe is not available!"); };
var AddShapelessRecipe = function() { throw("AddShapelessRecipe is not available!"); };
var AddSmelting        = function() { throw("AddSmelting is not available!"); };
var NewItemStack       = function() { throw("NewItemStack is not available!"); };
var RegisterOre        = function() { throw("RegisterOre is not available!"); };
var GetOres            = function() { throw("GetOres is not available!"); };
var GetOreNames        = function() { throw("GetOreNames is not available!"); };
var GetItemID          = function() { throw("GetItemID is not available!"); };
var GetItemStackSize   = function() { throw("GetItemStackSize is not available!"); };
var SetItemStackSize   = function() { throw("SetItemStackSize is not available!"); };
var GetItemDamage      = function() { throw("GetItemDamage is not available!"); };
var GetItem            = function() { throw("GetItem is not available!"); };
var GetItemIDMaxStackSize = function() { throw("GetItemIDMaxStackSize is not available!"); };
var SetItemIDMaxStackSize = function() { throw("SetItemIDMaxStackSize is not available!"); };

(function ()
{
  log = function(msg, level)
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
  
  var __addRecipe;
  var __addShapelessRecipe;
  var __addSmelting;
  var __oldSmelting;
  var __itemStackConstructor;
  var __forgeAddRecipe;
  var __shapedOreRecipeConstructor;
  var __shapelessOreRecipeConstructor;
  var __registerOre;
  var __getOres;
  var __getOreNames;
  var __entityPlayer;
  var __addCommand;
  var __modLoader = Packages.net.minecraft.src.ModLoader;
  if (isEmpty(__modLoader)) __modLoader = Packages.ModLoader;

  // textures directory appeared in Minecraft 1.5, as well as WILDCARD got changed to 32767
  if (!__class.getResourceAsStream("/textures/items/bed.png"))
  {
    WILDCARD = -1;
    log("Set WILDCARD to -1 according to the old version of Minecraft.");
  }
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
    else if ((name == "onItemPickup") || (name == "OnItemPickup")) // just to find EntityPlayer
    {
      __entityPlayer = __api.__getParameterTypes(methods[i])[0];
      __entityPlayerDEBUG = __entityPlayer;
    }
    else if (name == "addCommand")
    {
      __addCommand = methods[i];
      __ICommand = __api.__getParameterTypes(__addCommand)[0];
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
  __itemStackConstructor = __api.__getConstructor(__itemStack, [__int, __int, __int]);
  if (!(__addRecipe && __addShapelessRecipe && __addSmelting)) throw("Error: unable to find mandatory ModLoader hooks!");

  try
  {
    var fmlGameRegistry = __api.__getClass("cpw.mods.fml.common.registry.GameRegistry");
    var shaped = __api.__getClass("net.minecraftforge.oredict.ShapedOreRecipe");
    var shapeless = __api.__getClass("net.minecraftforge.oredict.ShapelessOreRecipe");
    if (!__api.__isStandalone())
    {
      var oredict = __api.__getClass("net.minecraftforge.oredict.OreDictionary");
    }
    hasForge = true;
  }
  catch(e){}
  if (hasForge)
  {
    var methods = fmlGameRegistry.getMethods();
    found = 0;
    for (var i in methods)
    {
      var name = __api.__getMethodName(methods[i]);
      if (name == "addRecipe")
      {
        if (__api.__getParameterTypes(methods[i]).length == 1)
        {
          __forgeAddRecipe = methods[i];
          found += 1;
        }
      }
    }
    if (found != 1) throw("Error: Found only "+found+" of 1 Forge hooks!");
    __shapedOreRecipeConstructor = __api.__getConstructor(shaped, [__itemStack, __objectArray]);
    __shapelessOreRecipeConstructor = __api.__getConstructor(shapeless, [__itemStack, __objectArray]);
    if (!__api.__isStandalone())
    {
      __registerOre = __api.__getMethod(oredict, "registerOre", [java.lang.String, __itemStack]);
      __getOres = __api.__getMethod(oredict, "getOres", [java.lang.String]);
      __getOreNames = __api.__getMethod(oredict, "getOreNames", []);
    }
    log("Got all Forge hooks!", logLevel.info);
  } else {
    log("Got ModLoader hooks, but no Forge present, some features will be unavailable.", logLevel.info);
  }

  GetItem = function(itemID)
  {
    return java.lang.reflect.Array.get(__itemsList, itemID);
  };

  NewItemStack = function(itemID, stackSize, itemDamage)
  {
    if (typeof itemDamage == "undefined") itemDamage = 0;
    if (typeof stackSize == "undefined") stackSize = 1;
    if (GetItem(itemID) == null) throw("NewItemStack: no such itemID "+itemID);
    return __api.__newInstance(__itemStackConstructor, [
      java.lang.Integer(itemID),
      java.lang.Integer(stackSize),
      java.lang.Integer(itemDamage)]);
  };

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
    var oredic = false;
    for (var i=0; i<arr.length; i++)
    {
      if (typeof arr[i] == "string")
      {
        if (!shapedone) continue;
        if (hasForge)
        {
          oredic = true;
        } else {
          throw("No Forge, cannot add OreDictionary recipe.");
        }
      }
      shapedone = true;
      if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
    }
    if (oredic) {
      var recipe = __api.__newInstance(__shapedOreRecipeConstructor, [stack, ObjectArray(arr)])
      __api.__invokeStatic(__forgeAddRecipe, [recipe]);
      log("Added shaped ore recipe for "+stack+".", logLevel.debug);
    } else {
      __api.__invokeStatic(__addRecipe, [stack, ObjectArray(arr)]);
      log("Added shaped recipe for "+stack+".", logLevel.debug);
    }
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
      if (typeof arr[i] == "string")
      {
        if (hasForge)
        {
          oredic = true;
        } else {
          throw("No Forge, cannot add OreDictionary recipe.");
        }
      }
      if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
    }
    if (oredic)
    {
      var recipe = __api.__newInstance(__shapelessOreRecipeConstructor, [stack, ObjectArray(arr)]);
      __api.__invokeStatic(__forgeAddRecipe, [recipe]);
      log("Added shapeless ore recipe for "+stack+".", logLevel.debug);
    } else {
      __api.__invokeStatic(__addShapelessRecipe, [stack, ObjectArray(arr)]);
      log("Added shapeless recipe for "+stack+".", logLevel.debug);
    }
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

  RegisterOre = function(name, stackOrID, itemDamage)
  {
    if (typeof stackOrID == "number")
    {
      stackOrID = NewItemStack(stackOrID, 1, typeof itemDamage == "number" ? itemDamage : WILDCARD);
    }
    __api.__invokeStatic(__registerOre, [java.lang.String(name), stackOrID]);
    return true;
  };

  GetOres = function(name)
  {
    return NativeArray(__api.__invokeStatic(__getOres, [java.lang.String(name)]).toArray());
  };
  
  GetOreNames = function()
  {
    return __api.__invokeStatic(__getOreNames, []);
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
        var v = __api.__invoke(methods[i], stack, null);
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
    // Temporary class till I find how to hook CommandBase
    if (typeof __addCommand != "undefined")
    {
      try
      {
        var dunEvenTry = false;
        try
        {
          var __x = __api.__getClass("x");
          dunEvenTry = java.lang.reflect.Modifier.isFinal(__x.getModifiers());
        }
        catch(e){}
        if (!dunEvenTry)
        {
          var __mEDependentCommand = __api.__getClass("mEDependentCommand");
          var __newmEDependentCommand = __api.__getConstructor(__mEDependentCommand, []);
          var __evalCommand = __api.__newInstance(__newmEDependentCommand, []);
          __api.__invokeStatic(__addCommand, [__evalCommand]);
        }
      }
      catch(e)
      {
        log("Couldn't add /eval command, likely due to version mismatch!");
      }
    }
    if (hasForge)
    {
      var fml = Packages.cpw.mods.fml;
      fml.common.registry.GameRegistry.registerFuelHandler(new fml.common.IFuelHandler(
      {
        getBurnTime: function(stack)
        {
          return __api.__getBurnTime(GetItemID(stack), GetItemDamage(stack));
        }
      }));
    }
  }

})();

function FindMatch(regex) { return __api.__findMatch(regex); }
function FindIntMatch(regex)
{
  var res = __api.__findMatch(regex);
  if (res) return parseInt(res);
  throw("FindIntMatch: Couldn't find "+regex);
}
function GetFile(filename) { return __api.__getFile(filename); }

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
  var res = __api.__findMatch(regex);
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
