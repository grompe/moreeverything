
var WILDCARD = 32767;

var __int= java.lang.Integer.TYPE;
var __float= java.lang.Float.TYPE;
var __boolean= java.lang.Boolean.TYPE;
var __objectArray= java.lang.Class.forName("[Ljava.lang.Object;");
var __method= java.lang.Class.forName("java.lang.reflect.Method");
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
  ee_ore_transmutations: 1,
  ee_thaumcraft_transmutations: 1,
  ee_natura_transmutations: 1,
  ee_underground_biomes_transmutations: 1,
  thaumcraft_vanilla_aspects: 1,
  thaumcraft_mod_aspects: 1,

  rotten_flesh_to_leather: 0,
};

function isEmpty(obj)
{
  for (var i in obj) return false;
  return true;
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

var AddRecipe          = function() { log("AddRecipe is not available!", logLevel.error); };
var AddShapelessRecipe = function() { log("AddShapelessRecipe is not available!", logLevel.error); };
var AddSmelting        = function() { log("AddSmelting is not available!", logLevel.error); };
var NewItemStack       = function() { log("NewItemStack is not available!", logLevel.error); };
var RegisterOre        = function() { log("RegisterOre is not available!", logLevel.error); };
var GetOres            = function() { log("GetOres is not available!", logLevel.error); };
var GetOreNames        = function() { log("GetOreNames is not available!", logLevel.error); };
var GetItemID          = function() { log("GetItemID is not available!", logLevel.error); };
var GetItemStackSize   = function() { log("GetItemStackSize is not available!", logLevel.error); };
var SetItemStackSize   = function() { log("SetItemStackSize is not available!", logLevel.error); };
var GetItemDamage      = function() { log("GetItemDamage is not available!", logLevel.error); };

(function ()
{
  var warnings = 0;
  var errors = 0;
  
  log = function(msg, level)
  {
    if (typeof level == "undefined") level = logLevel.info;
    if (level == logLevel.warning)
    {
      msg = "Warning: "+msg;
      warnings += 1;
    }
    if (level == logLevel.error)
    {
      msg = "Error: "+msg;
      errors += 1;
    }
    if (level >= currentLogLevel)
    {
      java.lang.System.out.println("[mE] "+msg);
    }
  }

  doneLoadingEvent = function()
  {
    log("Script load complete. "+warnings+" warnings, "+errors+" errors.");
  }
  
  var __addRecipe;
  var __addShapelessRecipe;
  var __addSmelting;
  var __oldSmelting;
  var __itemStackConstructor;
  var __itemStack;
  var __forgeAddRecipe;
  var __shapedOreRecipeConstructor;
  var __shapelessOreRecipeConstructor;
  var __registerOre;
  var __getOres;
  var __getOreNames;
  var __entityPlayer;
  var __addCommand;
  
  //var __modLoader = __api.__getClass("ModLoader");

  // textures directory appeared in Minecraft 1.5, as well as WILDCARD got changed to 32767
  if (!__modLoader.getResourceAsStream("/textures/items/bed.png"))
  {
    WILDCARD = -1;
    log("Set WILDCARD to -1 according to the old version of Minecraft.");
  }
  var methods = __modLoader.getMethods();
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
    log("Got all hooks!", logLevel.info);
  } else {
    log("Got ModLoader hooks, but no Forge present, some features will be unavailable.", logLevel.info);
  }

  NewItemStack = function(itemID, stackSize, itemDamage)
  {
    if (typeof itemDamage == "undefined") itemDamage = 0;
    if (typeof stackSize == "undefined") stackSize = 1;
    try
    {
      var stack = __api.__newInstance(__itemStackConstructor, [
        java.lang.Integer(itemID),
        java.lang.Integer(stackSize),
        java.lang.Integer(itemDamage)]);
      return stack;
    }
    catch(e)
    {
      log("NewItemStack failed: "+e, logLevel.error)
    }
  };

  AddRecipe = function(stack, arr)
  {
    if (!(arr instanceof Array))
    {
      var tmp = [];
      for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
      arr = tmp;
    }
    if (typeof stack == "undefined")
    {
      log("AddRecipe: stack is undefined.", logLevel.error);
      return;
    }
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
          log("No Forge, cannot add OreDictionary recipe.", logLevel.warning);
          return;
        }
      }
      shapedone = true;
      if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
    }
    try
    {
      if (oredic) {
        var recipe = __api.__newInstance(__shapedOreRecipeConstructor, [stack, ObjectArray(arr)])
        __api.__invokeStatic(__forgeAddRecipe, [recipe]);
        log("Added shaped ore recipe for "+stack+".", logLevel.debug);
      } else {
        __api.__invokeStatic(__addRecipe, [stack, ObjectArray(arr)]);
        log("Added shaped recipe for "+stack+".", logLevel.debug);
      }
      return true;
    }
    catch(e)
    {
      log("AddRecipe failed: "+e, logLevel.error)
    }
    return false;
  };

  AddShapelessRecipe = function(stack, arr)
  {
    if (!(arr instanceof Array))
    {
      var tmp = [];
      for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
      arr = tmp;
    }
    if (typeof stack == "undefined")
    {
      log("AddShapelessRecipe: stack is undefined.", logLevel.error);
      return;
    }
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
          log("No Forge, cannot add OreDictionary recipe.", logLevel.warning);
          return;
        }
      }
      if (typeof arr[i] == "number") arr[i] = NewItemStack(arr[i], 1, WILDCARD);
    }
    try
    {
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
    }
    catch(e)
    {
      log("AddShapelessRecipe failed: "+e, logLevel.error)
    }
    return false;
  };

  AddSmelting = function(input, output, experience)
  {
    if (typeof input != "number")
    {
      log("AddSmelting 1st argument must be a number.", logLevel.error);
      return;
    }
    if (typeof output == "number") output = NewItemStack(output);
    if (typeof experience == "undefined") experience = 1.0;
    try
    {
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
    }
    catch(e)
    {
      log("AddSmelting failed: "+e, logLevel.error)
    }
    return false;
  };

  RegisterOre = function(name, stackOrID, itemDamage)
  {
    if (typeof stackOrID == "number")
    {
      stackOrID = NewItemStack(stackOrID, 1, typeof itemDamage == "number" ? itemDamage : WILDCARD);
    }
    try
    {
      __api.__invokeStatic(__registerOre, [java.lang.String(name), stackOrID]);
      return true;
    }
    catch(e)
    {
      log("RegisterOre failed: "+e, logLevel.error)
    }
    return false;
  };

  GetOres = function(name)
  {
    try
    {
      var result = NativeArray(__api.__invokeStatic(__getOres, [java.lang.String(name)]).toArray());
      return result;
    }
    catch(e)
    {
      log("GetOres failed: "+e, logLevel.error)
    }
  };
  
  GetOreNames = function()
  {
    try
    {
      var result = __api.__invokeStatic(__getOreNames, []);
      return result;
    }
    catch(e)
    {
      log("GetOres failed: "+e, logLevel.error)
    }
  };

  if (!__api.__isStandalone())
  {
    // Detect some of obfuscated ItemStack fields/methods
    var __accessItemID;
    var __accessItemStackSize;
    var __accessItemStackDamage;
    var stack = NewItemStack(44, 55, 66);
    for (var i in stack)
    {
      if (stack[i] == 44)
      {
        __accessItemID = i;
        GetItemID = function (stack) { 
          return stack[__accessItemID];
        };
        log("ItemStack."+i+" is itemID.", logLevel.debug);
      }
      if (stack[i] == 55)
      {
        __accessItemStackSize = i;
        GetItemStackSize = function(stack)
        {
          return stack[__accessItemStackSize];
        };
        SetItemStackSize = function(stack, size)
        {
          stack[__accessItemStackSize] = size;
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
          __accessItemStackDamage = name;
          GetItemDamage = function(stack)
          {
            return stack[__accessItemStackDamage]();
          };
          log("ItemStack."+name+"() is getItemDamage().", logLevel.debug);
          break;
        }
      }
    }
    // Temporary class till I find how to hook CommandBase
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
  log("FindIntMatch: Couldn't find "+regex+", returning NaN.", logLevel.debug);
  return NaN;
}
function GetFile(filename) { return __api.__getFile(filename); }

function AddFuel(burnTime, id, damage)
{
  if (isNaN(id)||(id <= 0))
  {
    log("AddFuel 1st argument must be a number greater than 0.", logLevel.error);
    return;
  }
  if (typeof damage == "undefined") damage = 32767; // Java program always uses 32767 as wildcard
  try
  {
    __api.__addFuel(id, damage, burnTime);
    var logitem = (damage != 32767) ? (id + ":" + damage) : id;
    log("Added fuel: ID "+logitem+" to burn for "+burnTime+" ticks.", logLevel.debug);
    return true;
  }
  catch(e)
  {
    log("AddFuel failed: "+e, logLevel.error)
  }
  return false;
}
