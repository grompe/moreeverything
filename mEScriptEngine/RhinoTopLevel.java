package mEScriptEngine;

import com.sun.script.javascript.*;
import javax.script.*;
import sun.org.mozilla.javascript.internal.*;

public final class RhinoTopLevel extends ImporterTopLevel {

   private static final String builtinVariables = ""
     +"var com = Packages.com;                   \n"
     +"var edu = Packages.edu;                   \n"
     +"var javax = Packages.javax;               \n"
     +"var net = Packages.net;                   \n"
     +"var org = Packages.org;                   \n";
   private RhinoScriptEngine engine;


   RhinoTopLevel(Context var1, RhinoScriptEngine var2) {
      super(var1);
      this.engine = var2;
      new LazilyLoadedCtor(this, "JSAdapter", "com.sun.script.javascript.JSAdapter", false);
      JavaAdapter.init(var1, this, false);
      String[] var3 = new String[]{"bindings", "scope", "sync"};
      this.defineFunctionProperties(var3, RhinoTopLevel.class, 2);
      var1.evaluateString(this, builtinVariables, "<builtin>", 1, (Object)null);
   }

   public static Object bindings(Context var0, Scriptable var1, Object[] var2, Function var3) {
      if(var2.length == 1) {
         Object var4 = var2[0];
         if(var4 instanceof Wrapper) {
            var4 = ((Wrapper)var4).unwrap();
         }

         if(var4 instanceof ExternalScriptable) {
            ScriptContext var5 = ((ExternalScriptable)var4).getContext();
            Bindings var6 = var5.getBindings(100);
            return Context.javaToJS(var6, ScriptableObject.getTopLevelScope(var1));
         }
      }

      return Context.getUndefinedValue();
   }

   public static Object scope(Context var0, Scriptable var1, Object[] var2, Function var3) {
      if(var2.length == 1) {
         Object var4 = var2[0];
         if(var4 instanceof Wrapper) {
            var4 = ((Wrapper)var4).unwrap();
         }

         if(var4 instanceof Bindings) {
            SimpleScriptContext var5 = new SimpleScriptContext();
            var5.setBindings((Bindings)var4, 100);
            ExternalScriptable var6 = new ExternalScriptable(var5);
            var6.setPrototype(ScriptableObject.getObjectPrototype(var1));
            var6.setParentScope(ScriptableObject.getTopLevelScope(var1));
            return var6;
         }
      }

      return Context.getUndefinedValue();
   }

   public static Object sync(Context var0, Scriptable var1, Object[] var2, Function var3) {
      if(var2.length == 1 && var2[0] instanceof Function) {
         return new Synchronizer((Function)var2[0]);
      } else {
         throw Context.reportRuntimeError("wrong argument(s) for sync");
      }
   }

   RhinoScriptEngine getScriptEngine() {
      return this.engine;
   }
}
